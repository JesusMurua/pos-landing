export type PlanSlug = "free" | "basic" | "pro" | "enterprise";
export type BillingCycle = "monthly" | "annual";
export type PricingGroup = "Restaurant" | "Standard" | "General";

type PaidPlanSlug = Exclude<PlanSlug, "free">;

const giroToGroup: Record<string, PricingGroup> = {
  restaurant: "Restaurant",
  bar: "Restaurant",
  cafe: "Standard",
  "food-truck": "Standard",
  foodtruck: "Standard",
  retail: "Standard",
  "abarrotes-retail": "Standard",
  general: "General",
};

const priceIds: Record<
  PaidPlanSlug,
  Record<PricingGroup, Record<BillingCycle, string>>
> = {
  basic: {
    General: {
      monthly: "price_1TGVDNGd6oMtnYKN3mOfuloV",
      annual: "price_1TGVGBGd6oMtnYKNOtYdklZ7",
    },
    Standard: {
      monthly: "price_1TGjYIGd6oMtnYKNaWsO5wW9",
      annual: "price_1TGjYvGd6oMtnYKNNLJSrXWk",
    },
    Restaurant: {
      monthly: "price_1TGjZTGd6oMtnYKNKH4mV0WR",
      annual: "price_1TGjaKGd6oMtnYKNMlQbqt1f",
    },
  },
  pro: {
    General: {
      monthly: "price_1TGjiaGd6oMtnYKNFY6ZbnMS",
      annual: "price_1TGjj3Gd6oMtnYKNYX06rZPx",
    },
    Standard: {
      monthly: "price_1TGjjMGd6oMtnYKNnUYsOsmr",
      annual: "price_1TGjk0Gd6oMtnYKNbIyJOpr8",
    },
    Restaurant: {
      monthly: "price_1TGVDsGd6oMtnYKNGYySti0z",
      annual: "price_1TGVFhGd6oMtnYKNJGIXZ3d3",
    },
  },
  enterprise: {
    General: {
      monthly: "price_1TGjrfGd6oMtnYKNaEVHitCF",
      annual: "price_1TGjs2Gd6oMtnYKN4BvXPwXw",
    },
    Standard: {
      monthly: "price_1TGjsMGd6oMtnYKNV4ixW9ms",
      annual: "price_1TGjtEGd6oMtnYKNMDlACMO2",
    },
    Restaurant: {
      monthly: "price_1TGVEDGd6oMtnYKNC7v50zld",
      annual: "price_1TGVErGd6oMtnYKNfEBSfiPS",
    },
  },
};

export function getPriceId(
  plan: PlanSlug,
  giroSlug: string,
  cycle: BillingCycle
): string | null {
  if (plan === "free") return null;
  const group = giroToGroup[giroSlug];
  if (!group) {
    throw new Error(`Unknown giro slug: ${giroSlug}`);
  }
  return priceIds[plan][group][cycle];
}
