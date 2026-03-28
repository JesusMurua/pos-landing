"use client";

import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://restaurant-app-roan-two.vercel.app";

interface Plan {
  name: string;
  slug: string;
  price: string;
  popular?: boolean;
  features: { label: string; included: boolean }[];
}

interface Giro {
  label: string;
  slug: string;
  plans: Plan[];
}

const commonFeatures = [
  "Punto de venta táctil",
  "Gestión de productos",
  "Tickets impresos",
  "Reportes básicos",
  "Soporte por WhatsApp",
  "Modo offline",
  "Multi-sucursal",
  "API e integraciones",
  "Soporte prioritario",
];

function buildPlans(prices: [string, string, string, string], popularIndex: number = 2): Plan[] {
  return [
    {
      name: "Gratis",
      slug: "free",
      price: prices[0],
      features: commonFeatures.map((f, i) => ({ label: f, included: i < 4 })),
    },
    {
      name: "Básico",
      slug: "basic",
      price: prices[1],
      popular: popularIndex === 1,
      features: commonFeatures.map((f, i) => ({ label: f, included: i < 6 })),
    },
    {
      name: "Pro",
      slug: "pro",
      price: prices[2],
      popular: popularIndex === 2,
      features: commonFeatures.map((f, i) => ({ label: f, included: i < 8 })),
    },
    {
      name: "Enterprise",
      slug: "enterprise",
      price: prices[3],
      features: commonFeatures.map(() => ({ label: "", included: true })).map((_, i) => ({
        label: commonFeatures[i],
        included: true,
      })),
    },
  ];
}

const giros: Giro[] = [
  { label: "Restaurante", slug: "restaurant", plans: buildPlans(["Gratis", "$199", "$499", "$999"]) },
  { label: "Café", slug: "cafe", plans: buildPlans(["Gratis", "$149", "$349", "$799"]) },
  { label: "Bar", slug: "bar", plans: buildPlans(["Gratis", "$199", "$499", "$999"]) },
  { label: "Abarrotes", slug: "retail", plans: buildPlans(["Gratis", "$149", "$349", "$799"]) },
  { label: "Food Truck", slug: "food-truck", plans: buildPlans(["Gratis", "$149", "$349", "$799"]) },
  { label: "General", slug: "general", plans: buildPlans(["Gratis", "$99", "$249", "$599"]) },
];

export default function PricingSection() {
  const [activeGiro, setActiveGiro] = useState(0);
  const currentGiro = giros[activeGiro];

  return (
    <section id="precios" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Planes para cada negocio"
          subtitle="3 meses gratis en cualquier plan. Sin tarjeta requerida."
        />

        {/* Giro tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 px-1 max-w-full">
            {giros.map((giro, i) => (
              <button
                key={giro.slug}
                onClick={() => setActiveGiro(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  i === activeGiro
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {giro.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentGiro.plans.map((plan) => (
            <div
              key={plan.slug}
              className={`relative flex flex-col border rounded-xl p-6 transition-all ${
                plan.popular
                  ? "border-primary-500 shadow-lg scale-[1.02]"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Más popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Gratis" && (
                    <span className="text-sm text-gray-500">/mes</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat.label} className="flex items-start gap-2 text-sm">
                    {feat.included ? (
                      <svg className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={feat.included ? "text-gray-700" : "text-gray-400"}>
                      {feat.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "primary" : "outline"}
                size="md"
                href={`${APP_URL}/register?plan=${plan.slug}&giro=${currentGiro.slug}`}
                className="w-full"
              >
                Empezar con este plan →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
