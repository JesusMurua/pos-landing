const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const CATALOG_API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.finomx.app/api";

export interface PlanFeatureDto {
  code: string;
  name: string;
  description?: string;
  isQuantitative?: boolean;
  applicableMacroCategoryIds?: number[];
  defaultLimit?: number | null;
  resourceLabel?: string | null;
}

export interface PlanDto {
  id: number;
  internalCode: string;
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  trialDays: number;
  features: (string | PlanFeatureDto)[];
}

const FALLBACK_PLANS: PlanDto[] = [
  {
    id: 1,
    internalCode: "free",
    name: "Gratis",
    monthlyPrice: 0,
    annualPrice: 0,
    trialDays: 0,
    features: [
      "1 sucursal",
      "Hasta 100 ventas al mes",
      "Base de clientes y Fiado",
      "Tickets y Folios simples",
    ],
  },
  {
    id: 2,
    internalCode: "basic",
    name: "Básico",
    monthlyPrice: 199,
    annualPrice: 1990,
    trialDays: 14,
    features: [
      "Facturación CFDI",
      "Folios personalizados",
      "Pantalla de Cocina (KDS)",
      "Plataformas de Delivery",
      "Alertas de Inventario",
    ],
  },
  {
    id: 3,
    internalCode: "pro",
    name: "Pro",
    monthlyPrice: 499,
    annualPrice: 4990,
    trialDays: 14,
    features: [
      "3 sucursales",
      "Reportes avanzados",
      "Multi-bodega",
      "Programa de Lealtad",
      "App de Meseros",
      "Kiosko autoservicio",
    ],
  },
  {
    id: 4,
    internalCode: "enterprise",
    name: "Enterprise",
    monthlyPrice: 999,
    annualPrice: 9990,
    trialDays: 14,
    features: [
      "Sucursales ilimitadas",
      "API de acceso",
      "Gerente dedicado",
    ],
  },
];

interface PlanApiResponse {
  id: number;
  code?: string;
  internalCode?: string;
  name: string;
  sortOrder?: number;
  monthlyPrice?: number | null;
  annualPrice?: number | null;
  currency?: string;
  trialDays?: number;
  features?: (string | PlanFeatureDto)[];
}

function normalizePlan(raw: PlanApiResponse): PlanDto {
  const rawCode = raw.internalCode ?? raw.code ?? "";
  return {
    id: raw.id,
    internalCode: rawCode.toLowerCase(),
    name: raw.name,
    monthlyPrice: raw.monthlyPrice ?? null,
    annualPrice: raw.annualPrice ?? null,
    trialDays: raw.trialDays ?? 0,
    features: raw.features ?? [],
  };
}

export async function getPlans(): Promise<PlanDto[]> {
  try {
    const res = await fetch(`${CATALOG_API_BASE}/catalog/plans`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_PLANS;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return FALLBACK_PLANS;
    return (data as PlanApiResponse[]).map(normalizePlan);
  } catch {
    return FALLBACK_PLANS;
  }
}

export interface BusinessTypeDto {
  id: number;
  macroCategory: string;
  macroCategoryId?: number;
  name: string;
  slug: string;
}

const FALLBACK_BUSINESS_TYPES: BusinessTypeDto[] = [
  { id: 1, macroCategoryId: 1, macroCategory: "Food & Beverage", name: "Restaurante", slug: "restaurante" },
  { id: 2, macroCategoryId: 1, macroCategory: "Food & Beverage", name: "Bar", slug: "bar" },
  { id: 3, macroCategoryId: 2, macroCategory: "Quick Service", name: "Taquería", slug: "taqueria" },
  { id: 4, macroCategoryId: 2, macroCategory: "Quick Service", name: "Cafetería", slug: "cafeteria" },
  { id: 5, macroCategoryId: 3, macroCategory: "Retail", name: "Abarrotes", slug: "abarrotes" },
  { id: 6, macroCategoryId: 3, macroCategory: "Retail", name: "Farmacia", slug: "farmacia" },
  { id: 7, macroCategoryId: 4, macroCategory: "Services", name: "Gimnasio", slug: "gimnasio" },
  { id: 8, macroCategoryId: 4, macroCategory: "Services", name: "Estética", slug: "estetica" },
];

export async function getBusinessTypes(): Promise<BusinessTypeDto[]> {
  try {
    const res = await fetch(`${CATALOG_API_BASE}/catalog/businesstypes`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_BUSINESS_TYPES;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return FALLBACK_BUSINESS_TYPES;
    return data as BusinessTypeDto[];
  } catch {
    return FALLBACK_BUSINESS_TYPES;
  }
}

export async function getBusinessTypeBySlug(slug: string): Promise<BusinessTypeDto | null> {
  const all = await getBusinessTypes();
  return all.find((b) => b.slug === slug) ?? null;
}

export interface TicketData {
  orderId: number;
  restaurantName: string;
  date: string;
  total: number;
  items?: { name: string; quantity: number; price: number }[];
}

export interface FiscalData {
  rfc: string;
  razonSocial: string;
  codigoPostal: string;
  regimenFiscal: string;
  usoCfdi: string;
  email: string;
}

export interface InvoiceResult {
  invoiceId: number;
  status: string;
  pdfUrl: string;
  xmlUrl: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function lookupTicket(
  orderId: string,
  totalCents: number,
): Promise<TicketData> {
  const res = await fetch(
    `${API_BASE}/api/publicinvoicing/${encodeURIComponent(orderId)}?totalCents=${totalCents}`,
  );

  if (!res.ok) {
    if (res.status === 404) {
      throw new ApiError("Ticket no encontrado. Verifica el número de orden.", 404);
    }
    if (res.status === 403) {
      throw new ApiError("El monto no coincide con el ticket.", 403);
    }
    if (res.status === 429) {
      throw new ApiError("Demasiadas solicitudes. Espera un momento e intenta de nuevo.", 429);
    }
    throw new ApiError("Error al buscar el ticket. Intenta de nuevo.", res.status);
  }

  const body = await res.json();
  return {
    orderId: body.orderId,
    restaurantName: body.businessName,
    date: body.issuedAt,
    total: body.totalCents / 100,
    items: body.items?.map((item: { name: string; quantity: number; totalCents: number }) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.totalCents / 100,
    })),
  };
}

export async function requestInvoice(
  orderId: number,
  totalCents: number,
  fiscal: FiscalData,
): Promise<InvoiceResult> {
  const res = await fetch(`${API_BASE}/api/publicinvoicing/${encodeURIComponent(orderId)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      totalCents,
      rfc: fiscal.rfc,
      legalName: fiscal.razonSocial,
      zipCode: fiscal.codigoPostal,
      taxRegime: fiscal.regimenFiscal,
      useOfCfdi: fiscal.usoCfdi,
      email: fiscal.email,
    }),
  });

  if (!res.ok) {
    if (res.status === 409) {
      throw new ApiError("Este ticket ya fue facturado.", 409);
    }
    if (res.status === 422) {
      const body = await res.json().catch(() => null);
      throw new ApiError(
        body?.message || "Datos fiscales inválidos. Revisa la información.",
        422,
      );
    }
    if (res.status === 429) {
      throw new ApiError("Demasiadas solicitudes. Espera un momento e intenta de nuevo.", 429);
    }
    throw new ApiError("Error al solicitar la factura. Intenta de nuevo.", res.status);
  }

  return res.json();
}
