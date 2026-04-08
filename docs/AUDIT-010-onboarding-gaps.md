# AUDIT-010 — Landing, Registration & First-Time Onboarding Flow

**Fecha:** 2026-04-07
**Autor:** Claude Code (Auditoría automatizada)
**Repos auditados:** `pos-landing` (Next.js), `restaurant-app` (Angular), `pos-api` (.NET)
**Severidad general:** ALTA — flujo roto para usuarios Free y fricción innecesaria para Owners

---

## 1. Estado Actual de Paquetes de Suscripción y Feature Flags

### 1.1 Definición de Tiers

Los planes se definen en **dos lugares**:

| Ubicación | Propósito |
|---|---|
| `pos-landing/components/PricingSection.tsx` (L35-246) | UI de la landing — qué ve el usuario |
| `pos-landing/lib/stripe-prices.ts` (L16-62) | Mapeo a Stripe Price IDs para cobro |

**Tiers existentes:** Free, Básico, Pro, Enterprise — por cada uno de 6 giros de negocio.

### 1.2 Feature Matrix del Tier Free (todos los giros)

| Giro | Productos | Sucursales | Usuarios | POS Mode | Mesas | KDS | Impresora | Reportes |
|---|---|---|---|---|---|---|---|---|
| Restaurante | 50 | 1 | 2 | Mostrador básico | **NO** | **NO** | **NO** | **NO** |
| Café | 50 | 1 | 2 | Mostrador básico | N/A | **NO** | **NO** | **NO** |
| Bar | 50 | 1 | 2 | Mostrador básico | **NO** | **NO** | **NO** | **NO** |
| Retail | 50 | 1 | 2 | Cobro básico | N/A | N/A | **NO** | **NO** |
| Food Truck | 50 | 1 | 2 | Cobro rápido | N/A | N/A | **NO** | **NO** |
| General | 50 | 1 | 2 | Cobro básico | N/A | N/A | **NO** | **NO** |

### 1.3 GAP CRITICO: El Tier Free no incluye operaciones básicas de caja

> **El plan Free dice "Modo Mostrador básico" y "Cobro en efectivo" pero NO menciona explícitamente "Corte de caja", "Apertura de caja", ni "Reportes de turno".**

Esto genera ambigüedad:
- La landing **promete** que puedes cobrar ("Empieza a cobrar").
- Pero el backend puede estar **bloqueando** la funcionalidad de Corte de Caja/Cash Register como feature de plan pagado.
- **No existe un archivo de feature flags centralizado** en el landing ni en el frontend — la lógica de gating vive exclusivamente en el backend (`pos-api`), sin documentación visible.

### 1.4 Stripe Price ID Mapping

```
Free       → Sin precio Stripe (no pasa por checkout)
Basic      → price_1TG... (3 grupos: Restaurant, Standard, General × monthly/annual)
Pro        → price_1TG... (3 grupos × 2 ciclos)
Enterprise → price_1TG... (3 grupos × 2 ciclos)
```

**Observación:** El plan Free no tiene `PlanSlug` en `stripe-prices.ts` (tipo = `"basic" | "pro" | "enterprise"`). El Free se maneja por omisión, lo cual puede causar edge cases si el backend no lo trata correctamente.

---

## 2. Flujo Exacto de Routing: Registration → Primera Pantalla

### 2.1 Diagrama del flujo actual

```
┌─────────────────────────────────────────────────────────────────────┐
│  LANDING (pos-landing)                                              │
│                                                                     │
│  Hero CTA: "Empezar gratis" → {APP_URL}/register                   │
│  Pricing CTA: "Empezar con este plan" → {APP_URL}/register?plan=   │
│               {plan}&giro={giro}                                    │
└───────────────────────────┬─────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  RESTAURANT-APP: /register                                          │
│  (register.component.ts)                                            │
│                                                                     │
│  1. POST /auth/register                                             │
│     → Backend crea: Business, Branch, User(role=Owner), UserBranch  │
│     → Retorna JWT con onboardingCompleted=false                     │
│  2. handleLoginSuccess(response)                                    │
│  3. Si hay pendingPlan → localStorage                               │
│  4. router.navigate(['/onboarding'])  ← SIEMPRE                    │
└───────────────────────────┬─────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  /onboarding — Wizard de 4 pasos                                    │
│  (onboarding.component.ts, ~603 líneas)                             │
│                                                                     │
│  Paso 1: Seleccionar tipo de negocio (giro)                         │
│  Paso 2: Configurar zonas (si aplica al giro)                       │
│  Paso 3: Agregar primer producto                                    │
│  Paso 4: ⚠️ SELECCIONAR MODO DE DISPOSITIVO                        │
│           (cashier, tables, kitchen, kiosk)                          │
│                                                                     │
│  Al completar:                                                      │
│  → PUT /business/type                                               │
│  → POST /zone, POST /products                                       │
│  → configService.saveDeviceConfig() ← guarda modo en localStorage   │
│  → POST /business/complete-onboarding → nuevo JWT                   │
│  → router.navigate(['/pin'])  ← SIEMPRE                            │
└───────────────────────────┬─────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  ⚠️ /pin — Pantalla de PIN de 4 dígitos                            │
│  (pin.component.ts, ~361 líneas)                                    │
│                                                                     │
│  • El OWNER debe ingresar un PIN de 4 dígitos                       │
│  • Protección anti brute-force (3/6/10 intentos)                    │
│  • pinLogin(branchId, pin) → preload de datos                       │
│                                                                     │
│  Routing por rol + modo de dispositivo:                              │
│  Owner/Manager → /admin                                             │
│  Kitchen → /kitchen                                                 │
│  Host → /tables                                                     │
│  Waiter → /tables o /pos (según modo)                               │
│  Cashier → /pos, /pos/retail, /pos/counter, /pos/quick              │
└───────────────────────────┬─────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Destino final (según rol del usuario)                              │
│                                                                     │
│  Owner → /admin  (correcto, pero llega después de 2 pantallas       │
│                   innecesarias: modo de dispositivo + PIN)           │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Guards que intervienen en el flujo

| Guard | Archivo | Condición | Redirección |
|---|---|---|---|
| `authGuard` | `core/guards/auth.guard.ts` | `!isAuthenticated()` | → `/pin` |
| `authGuard` | (mismo) | `onboardingCompleted ≠ true` | → `/onboarding` |
| `authGuard` | (mismo) | `!configService.isDeviceConfigured()` | → `/setup` |
| `authGuard` | (mismo) | `role ∉ allowedRoles` | → `/pin` |
| `onboardingGuard` | `core/guards/onboarding.guard.ts` | `onboardingCompleted ≠ true` | → `/onboarding` |
| `setupGuard` | `core/guards/setup.guard.ts` | `!isDeviceConfigured()` | → `/setup` |

**Cadena de guards en `/admin`:** `authGuard` → `onboardingGuard` (doble check de onboarding).

---

## 3. GAPS y Cuellos de Botella de UX Identificados

### GAP-001: Tier Free bloquea operaciones core de POS
**Severidad: CRITICA**

- **Problema:** El plan Free promete "Modo Mostrador básico" y "Cobro en efectivo", pero no se garantiza que el backend permita operaciones fundamentales como abrir/cerrar caja (Corte de Caja). El usuario Free puede registrarse esperando cobrar y encontrarse bloqueado.
- **Causa raíz:** No existe un archivo de feature flags centralizado. La lógica de gating vive dispersa en el backend sin documentar qué operaciones permite cada plan. La landing define features como texto UI pero no como contratos con el backend.
- **Impacto:** Abandono inmediato del usuario Free. Pérdida de conversión Free → Paid.

### GAP-002: Owner forzado a seleccionar "Modo de Dispositivo" durante onboarding
**Severidad: ALTA**

- **Problema:** En el Paso 4 del onboarding, el Owner (administrador del negocio) debe elegir un modo de dispositivo (cashier, tables, kitchen, kiosk). Esto es un concepto de **terminal/punto de venta**, no de administrador.
- **Causa raíz:** El onboarding asume que el primer dispositivo ES un POS terminal. No distingue entre "este es MI dispositivo como Owner" vs. "este es un terminal de caja".
- **Impacto:** Confusión del Owner que no entiende por qué le piden elegir "Cajero" o "Cocina" cuando quiere administrar su negocio. El modo seleccionado afecta el routing post-PIN.

### GAP-003: Owner obligado a pasar por pantalla de PIN
**Severidad: ALTA**

- **Problema:** Después del onboarding, el Owner es redirigido a `/pin` y debe ingresar un PIN de 4 dígitos. El PIN es un mecanismo de **cambio rápido de turno entre empleados en un terminal compartido**, no un flujo de autenticación para el administrador.
- **Causa raíz:** El `authGuard` no distingue entre "primera sesión del Owner post-registro" y "empleado entrando a turno en terminal". La ruta `/` redirige a `/pin` sin excepción.
- **Impacto:** Fricción extrema. El Owner acaba de autenticarse con email+password, completó el onboarding, y ahora necesita un PIN que probablemente ni tiene configurado o no recuerda.

### GAP-004: Confusión de roles — Owner tratado como Cashier
**Severidad: ALTA**

- **Problema:** El routing post-PIN para Owner va a `/admin`, pero el hecho de que pase por el flujo de PIN + Device Mode implica que el sistema lo trata como un operador de terminal. Si el Owner selecciona modo "cashier" en el onboarding (porque es el más obvio), el `authGuard` valida el rol contra `allowedRoles` del dispositivo, no contra el rol real del usuario.
- **Causa raíz:** El concepto de "Device Mode" se mezcla con el concepto de "User Role". El Owner tiene role=Owner, pero el dispositivo tiene mode=cashier, creando conflicto semántico.
- **Impacto:** En algunos edge cases, el Owner puede quedar atrapado en el POS en vez de llegar al Dashboard administrativo.

### GAP-005: Device Setup como segundo muro (flujo alternativo)
**Severidad: MEDIA**

- **Problema:** Si `isDeviceConfigured()` retorna false (localStorage borrado, otro navegador, modo incógnito), el `authGuard` redirige a `/setup` — una pantalla diseñada para configurar **terminales de empleados**, no para el Owner.
- **Causa raíz:** `DeviceConfig` se almacena solo en `localStorage`, no en el servidor. Si se pierde, el flujo se reinicia. El setup wizard tiene dos flujos: "Email Login (Owner)" y "Activation Code (Anonymous)", pero ambos terminan en selección de modo de dispositivo.
- **Impacto:** El Owner que borra caché o cambia de navegador debe re-configurar el dispositivo como si fuera un terminal nuevo.

### GAP-006: Free plan sin Stripe Price ID — edge case de registro
**Severidad: MEDIA**

- **Problema:** `PlanSlug` type es `"basic" | "pro" | "enterprise"` — no incluye `"free"`. Sin embargo, la landing envía `?plan=free` en el CTA del tier gratis. Si el backend no maneja explícitamente `plan=free`, podría fallar o ignorar el plan.
- **Causa raíz:** Desconexión entre el frontend landing (que define `slug: "free"`) y el tipo `PlanSlug` del módulo de Stripe (que no lo incluye).
- **Impacto:** Posible error silencioso en el registro que asigna un plan incorrecto al usuario.

### GAP-007: Landing promete "3 meses gratis" pero backend configura 14 días trial
**Severidad: MEDIA**

- **Problema:** El Hero badge dice "Gratis 3 meses — sin tarjeta" y el PricingSection subtítulo dice "3 meses gratis en cualquier plan". Pero el backend (`AuthService.cs`) configura un trial de 14 días para planes pagados.
- **Causa raíz:** Discrepancia entre marketing copy y configuración real del trial en el backend.
- **Impacto:** Expectativa rota del usuario — espera 3 meses gratis, pierde acceso a los 14 días.

---

## 4. Plan de Implementación Paso a Paso

### Fase 1: Corregir el Tier Free (GAP-001, GAP-006)
**Prioridad: P0 — Bloquea la propuesta de valor**

1. **Definir un contrato de features por plan** — Crear archivo `shared/plan-features.ts` (o equivalente en backend) que sea la fuente de verdad para qué permite cada plan. Debe incluir explícitamente:
   - `canOpenCashRegister: true` para todos los planes incluyendo Free
   - `canCloseCashRegister: true` (Corte de Caja) para todos los planes
   - `canViewBasicSalesReport: true` para todos (resumen del día/turno)
   - Features específicos gated a Basic+ (impresora, KDS, reportes avanzados, etc.)

2. **Auditar el backend** (`pos-api`) — Verificar que los endpoints de Caja/Corte no estén gated a un plan específico. Si lo están, abrir para Free.

3. **Agregar `"free"` al tipo `PlanSlug`** o crear un handling explícito para `plan=free` en el registro. Asegurar que el backend no requiera un Stripe Price ID para usuarios Free.

4. **Alinear trial period** — Si se prometen 3 meses, el backend debe configurar `trialEndsAt = now + 90 days`, no 14 días.

### Fase 2: Bifurcar el flujo post-registro por rol (GAP-002, GAP-003, GAP-004)
**Prioridad: P0 — Experiencia rota para Owners**

5. **Crear ruta `/admin/welcome`** — Un dashboard de bienvenida para el Owner que se muestra después del onboarding, sin pasar por `/pin` ni `/setup`.

6. **Modificar el onboarding (Paso 4)** — Para el Owner:
   - **Eliminar la selección de Device Mode**. El dispositivo del Owner se auto-configura como `mode: "admin"` (nuevo modo) o simplemente no requiere configuración de dispositivo.
   - Alternativamente, hacer el Paso 4 opcional con un botón "Configurar después" que envíe directo al Dashboard.

7. **Modificar el routing post-onboarding** — En `onboarding.component.ts`, después de `completeOnboarding()`:
   ```
   SI user.role === 'Owner' || user.role === 'Manager':
     → router.navigate(['/admin/welcome'])  // SIN pasar por /pin
   SINO:
     → router.navigate(['/pin'])  // flujo actual para empleados
   ```

8. **Modificar el `authGuard`** — Agregar excepción para Owners:
   ```
   SI user.role === 'Owner' && isAuthenticated() && onboardingCompleted:
     → NO requerir DeviceConfig
     → NO redirigir a /pin
     → Permitir acceso directo a /admin/**
   ```

### Fase 3: Automatizar Device Setup para el Owner (GAP-005)
**Prioridad: P1 — Reduce fricción en sesiones subsecuentes**

9. **Auto-generar DeviceConfig para el Owner** — Al completar onboarding, guardar automáticamente:
   ```json
   {
     "mode": "admin",
     "deviceName": "Dispositivo principal",
     "businessId": ...,
     "branchId": ...,
     "configuredAt": "..."
   }
   ```

10. **Persistir config en servidor** — Además de localStorage, guardar la DeviceConfig del Owner en el backend para que sobreviva cambio de navegador/dispositivo.

### Fase 4: Limpiar la pantalla de PIN para Owners (GAP-003)
**Prioridad: P1 — Elimina fricción innecesaria**

11. **Owner bypass de PIN** — Si el Owner ya tiene sesión JWT activa (no expirada), no mostrar la pantalla de PIN. El PIN es para cambio rápido de turno entre empleados, no para el administrador.

12. **Auto-crear PIN del Owner** — Durante el registro, generar un PIN por defecto para el Owner (o pedirlo opcionalmente al final del onboarding como paso no-bloqueante). Esto evita el escenario donde el Owner llega al PIN sin tener uno configurado.

### Fase 5: Validar consistencia Landing ↔ App (GAP-007)
**Prioridad: P2 — Marketing vs Realidad**

13. **Alinear copy de trial** — Decidir si el trial es 14 días o 3 meses, y asegurar consistencia entre:
    - `Hero.tsx` badge: "Gratis 3 meses"
    - `PricingSection.tsx` subtítulo: "3 meses gratis en cualquier plan"
    - Backend `AuthService.cs` trial period configuration

14. **Agregar tests E2E** — Crear test que valide el flujo completo:
    - Registro Free → Onboarding → Dashboard (sin PIN/Setup)
    - Registro Basic → Onboarding → Dashboard → Stripe Checkout
    - Verificar que Corte de Caja funciona en plan Free

---

## Resumen de Prioridades

| ID | Gap | Severidad | Fase | Esfuerzo Est. |
|---|---|---|---|---|
| GAP-001 | Free tier bloquea operaciones core | CRITICA | 1 | Backend: audit + fix |
| GAP-006 | `plan=free` sin handling explícito | MEDIA | 1 | Landing + Backend |
| GAP-007 | 3 meses vs 14 días trial | MEDIA | 1 | Backend config |
| GAP-002 | Owner forzado a elegir Device Mode | ALTA | 2 | Frontend onboarding |
| GAP-003 | Owner forzado a PIN screen | ALTA | 2 | Frontend guards |
| GAP-004 | Owner tratado como Cashier | ALTA | 2 | Frontend routing |
| GAP-005 | Device Setup como segundo muro | MEDIA | 3 | Frontend + Backend |

---

## Archivos Clave por Repo

### pos-landing (este repo)
| Archivo | Líneas | Relevancia |
|---|---|---|
| `components/PricingSection.tsx` | L35-246 | Definición de tiers y features |
| `lib/stripe-prices.ts` | L1-74 | Mapeo de Stripe IDs (sin "free") |
| `components/Hero.tsx` | L19 | Badge "3 meses gratis" |
| `components/Navbar.tsx` | L55-59 | CTAs a `/login` y `/register` |

### restaurant-app (Angular frontend)
| Archivo | Líneas | Relevancia |
|---|---|---|
| `src/app/modules/register/register.component.ts` | L145-189 | POST registro + redirect a /onboarding |
| `src/app/modules/onboarding/onboarding.component.ts` | L74-79, L167-180, L487 | Wizard 4 pasos + device mode + complete |
| `src/app/modules/pin/pin.component.ts` | L152-260 | PIN login + routing por rol/modo |
| `src/app/modules/setup/setup.component.ts` | L91-96 | Device setup wizard |
| `src/app/core/guards/auth.guard.ts` | L25-62 | Guard principal (auth→onboarding→setup→role) |
| `src/app/core/guards/onboarding.guard.ts` | L1-45 | Check de onboarding completo |
| `src/app/core/guards/setup.guard.ts` | L1-24 | Check de device configurado |
| `src/app/app.routes.ts` | L1-98 | Definición de rutas y guards |

### pos-api (.NET backend)
| Archivo | Líneas | Relevancia |
|---|---|---|
| `POS.API/Controllers/AuthController.cs` | L1-121 | Endpoints de auth |
| `POS.Services/Service/AuthService.cs` | L171-305 | Lógica de registro (roles, trial, business) |

---

*Esperando comando "Proceed" para iniciar implementación.*
