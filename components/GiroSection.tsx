"use client";

import { useState } from "react";
import BrioMascot, { type GiroSlug } from "./ui/BrioMascot";

interface GiroOption {
  slug: GiroSlug;
  emoji: string;
  name: string;
  short: string;
  activeLabel: string;
  longDescription: string;
  accent: string;
  softBg: string;
}

const GIROS: GiroOption[] = [
  {
    slug: "restaurant",
    emoji: "🍽️",
    name: "Restaurantes y Bares",
    short: "Mesas, comandas y cocina",
    activeLabel: "Modo restaurante activado",
    longDescription:
      "La pantalla se convierte en el salón. Abres mesas, tomas la orden y la comanda llega a la cocina al instante. Al final, cobras sin buscar nada.",
    accent: "#ef4444",
    softBg: "#fef2f2",
  },
  {
    slug: "cafe",
    emoji: "☕",
    name: "Comida Rápida y Cafés",
    short: "Cobro rápido al mostrador, con o sin cocina",
    activeLabel: "Modo mostrador activado",
    longDescription:
      "Una rejilla grande con tus productos favoritos al frente. Tocas, cobras, imprimes. Sin pasos de más — pensado para filas que avanzan rápido.",
    accent: "#f59e0b",
    softBg: "#fffbeb",
  },
  {
    slug: "retail",
    emoji: "🏪",
    name: "Tiendas y Comercios",
    short: "Vende cualquier producto, rápido y sin errores",
    activeLabel: "Modo tienda activado",
    longDescription:
      "Conectas el escáner y ya. Cada producto aparece con su precio, el total se calcula solo y el ticket sale limpio. Ideal si manejas muchos artículos.",
    accent: "#3b82f6",
    softBg: "#eff6ff",
  },
  {
    slug: "general",
    emoji: "✂️",
    name: "Servicios Especializados",
    short: "Cobras por lo que haces, al precio que tú decides",
    activeLabel: "Modo servicios activado",
    longDescription:
      "Cobras por servicio, por hora o por lo que quieras. Escribes el concepto, pones el precio y listo. Perfecto cuando cada venta es diferente.",
    accent: "#8b5cf6",
    softBg: "#f5f3ff",
  },
];

export default function GiroSection() {
  const [active, setActive] = useState<GiroSlug>("restaurant");
  const current = GIROS.find((g) => g.slug === active)!;

  return (
    <section className="bg-[#f8fafc] py-12 md:py-14">
      <div className="max-w-[880px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span
            className="inline-block text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
          >
            Se configura solo
          </span>
          <h2
            className="text-[26px] md:text-[32px] font-bold text-[#0f172a] leading-[1.15]"
            style={{ letterSpacing: "-0.75px" }}
          >
            Dinos qué tipo de negocio tienes.
          </h2>
          <p className="mt-3 text-[13px] md:text-[14px] text-[#64748b] leading-[1.7] max-w-[560px] mx-auto">
            Brío ajusta la interfaz para que cobres de la manera más natural. Tú no configuras nada.
          </p>
        </div>

        {/* Mobile: mascot first */}
        <div className="md:hidden flex flex-col items-center mb-6">
          <BrioMascot giro={active} size={88} />
          <div
            className="mt-3 text-[11px] font-semibold uppercase tracking-[0.06em]"
            style={{ color: current.accent }}
          >
            {current.activeLabel}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: giro buttons */}
          <div className="order-2 md:order-1 grid grid-cols-2 md:grid-cols-1 gap-3">
            {GIROS.map((g) => {
              const isActive = g.slug === active;
              return (
                <button
                  key={g.slug}
                  onClick={() => setActive(g.slug)}
                  className="text-left rounded-[14px] border p-4 md:p-4 transition-all cursor-pointer"
                  style={{
                    backgroundColor: isActive ? g.softBg : "#ffffff",
                    borderColor: isActive ? g.accent : "#e5e7eb",
                    borderWidth: isActive ? "1.5px" : "1px",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[18px] md:text-[18px] leading-none mt-0.5">{g.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-[#0f172a] leading-tight">
                        {g.name}
                      </div>
                      <div className="text-[11px] text-[#64748b] mt-1 leading-[1.5]">
                        {g.short}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: mascot + description (desktop) */}
          <div className="order-1 md:order-2 hidden md:flex flex-col items-center">
            <BrioMascot giro={active} size={120} />
            <div
              className="mt-3 text-[11px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: current.accent }}
            >
              {current.activeLabel}
            </div>
            <div
              className="mt-5 w-full rounded-[14px] border p-5 bg-white"
              style={{ borderColor: "#e5e7eb" }}
            >
              <p className="text-[13px] text-[#475569] leading-[1.7]">
                {current.longDescription}
              </p>
            </div>
          </div>

          {/* Mobile description card */}
          <div className="md:hidden order-3 rounded-[14px] border p-5 bg-white" style={{ borderColor: "#e5e7eb" }}>
            <p className="text-[13px] text-[#475569] leading-[1.7]">
              {current.longDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
