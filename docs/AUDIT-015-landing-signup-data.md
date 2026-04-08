# AUDIT-015 — Landing Signup Data Payload: Structural Gap Analysis

**Fecha:** 2026-04-07
**Autor:** Claude Code (Auditoría automatizada)
**Repo auditado:** `pos-landing` (Next.js 16.x)
**Repos referenciados:** `restaurant-app` (Angular frontend), `pos-api` (.NET backend)
**Severidad general:** ALTA — datos fiscales y de país no se capturan en ningún punto previo al POS

---

## 1. Campos Actualmente Recolectados en el Landing

### 1.1 La landing NO tiene formulario de registro

> **Hallazgo clave:** `pos-landing` no contiene ningún formulario de registro. No hay inputs, no hay `<form>`, no hay llamada POST para signup. Es un sitio de marketing puro.

Todos los CTAs de registro son **links externos** que redirigen al frontend de la aplicación (`restaurant-app`):

| Componente | Línea | URL generada | Datos en query string |
|---|---|---|---|
| [Hero.tsx](components/Hero.tsx) | L32 | `{APP_URL}/register` | Ninguno |
| [HowItWorks.tsx](components/HowItWorks.tsx) | L72 | `{APP_URL}/register` | Ninguno |
| [Navbar.tsx](components/Navbar.tsx) | L58, L100 | `{APP_URL}/register` | Ninguno |
| [Footer.tsx](components/Footer.tsx) | L8 | `{APP_URL}/register` | Ninguno |
| [PricingSection.tsx](components/PricingSection.tsx) | L373 | `{APP_URL}/register?plan={slug}&giro={slug}` | `plan`, `giro` |

### 1.2 Datos transmitidos vía URL query string

Solo el CTA de **PricingSection** envía datos al registro:

```
https://restaurant-app.vercel.app/register?plan=basic&giro=restaurant
```

| Parámetro | Valores posibles | Propósito |
|---|---|---|
| `plan` | `free`, `basic`, `pro`, `enterprise` | Tier seleccionado |
| `giro` | `restaurant`, `cafe`, `bar`, `retail`, `foodtruck`, `general` | Tipo de negocio |

**Los CTAs genéricos (Hero, Navbar, HowItWorks, Footer) no envían ningún parámetro** — el usuario llega a `/register` sin plan ni giro preseleccionado.

### 1.3 Formulario de registro real (en `restaurant-app`, NO en este repo)

El formulario de registro vive en `restaurant-app/src/app/modules/register/register.component.ts`. Según AUDIT-010, el payload enviado al backend es:

```json
{
  "businessName": "string",
  "ownerName": "string",
  "email": "string",
  "password": "string",
  "businessType": "string",   // ← derivado del query param 'giro'
  "planType": "string"         // ← derivado del query param 'plan'
}
```

**Endpoint:** `POST {API_URL}/auth/register`

---

## 2. API Endpoints llamados desde el Landing

### 2.1 Registro — NINGUNO

El landing no llama a ningún endpoint de registro. Solo redirige al frontend externo.

### 2.2 Facturación pública (no relacionada con registro)

El único módulo con llamadas API es el wizard de facturación (`/factura`), que llama a:

| Endpoint | Método | Propósito | Archivo |
|---|---|---|---|
| `/api/publicinvoicing/{orderId}?totalCents={n}` | GET | Buscar ticket por ID de orden | [lib/api.ts:40](lib/api.ts) |
| `/api/publicinvoicing/{orderId}` | POST | Solicitar factura CFDI | [lib/api.ts:75](lib/api.ts) |

El POST de facturación envía:

```json
{
  "totalCents": 8000,
  "rfc": "XAXX010101000",
  "legalName": "Razón Social SA de CV",
  "zipCode": "06600",
  "taxRegime": "612",
  "useOfCfdi": "G03",
  "email": "correo@ejemplo.com"
}
```

Estos datos fiscales se recopilan **solo para facturación de tickets existentes** — un flujo post-compra para clientes finales, **no para el Owner durante el registro**.

### 2.3 Stripe Checkout — No existe en el landing

No hay integración de Stripe Checkout en este repo. El archivo [lib/stripe-prices.ts](lib/stripe-prices.ts) define el mapeo de Price IDs pero no los usa para crear sesiones de checkout. El checkout se realiza en el `restaurant-app` después del registro.

**Metadata capturada por Stripe:** No determinable desde este repo. Según la estructura, el `restaurant-app` probablemente pasa `plan`, `giro`, y `branchId` como metadata, pero no se puede confirmar sin auditar ese repo.

---

## 3. Gaps Estructurales Identificados

### GAP-A: No se captura País del Negocio
**Severidad: CRITICA**

- **Estado actual:** Ni la landing ni el payload de registro incluyen un campo `country` o `businessCountry`.
- **Asunción implícita:** Todo el sistema asume México (RFC con formato mexicano, catálogos SAT, códigos postales de 5 dígitos, precios en MXN).
- **Problema:** Si se planea expansión a otros países, no hay dato para discriminar. Incluso dentro de México, no se captura el estado/entidad federativa.
- **Impacto en POS:** El backend no puede determinar qué régimen fiscal aplica por defecto, qué impuestos configurar, ni qué formato de facturación usar.

### GAP-B: No se captura Régimen Fiscal del Owner/Negocio
**Severidad: CRITICA**

- **Estado actual:** El `regimenFiscal` se pide **solo** en el wizard de facturación pública (`/factura`) para clientes finales, no para el Owner del negocio.
- **Datos fiscales disponibles en la landing:** El catálogo completo ya existe en [lib/sat-catalogs.ts](lib/sat-catalogs.ts) con 14 regímenes y 14 usos de CFDI.
- **Problema:** Cuando el Owner llega al POS y necesita emitir facturas a SUS clientes, no tiene configurado su propio RFC, razón social, ni régimen fiscal. Esto bloquea la facturación electrónica.
- **Impacto en POS:** El Owner debe configurar manualmente sus datos fiscales post-registro, lo que retrasa el time-to-value y puede causar errores.

### GAP-C: No se captura configuración de impuestos (IVA/IEPS)
**Severidad: ALTA**

- **Estado actual:** No se pregunta al usuario qué impuestos aplica a su negocio.
- **Problema:** México tiene múltiples tasas:
  - IVA: 16% (general), 0% (ciertos alimentos), exento
  - IEPS: variable (bebidas alcohólicas, tabaco, etc.)
- **Asunción peligrosa:** El POS probablemente asigna IVA 16% por defecto, lo que es incorrecto para:
  - Food trucks/taquerías vendiendo alimentos preparados (pueden aplicar 0% en ciertos casos)
  - Bares (IEPS adicional en bebidas alcohólicas)
  - Farmacias (IVA 0% en medicinas)
- **Impacto:** Precios incorrectos, facturas con impuestos erróneos, riesgo fiscal para el negocio.

### GAP-D: Los CTAs genéricos no pasan plan ni giro
**Severidad: MEDIA**

- **Estado actual:** 4 de 5 puntos de entrada al registro no envían `plan` ni `giro`:
  - Hero: `{APP_URL}/register` (sin params)
  - Navbar: `{APP_URL}/register` (sin params)
  - HowItWorks: `{APP_URL}/register` (sin params)
  - Footer: `{APP_URL}/register` (sin params)
  - PricingSection: `{APP_URL}/register?plan={plan}&giro={giro}` (con params)
- **Problema:** Si el usuario entra por Hero/Navbar, el frontend de registro no sabe qué plan eligió y debe preguntar de nuevo (o asumir Free).
- **Impacto:** Pérdida de contexto de intención de compra, menor conversión.

### GAP-E: No hay API route ni middleware en el landing para pre-procesar datos
**Severidad: BAJA**

- **Estado actual:** El directorio `app/api/` no existe. No hay server actions, API routes, ni middleware.
- **Problema menor:** Todo se delega al frontend externo. Si se quisiera capturar datos adicionales (fiscal, país) en la landing antes de redirigir, no hay infraestructura para ello.

---

## 4. Mapa completo del flujo de datos actual

```
┌────────────────────────────────────────────────────────────────────┐
│  LANDING (pos-landing)                                             │
│                                                                    │
│  Datos recopilados: CERO                                           │
│  Datos transmitidos vía URL:                                       │
│    • plan (solo desde PricingSection)                               │
│    • giro (solo desde PricingSection)                               │
│                                                                    │
│  Datos fiscales en repo pero NO usados en registro:                │
│    • lib/sat-catalogs.ts → REGIMEN_FISCAL (14 opciones)            │
│    • lib/sat-catalogs.ts → USO_CFDI (14 opciones)                  │
│    • Estos solo se usan en /factura (wizard de clientes finales)   │
└───────────────────────────┬────────────────────────────────────────┘
                            │ redirect con ?plan=X&giro=Y
                            ▼
┌────────────────────────────────────────────────────────────────────┐
│  RESTAURANT-APP /register                                          │
│                                                                    │
│  Campos del formulario:                                            │
│    ✅ businessName        (nombre del negocio)                     │
│    ✅ ownerName           (nombre del dueño)                       │
│    ✅ email               (correo electrónico)                     │
│    ✅ password            (contraseña)                             │
│    ✅ businessType        (tipo de negocio / giro)                 │
│    ✅ planType            (plan seleccionado)                      │
│    ❌ country             NO EXISTE                                │
│    ❌ rfc                 NO EXISTE                                │
│    ❌ regimenFiscal       NO EXISTE                                │
│    ❌ taxConfig (IVA/IEPS) NO EXISTE                               │
│    ❌ codigoPostal        NO EXISTE                                │
│    ❌ estado/entidad      NO EXISTE                                │
│    ❌ moneda              NO EXISTE (asume MXN)                    │
└───────────────────────────┬────────────────────────────────────────┘
                            │ POST /auth/register
                            ▼
┌────────────────────────────────────────────────────────────────────┐
│  POS-API /auth/register                                            │
│                                                                    │
│  Payload recibido:                                                 │
│  {                                                                 │
│    "businessName": "Mi Taquería",                                  │
│    "ownerName": "Juan Pérez",                                      │
│    "email": "juan@correo.com",                                     │
│    "password": "****",                                             │
│    "businessType": "foodtruck",                                    │
│    "planType": "basic"                                             │
│  }                                                                 │
│                                                                    │
│  Crea:                                                             │
│    • Business (onboardingCompleted=false, sin datos fiscales)      │
│    • Branch (sucursal matriz)                                      │
│    • User (role=Owner)                                             │
│    • UserBranch                                                    │
│    • Default zones + category                                      │
│    • Trial 14 días (si plan pagado)                                │
└────────────────────────────────────────────────────────────────────┘
```

---

## 5. Datos que FALTAN vs. Dónde se podrían capturar

| Dato faltante | Impacto en POS | Dónde capturarlo | Prioridad |
|---|---|---|---|
| **País** (`country`) | Determina moneda, formato fiscal, impuestos | Landing → query param O Registro → nuevo campo | P0 |
| **RFC del negocio** | Requerido para emitir CFDI | Registro O Onboarding paso adicional | P1 |
| **Régimen fiscal** | Determina obligaciones y tipo de factura | Registro O Onboarding paso adicional | P1 |
| **Código postal** | Requerido en CFDI, determina zona SAT | Registro O Onboarding paso adicional | P1 |
| **Config. IVA** | Tasa correcta en productos y tickets | Onboarding (derivable del giro + régimen) | P1 |
| **Config. IEPS** | Requerido para bares, tabaquerías | Onboarding (derivable del giro) | P2 |
| **Moneda** | Precios, reportes, facturación | Derivable del país (default MXN) | P2 |
| **Estado/Entidad** | Reportes regionales, CFDI lugar de expedición | Derivable del código postal | P2 |

---

## 6. Recomendaciones de Implementación

### Opción A: Capturar datos mínimos en el Landing (recomendada)

Agregar un paso intermedio en la landing antes de redirigir al registro externo. El flujo sería:

```
Pricing CTA click
    → Modal/Step: "¿En qué país está tu negocio?" (default: México)
    → Si México: "¿Cuál es tu régimen fiscal?" (dropdown con sat-catalogs.ts)
    → Redirect: {APP_URL}/register?plan=X&giro=Y&country=MX&taxRegime=612
```

**Ventajas:** Reutiliza los catálogos SAT que ya existen en `lib/sat-catalogs.ts`. Los datos viajan como query params sin necesidad de backend en el landing.

**Campos a agregar como query params:**

```
?plan=basic
&giro=restaurant
&country=MX              ← NUEVO
&taxRegime=612           ← NUEVO (código SAT)
```

### Opción B: Capturar datos en el Onboarding del restaurant-app

No modificar el landing. Agregar un paso fiscal al wizard de onboarding (que ya tiene 4 pasos). El nuevo paso pediría:

- País (default MX)
- RFC del negocio
- Régimen fiscal (reutilizar catálogo)
- Código postal fiscal

**Desventaja:** Agrega fricción al onboarding que ya es largo (ver GAP-002 y GAP-003 de AUDIT-010).

### Opción C: Híbrido (mínimo en landing, detalle en onboarding)

- **Landing:** Capturar solo `country` (un click/select)
- **Registro:** Agregar `rfc` como campo opcional
- **Onboarding:** Agregar paso fiscal con régimen, CP, y configuración de impuestos

Esta opción balancea captura temprana de datos con baja fricción.

---

## 7. Archivos clave del Landing

| Archivo | Relevancia para este audit |
|---|---|
| [components/PricingSection.tsx:373](components/PricingSection.tsx) | Único CTA que envía `plan` y `giro` como query params |
| [components/Hero.tsx:32](components/Hero.tsx) | CTA genérico sin params |
| [components/Navbar.tsx:58](components/Navbar.tsx) | CTA genérico sin params |
| [components/HowItWorks.tsx:72](components/HowItWorks.tsx) | CTA genérico sin params |
| [components/Footer.tsx:8](components/Footer.tsx) | CTA genérico sin params |
| [lib/sat-catalogs.ts](lib/sat-catalogs.ts) | Catálogos de Régimen Fiscal y Uso CFDI (YA EXISTEN, no se usan en registro) |
| [lib/stripe-prices.ts](lib/stripe-prices.ts) | Mapeo Stripe sin metadata fiscal |
| [lib/api.ts](lib/api.ts) | Solo API de facturación pública (no registro) |

---

*Esperando comando "Proceed" para iniciar implementación.*
