"use client";

import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";
import BrioMascot, { type GiroSlug } from "./ui/BrioMascot";
import type { BillingCycle } from "../lib/stripe-prices";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

interface Plan {
  name: string;
  slug: string;
  price: string;
  annualPrice?: string;
  popular?: boolean;
  features: { label: string; included: boolean }[];
}

interface Giro {
  label: string;
  subtitle: string;
  slug: string;
  plans: Plan[];
}

const f = (label: string, included: boolean) => ({ label, included });
const yes = (label: string) => f(label, true);
const no = (label: string) => f(label, false);

function formatMonthlyFromAnnual(annualPrice: string): string {
  const num = parseInt(annualPrice.replace(/[$,]/g, ""), 10);
  return `$${Math.ceil(num / 12)}`;
}

const giros: Giro[] = [
  {
    label: "Restaurantes y Bares",
    subtitle: "Restaurantes, fondas, bares, cantinas",
    slug: "restaurant",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal"), yes("Hasta 3 Usuarios"), yes("Modo Mostrador básico"), yes("Cobro en efectivo"),
          yes("Impresión de Tickets (Térmica) incluida"),
          no("Mesas y mesero"), no("KDS pantalla cocina"), no("Kiosk autoservicio"), no("Promociones"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$199", annualPrice: "$1,990",
        features: [
          yes("Productos ilimitados"), yes("Mesas y modo mesero"), yes("KDS pantalla cocina"), yes("Kiosk autoservicio"),
          yes("Impresora térmica"), yes("Escáner de barras"), yes("Promociones y cupones"), yes("Reportes básicos"), no("CFDI / Facturación"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$499", annualPrice: "$4,990", popular: true,
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Programa de lealtad"),
          yes("Clientes y fiado"), yes("Reportes avanzados"), yes("Comparativo sucursales"), no("API access"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$999", annualPrice: "$9,990",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "Comida Rápida y Cafés",
    subtitle: "Cafeterías, taquerías, food trucks, juguerías",
    slug: "cafe",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal"), yes("Hasta 3 Usuarios"), yes("Modo Mostrador básico"), yes("Cobro en efectivo"),
          yes("Impresión de Tickets (Térmica) incluida"),
          no("Kiosk autoservicio"), no("Comandas / KDS"), no("Promociones"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$149", annualPrice: "$1,490", popular: true,
        features: [
          yes("Productos ilimitados"), yes("Kiosk autoservicio"), yes("Comandas / KDS barra"), yes("Impresora térmica"),
          yes("Promociones y cupones"), yes("Reportes básicos"), yes("Usuarios ilimitados"), no("CFDI / Facturación"), no("Programa de lealtad"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$349", annualPrice: "$3,490",
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Programa de lealtad"),
          yes("Clientes frecuentes"), yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$799", annualPrice: "$7,990",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "Tiendas y Comercios",
    subtitle: "Abarrotes, farmacias, ferreterías, papelerías",
    slug: "retail",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal"), yes("Hasta 3 Usuarios"), yes("Cobro básico"), yes("Folios de venta"),
          yes("Impresión de Tickets (Térmica) incluida"),
          no("Escáner de barras"), no("Promociones"), no("Clientes y fiado"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$149", annualPrice: "$1,490", popular: true,
        features: [
          yes("Productos ilimitados"), yes("Escáner de barras"), yes("Impresora térmica"), yes("Folios personalizados"),
          yes("Promociones y descuentos"), yes("Reportes de ventas"), yes("Usuarios ilimitados"), no("Báscula integrada"), no("CFDI / Facturación"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$349", annualPrice: "$3,490",
        features: [
          yes("Todo lo de Básico"), yes("Báscula integrada"), yes("CFDI / Facturación"), yes("Clientes y fiado"),
          yes("Hasta 3 sucursales"), yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$799", annualPrice: "$7,990",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "Servicios Especializados",
    subtitle: "Salones, estéticas, servicios, cualquier negocio",
    slug: "general",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal"), yes("Hasta 3 Usuarios"), yes("Cobro básico"), yes("Folios de venta"),
          yes("Impresión de Tickets (Térmica) incluida"),
          no("Escáner de barras"), no("Promociones"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$99", annualPrice: "$990", popular: true,
        features: [
          yes("Productos ilimitados"), yes("Impresora térmica"), yes("Escáner de barras"), yes("Folios personalizados"),
          yes("Promociones básicas"), yes("Reportes de ventas"), yes("Usuarios ilimitados"), no("CFDI / Facturación"), no("Multi-sucursal"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$249", annualPrice: "$2,490",
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Clientes y fiado"),
          yes("Programa de lealtad"), yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$599", annualPrice: "$5,990",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
];

export default function PricingSection() {
  const [activeGiro, setActiveGiro] = useState(0);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const currentGiro = giros[activeGiro];

  return (
    <section id="precios" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Planes para cada negocio"
          subtitle="Empieza gratis. Sube de plan cuando crezcas."
        />

        {/* Mascota según giro activo */}
        <div className="flex justify-center mb-6 transition-all duration-300">
          <BrioMascot giro={currentGiro.slug as GiroSlug} size={72} />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentGiro.plans.map((plan) => (
            <div
              key={plan.slug}
              className={`relative flex flex-col rounded-[14px] p-6 transition-all ${
                plan.popular
                  ? "border-2 border-primary-500 shadow-lg scale-[1.02]"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-semibold tracking-[0.08em] px-3 py-1 rounded-full"
                >
                  MÁS POPULAR
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a]" style={{ letterSpacing: "-0.3px" }}>{plan.name}</h3>
                <div className="mt-2">
                  {plan.price === "Gratis" ? (
                    <span className="text-3xl font-bold text-gray-900">Gratis</span>
                  ) : billingCycle === "annual" && plan.annualPrice ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900">
                        {formatMonthlyFromAnnual(plan.annualPrice)}
                      </span>
                      <span className="text-sm text-gray-500">/mes</span>
                      <span className="ml-2 inline-block text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                        Anual
                      </span>
                      <p className="text-xs text-primary-600 mt-1">Ahorras 2 meses</p>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-sm text-gray-500">/mes</span>
                    </>
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
                href={`${APP_URL}/register?plan=${plan.slug}&giro=${currentGiro.slug}&country=MX`}
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
