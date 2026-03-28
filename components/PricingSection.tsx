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

const f = (label: string, included: boolean) => ({ label, included });
const yes = (label: string) => f(label, true);
const no = (label: string) => f(label, false);

const giros: Giro[] = [
  {
    label: "Restaurante",
    slug: "restaurant",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal, 2 usuarios"), yes("Modo Mostrador básico"), yes("Cobro en efectivo"),
          no("Mesas y mesero"), no("KDS pantalla cocina"), no("Kiosk autoservicio"), no("Impresora / escáner"), no("Promociones"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$199",
        features: [
          yes("Productos ilimitados"), yes("Mesas y modo mesero"), yes("KDS pantalla cocina"), yes("Kiosk autoservicio"),
          yes("Impresora térmica"), yes("Escáner de barras"), yes("Promociones y cupones"), yes("Reportes básicos"), no("CFDI / Facturación"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$499", popular: true,
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Programa de lealtad"),
          yes("Clientes y fiado"), yes("Reportes avanzados"), yes("Comparativo sucursales"), no("API access"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$999",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "Café",
    slug: "cafe",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal, 2 usuarios"), yes("Modo Mostrador básico"), yes("Cobro en efectivo"),
          no("Kiosk autoservicio"), no("Comandas / KDS"), no("Impresora térmica"), no("Promociones"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$149", popular: true,
        features: [
          yes("Productos ilimitados"), yes("Kiosk autoservicio"), yes("Comandas / KDS barra"), yes("Impresora térmica"),
          yes("Promociones y cupones"), yes("Reportes básicos"), yes("Usuarios ilimitados"), no("CFDI / Facturación"), no("Programa de lealtad"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$349",
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Programa de lealtad"),
          yes("Clientes frecuentes"), yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$799",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "Bar",
    slug: "bar",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal, 2 usuarios"), yes("Modo Mostrador básico"),
          no("Mesas y barra"), no("Consumo corrido"), no("Modo mesero"), no("Impresora térmica"), no("Promociones happy hour"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$199",
        features: [
          yes("Productos ilimitados"), yes("Mesas + barra (zonas)"), yes("Consumo corrido"), yes("Modo mesero"),
          yes("Impresora térmica"), yes("Promociones happy hour"), yes("Reportes básicos"), yes("Usuarios ilimitados"), no("CFDI / Facturación"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$499", popular: true,
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Programa de lealtad"),
          yes("Clientes y fiado"), yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$999",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "Abarrotes / Retail",
    slug: "retail",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal, 2 usuarios"), yes("Cobro básico"), yes("Folios de venta"),
          no("Escáner de barras"), no("Impresora térmica"), no("Promociones"), no("Clientes y fiado"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$149", popular: true,
        features: [
          yes("Productos ilimitados"), yes("Escáner de barras"), yes("Impresora térmica"), yes("Folios personalizados"),
          yes("Promociones y descuentos"), yes("Reportes de ventas"), yes("Usuarios ilimitados"), no("Báscula integrada"), no("CFDI / Facturación"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$349",
        features: [
          yes("Todo lo de Básico"), yes("Báscula integrada"), yes("CFDI / Facturación"), yes("Clientes y fiado"),
          yes("Hasta 3 sucursales"), yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$799",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "Food Truck",
    slug: "food-truck",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal, 2 usuarios"), yes("Cobro rápido"), yes("Modo sin mesas"),
          no("Kiosk autoservicio"), no("Impresora térmica"), no("Escáner de barras"), no("Promociones"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$149", popular: true,
        features: [
          yes("Productos ilimitados"), yes("Kiosk autoservicio"), yes("Impresora térmica"), yes("Escáner de barras"),
          yes("Promociones y cupones"), yes("Reportes de ventas"), yes("Usuarios ilimitados"), no("CFDI / Facturación"), no("Multi-sucursal"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$349",
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Programa de lealtad"),
          yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$799",
        features: [
          yes("Todo lo de Pro"), yes("Sucursales ilimitadas"), yes("API access"), yes("Soporte prioritario"),
          yes("Marca personalizada"), yes("Onboarding dedicado"), yes("SLA garantizado"),
        ],
      },
    ],
  },
  {
    label: "General",
    slug: "general",
    plans: [
      {
        name: "Gratis", slug: "free", price: "Gratis",
        features: [
          yes("Hasta 50 productos"), yes("1 sucursal, 2 usuarios"), yes("Cobro básico"), yes("Folios de venta"),
          no("Impresora térmica"), no("Escáner de barras"), no("Promociones"), no("Más usuarios"), no("Reportes"),
        ],
      },
      {
        name: "Básico", slug: "basic", price: "$99", popular: true,
        features: [
          yes("Productos ilimitados"), yes("Impresora térmica"), yes("Escáner de barras"), yes("Folios personalizados"),
          yes("Promociones básicas"), yes("Reportes de ventas"), yes("Usuarios ilimitados"), no("CFDI / Facturación"), no("Multi-sucursal"),
        ],
      },
      {
        name: "Pro", slug: "pro", price: "$249",
        features: [
          yes("Todo lo de Básico"), yes("Hasta 3 sucursales"), yes("CFDI / Facturación"), yes("Clientes y fiado"),
          yes("Programa de lealtad"), yes("Reportes avanzados"), no("API access"), no("Soporte prioritario"),
        ],
      },
      {
        name: "Enterprise", slug: "enterprise", price: "$599",
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
