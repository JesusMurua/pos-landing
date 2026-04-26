// Plan-tier marketing taglines, keyed by `PlanDto.internalCode`.
// All other plan data (name, prices, features) lives in the API (lib/api.ts → getPlans()).
export const PLAN_TAGLINE: Record<string, string> = {
  free: "Perfecto para empezar a vender hoy",
  basic: "Cuando ya estás listo para profesionalizar",
  pro: "Para quien quiere crecer con datos y sucursales",
  enterprise: "Para operaciones que no pueden parar",
};
