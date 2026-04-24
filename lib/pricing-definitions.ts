export type PlanSlug = "free" | "basic" | "pro" | "enterprise";
export type GiroSlug = "restaurant" | "cafe" | "retail" | "general";
export type PricingGroup = "Restaurant" | "Standard" | "General";
export type BillingCycle = "monthly" | "annual";

export const ANNUAL_BILLED_MONTHS = 10;

type PaidPlanSlug = Exclude<PlanSlug, "free">;

const monthlyByGroup: Record<PricingGroup, Partial<Record<PaidPlanSlug, number>>> = {
  Restaurant: { basic: 199, pro: 499, enterprise: 999 },
  Standard: { basic: 149, pro: 349, enterprise: 799 },
  General: { pro: 249, enterprise: 599 },
};

export function getMonthlyPrice(group: PricingGroup, plan: PlanSlug): number | null {
  if (plan === "free") return 0;
  return monthlyByGroup[group][plan] ?? null;
}

export function getAnnualTotal(group: PricingGroup, plan: PlanSlug): number | null {
  const monthly = getMonthlyPrice(group, plan);
  if (monthly === null || monthly === 0) return null;
  return monthly * ANNUAL_BILLED_MONTHS;
}

export function getEffectiveMonthly(group: PricingGroup, plan: PlanSlug, cycle: BillingCycle): number | null {
  const monthly = getMonthlyPrice(group, plan);
  if (monthly === null || monthly === 0) return monthly;
  if (cycle === "annual") return Math.ceil((monthly * ANNUAL_BILLED_MONTHS) / 12);
  return monthly;
}

export interface GiroDefinition {
  slug: GiroSlug;
  label: string;
  subtitle: string;
  group: PricingGroup;
  visiblePlans: PlanSlug[];
  popularPlan?: PlanSlug;
}

export const giros: GiroDefinition[] = [
  {
    slug: "restaurant",
    label: "Restaurantes y Bares",
    subtitle: "Restaurantes, fondas, bares, cantinas",
    group: "Restaurant",
    visiblePlans: ["free", "basic", "pro", "enterprise"],
    popularPlan: "pro",
  },
  {
    slug: "cafe",
    label: "Comida Rápida y Cafés",
    subtitle: "Cafeterías, taquerías, food trucks, juguerías",
    group: "Standard",
    visiblePlans: ["free", "basic", "pro", "enterprise"],
    popularPlan: "basic",
  },
  {
    slug: "retail",
    label: "Tiendas y Comercios",
    subtitle: "Abarrotes, farmacias, ferreterías, papelerías",
    group: "Standard",
    visiblePlans: ["free", "basic", "pro", "enterprise"],
    popularPlan: "basic",
  },
  {
    slug: "general",
    label: "Servicios Especializados",
    subtitle: "Salones, estéticas, servicios, cualquier negocio",
    group: "General",
    visiblePlans: ["free", "pro", "enterprise"],
    popularPlan: "pro",
  },
];

export const planNames: Record<PlanSlug, string> = {
  free: "Gratis",
  basic: "Básico",
  pro: "Pro",
  enterprise: "Enterprise",
};

export const planFeatures: Record<PlanSlug, Record<PricingGroup, string[]>> = {
  free: {
    Restaurant: [
      "1 sucursal",
      "Hasta 100 ventas al mes",
      "Base de clientes y Fiado",
      "Tickets y Folios simples",
    ],
    Standard: [
      "1 sucursal",
      "Hasta 100 ventas al mes",
      "Base de clientes y Fiado",
      "Tickets y Folios simples",
    ],
    General: [
      "1 sucursal",
      "Hasta 100 ventas al mes",
      "Base de clientes y Fiado",
      "Tickets y Folios simples",
    ],
  },
  basic: {
    Restaurant: [
      "Facturación CFDI",
      "Folios personalizados",
      "Pantalla de Cocina (KDS)",
      "Plataformas de Delivery",
      "Alertas de Inventario",
    ],
    Standard: [
      "Facturación CFDI",
      "Folios personalizados",
      "Alertas de Inventario",
    ],
    General: [
      "Facturación CFDI",
      "Folios personalizados",
      "Recordatorios de citas",
    ],
  },
  pro: {
    Restaurant: [
      "3 sucursales",
      "Reportes avanzados",
      "Multi-bodega",
      "Programa de Lealtad",
      "App de Meseros",
      "Kiosko autoservicio",
    ],
    Standard: [
      "3 sucursales",
      "Reportes avanzados",
      "Multi-bodega",
      "Programa de Lealtad",
      "Kiosko autoservicio",
    ],
    General: [
      "3 sucursales",
      "Reportes avanzados",
      "Programa de Lealtad",
      "Recordatorios de citas",
    ],
  },
  enterprise: {
    Restaurant: [
      "Sucursales ilimitadas",
      "API de acceso",
      "Gerente dedicado",
    ],
    Standard: [
      "Sucursales ilimitadas",
      "API de acceso",
      "Gerente dedicado",
    ],
    General: [
      "Sucursales ilimitadas",
      "API de acceso",
      "Gerente dedicado",
    ],
  },
};

export const DEFAULT_REGISTER_QUERY = "plan=free&giro=restaurant&country=MX&cycle=monthly";
