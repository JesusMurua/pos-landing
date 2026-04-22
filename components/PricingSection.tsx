"use client";

import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";
import BrioMascot from "./ui/BrioMascot";
import { getPriceId } from "../lib/stripe-prices";
import {
  giros,
  planNames,
  planFeatures,
  getMonthlyPrice,
  getEffectiveMonthly,
  type BillingCycle,
  type PlanSlug,
} from "../lib/pricing-definitions";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export default function PricingSection() {
  const [activeGiro, setActiveGiro] = useState(0);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const currentGiro = giros[activeGiro];

  const gridClass =
    currentGiro.visiblePlans.length === 2
      ? "grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
      : currentGiro.visiblePlans.length === 3
        ? "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        : "grid sm:grid-cols-2 lg:grid-cols-4 gap-6";

  return (
    <section id="precios" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Planes para cada negocio"
          subtitle="Empieza gratis. Sube de plan cuando crezcas."
        />

        {/* Mascota según giro activo */}
        <div className="flex justify-center mb-6 transition-all duration-300">
          <BrioMascot giro={currentGiro.slug} size={72} />
        </div>

        {/* Giro tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2 pb-2 px-1 max-w-full">
            {giros.map((giro, i) => (
              <button
                key={giro.slug}
                onClick={() => setActiveGiro(i)}
                className={`flex flex-col items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  i === activeGiro
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{giro.label}</span>
                <span className={`text-[10px] font-normal ${i === activeGiro ? "text-primary-100" : "text-gray-400"}`}>
                  {giro.subtitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Billing cycle toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Anual — 2 meses gratis
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className={gridClass}>
          {currentGiro.visiblePlans.map((planSlug) => {
            const isPopular = currentGiro.popularPlan === planSlug;
            const priceId = getPriceId(planSlug, currentGiro.slug, billingCycle);
            const monthly = getMonthlyPrice(currentGiro.group, planSlug);
            const effectiveMonthly = getEffectiveMonthly(currentGiro.group, planSlug, billingCycle);

            return (
              <div
                key={planSlug}
                className={`relative flex flex-col rounded-[14px] p-6 transition-all ${
                  isPopular
                    ? "border-2 border-primary-500 shadow-lg scale-[1.02]"
                    : "border border-gray-200"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-semibold tracking-[0.08em] px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-[15px] font-bold text-[#0f172a]" style={{ letterSpacing: "-0.3px" }}>
                    {planNames[planSlug]}
                  </h3>
                  <div className="mt-2">
                    {monthly === 0 ? (
                      <span className="text-3xl font-bold text-gray-900">Gratis</span>
                    ) : billingCycle === "annual" && effectiveMonthly !== null ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">{formatPrice(effectiveMonthly)}</span>
                        <span className="text-sm text-gray-500">/mes</span>
                        <span className="ml-2 inline-block text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                          Anual
                        </span>
                        <p className="text-xs text-primary-600 mt-1">Paga 10 meses, disfruta 12</p>
                      </>
                    ) : monthly !== null ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">{formatPrice(monthly)}</span>
                        <span className="text-sm text-gray-500">/mes</span>
                      </>
                    ) : null}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {planFeatures[planSlug].map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <svg className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isPopular ? "primary" : "outline"}
                  size="md"
                  href={`${APP_URL}/register?plan=${planSlug}&giro=${currentGiro.slug}&country=MX&cycle=${billingCycle}${priceId ? `&priceId=${priceId}` : ""}`}
                  className="w-full"
                >
                  Empezar con este plan →
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
