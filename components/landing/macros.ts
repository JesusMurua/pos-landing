// Editorial copy and visual tokens for each macro category.
// The API tells us which macroCategory a business type belongs to;
// this file controls how that macro is presented on the landing.

export type MacroSlug = "food-beverage" | "quick-service" | "retail" | "services";
export type PricingGroup = "Restaurant" | "Standard" | "General";
export type MockKind = "restaurant" | "qsr" | "retail" | "services";

export interface MacroStat {
  value: string;
  label: string;
}

export interface MacroBenefit {
  title: string;
  desc: string;
}

export interface MacroEditorial {
  slug: MacroSlug;
  apiCategory: string;
  /** Slug of a representative business type — used for "Ver Fino para X" CTAs from the home. */
  representativeGiroSlug: string;
  label: string;
  short: string;
  headline: { pre: string; em: string; post: string };
  sub: string;
  accent: string;
  softBg: string;
  softTint: string;
  pricingGroup: PricingGroup;
  badge: string;
  stat1: MacroStat;
  stat2: MacroStat;
  stat3: MacroStat;
  subgiros: string[];
  benefits: [MacroBenefit, MacroBenefit, MacroBenefit];
  mock: MockKind;
}

export const MACROS: MacroEditorial[] = [
  {
    slug: "food-beverage",
    apiCategory: "Food & Beverage",
    representativeGiroSlug: "restaurante",
    label: "Restaurantes y Bares",
    short: "Para que la mesa, la cocina y la caja hablen el mismo idioma",
    headline: { pre: "Tu", em: "All-In-One", post: " para que el servicio fluya." },
    sub: "Desde que el cliente se sienta hasta que paga la cuenta, todo pasa por una misma pantalla. Sin gritos, sin papeles, sin cobros olvidados.",
    accent: "#dc2626",
    softBg: "#fef2f2",
    softTint: "#fff5f5",
    pricingGroup: "Restaurant",
    badge: "Servicio sin fricción",
    stat1: { value: "+38%", label: "rotación de mesas" },
    stat2: { value: "−2 min", label: "por orden a cocina" },
    stat3: { value: "0", label: "comandas perdidas" },
    subgiros: ["Restaurantes", "Bares", "Cantinas", "Sports bars"],
    benefits: [
      { title: "Una mesa, una historia", desc: "Ve quién está sentado, qué pidió y cuánto debe — sin que nadie te lo recuerde." },
      { title: "La cocina recibe sin retraso", desc: "Cada pedido aparece al instante en pantalla. La cocina sabe qué viene y para qué mesa." },
      { title: "Cobros que cuadran solos", desc: "Divide la cuenta, aplica propina o une mesas. La caja siempre cuadra al final del día." },
    ],
    mock: "restaurant",
  },
  {
    slug: "quick-service",
    apiCategory: "Quick Service",
    representativeGiroSlug: "cafeteria",
    label: "Comida Rápida y Cafés",
    short: "Para que la fila avance sin que tu equipo se ahogue",
    headline: { pre: "Velocidad de", em: "barra", post: ". Tranquilidad de sistema." },
    sub: "Tus productos más vendidos siempre a la mano. Cobras, mandas a preparar y emites ticket en lo que el siguiente cliente respira.",
    accent: "#d97706",
    softBg: "#fffbeb",
    softTint: "#fffaf0",
    pricingGroup: "Standard",
    badge: "Hecho para la hora pico",
    stat1: { value: "8 seg", label: "por venta promedio" },
    stat2: { value: "×3", label: "más cobros por hora" },
    stat3: { value: "0", label: "filas de espera" },
    subgiros: ["Cafeterías", "Taquerías", "Hamburgueserías", "Panaderías", "Heladerías"],
    benefits: [
      { title: "Lo que más vendes, al frente", desc: "Tu cajero ya no busca: lo más pedido aparece primero, ordenado por velocidad." },
      { title: "Que el cliente arme su orden", desc: "Habilita un kiosko y deja que el cliente pida solo. Tu equipo se enfoca en preparar." },
      { title: "Apps de delivery, sin caos", desc: "Los pedidos de las apps caen directo a tu pantalla, ya organizados con los de mostrador." },
    ],
    mock: "qsr",
  },
  {
    slug: "retail",
    apiCategory: "Retail",
    representativeGiroSlug: "abarrotes",
    label: "Tiendas y Comercios",
    short: "Para que vendas más y nunca te quedes sin lo importante",
    headline: { pre: "Conoce tu", em: "inventario", post: " antes de que él te conozca a ti." },
    sub: "Cada venta resta. Cada entrada suma. Y si algo está por agotarse, te avisamos antes de que se vuelva un problema.",
    accent: "#2563eb",
    softBg: "#eff6ff",
    softTint: "#f5f9ff",
    pricingGroup: "Standard",
    badge: "Inventario que se cuida solo",
    stat1: { value: "−72%", label: "rupturas de stock" },
    stat2: { value: "100%", label: "ventas registradas" },
    stat3: { value: "+24%", label: "margen visible" },
    subgiros: ["Abarrotes", "Farmacias", "Ferreterías", "Boutiques", "Papelerías"],
    benefits: [
      { title: "Vende sin pensar en precios", desc: "Acerca el producto y sale el precio. El total y el cambio salen solos." },
      { title: "Te avisamos antes de fallar", desc: "Cuando un producto está por acabarse, te llega un aviso para que pidas a tiempo." },
      { title: "Sabe qué te deja dinero", desc: "Reportes claros que te dicen qué producto vende, cuál te deja margen y cuál solo ocupa lugar." },
    ],
    mock: "retail",
  },
  {
    slug: "services",
    apiCategory: "Services",
    representativeGiroSlug: "gimnasio",
    label: "Servicios Especializados",
    short: "Para que cobres por lo que haces, no por lo que tienes en stock",
    headline: { pre: "Tu", em: "agenda", post: ", tu cobro y tus clientes en un solo lugar." },
    sub: "Crea membresías, cobra por sesión o vende paquetes. El cliente recibe su recordatorio y tú recibes el pago — todo solo.",
    accent: "#7c3aed",
    softBg: "#f5f3ff",
    softTint: "#faf8ff",
    pricingGroup: "General",
    badge: "Recurrencia, sin perseguirla",
    stat1: { value: "94%", label: "renovaciones automáticas" },
    stat2: { value: "−1.2 hr", label: "menos cobranza al día" },
    stat3: { value: "+41%", label: "vida del cliente" },
    subgiros: ["Estéticas", "Barberías", "Gimnasios", "Spas", "Talleres", "Consultorios"],
    benefits: [
      { title: "El cliente llega recordado", desc: "Recibe un mensaje el día de su cita. Tú evitas huecos y él no se queda fuera." },
      { title: "Cobros que se renuevan solos", desc: "Define la membresía una vez. Cada mes, el cargo se hace sin que muevas un dedo." },
      { title: "Sabes quién te deja más", desc: "Conoce qué clientes vienen seguido, cuáles se enfriaron y a quiénes vale la pena recuperar." },
    ],
    mock: "services",
  },
];

export function getMacroByApiCategory(category: string): MacroEditorial | undefined {
  return MACROS.find((m) => m.apiCategory === category);
}

export function getMacroBySlug(slug: string): MacroEditorial | undefined {
  return MACROS.find((m) => m.slug === slug);
}

export const TRUSTED_BY = ["Solare", "Maverick", "Greenish", "Lumora", "Northwind", "Verdano"];

export const TRES_RAZONES = [
  { num: "01", title: "Cualquiera lo aprende solo", text: "Si tu equipo sabe usar un celular, ya sabe usar Fino. Sin manuales, sin cursos, sin pretextos." },
  { num: "02", title: "Sigue vivo aunque caiga la luz", text: "Se va el WiFi, se va la luz — Fino sigue cobrando. Cuando vuelve la señal, todo se acomoda solo." },
  { num: "03", title: "Crece a tu paso, no al suyo", text: "Empiezas tú solo, después contratas, después abres otra. Fino te acompaña sin cambiar de sistema." },
];

export const POWER_FEATURES = [
  {
    title: "Vende donde estés, vea quien sea",
    desc: "Tu equipo cobra desde tablet, celular o computadora. Y desde donde estés, tú ves cómo va el día.",
    chip: "Multi-dispositivo",
  },
  {
    title: "Decisiones con cabeza fría",
    desc: "Reportes que te enseñan qué vendes, a quién, a qué hora y con cuánto margen. No más corazonadas.",
    chip: "Reportes en vivo",
  },
] as const;
