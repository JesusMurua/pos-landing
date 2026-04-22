import { DEFAULT_REGISTER_QUERY } from "../lib/pricing-definitions";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export default function Hero() {
  return (
    <section className="relative bg-[#0f172a] overflow-hidden">
      {/* Decorative green blob */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.18] blur-3xl pointer-events-none">
        <div className="w-full h-full rounded-full bg-[#4ade80]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-14 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.04em] uppercase px-3 py-1.5 rounded-full w-fit border"
              style={{
                backgroundColor: "rgba(22,163,74,0.12)",
                borderColor: "rgba(22,163,74,0.25)",
                color: "#86efac",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block animate-pulse" />
              Sin tarjeta de crédito · 14 días gratis
            </span>

            <h1
              className="text-[26px] md:text-[34px] lg:text-[38px] font-bold text-white leading-[1.15]"
              style={{ letterSpacing: "-0.75px" }}
            >
              La caja que <span className="text-[#4ade80]">cualquiera</span> puede usar.
            </h1>

            <p className="text-[14px] md:text-[15px] text-[#94a3b8] leading-[1.7] max-w-lg">
              Cobra, controla tu inventario y ve tus ventas. Funciona aunque se vaya el internet.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <a
                href={`${APP_URL}/register?${DEFAULT_REGISTER_QUERY}`}
                className="inline-flex items-center justify-center bg-[#16a34a] hover:bg-[#15803d] text-white text-[14px] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Empezar gratis →
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center border text-[14px] font-semibold px-6 py-3 rounded-lg transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "#cbd5e1",
                }}
              >
                Ver cómo funciona
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 md:gap-8 pt-6 mt-2 border-t border-[#1e293b] text-[12px] text-[#94a3b8]">
              <div>
                <div className="text-white font-bold text-[15px]">500+</div>
                <div>negocios activos</div>
              </div>
              <div>
                <div className="text-white font-bold text-[15px]">4</div>
                <div>tipos de negocio</div>
              </div>
              <div>
                <div className="text-white font-bold text-[15px]">100%</div>
                <div>offline-ready</div>
              </div>
            </div>
          </div>

          {/* Right column — Browser mockup */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md transform md:-rotate-2">
              <div
                className="rounded-xl overflow-hidden border shadow-2xl"
                style={{
                  backgroundColor: "#1e293b",
                  borderColor: "#334155",
                }}
              >
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "#334155" }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div
                      className="rounded-md px-3 py-1 text-[11px] text-[#64748b] text-center border"
                      style={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                    >
                      briopos.app
                    </div>
                  </div>
                </div>

                {/* Brío interface */}
                <div className="p-4">
                  <BrioIllustration />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrioIllustration() {
  const products = [
    { name: "Taco", emoji: "🌮", price: "$25" },
    { name: "Agua", emoji: "💧", price: "$18" },
    { name: "Café", emoji: "☕", price: "$30" },
    { name: "Torta", emoji: "🥪", price: "$45" },
    { name: "Jugo", emoji: "🧃", price: "$22" },
    { name: "Postre", emoji: "🍰", price: "$35" },
  ];

  return (
    <div className="flex gap-3">
      {/* Product grid */}
      <div className="flex-1 grid grid-cols-3 gap-2">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col items-center justify-center rounded-lg p-2 aspect-square border"
            style={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
          >
            <span className="text-xl md:text-2xl">{p.emoji}</span>
            <span className="text-[10px] text-[#cbd5e1] mt-1 font-medium">{p.name}</span>
            <span className="text-[10px] text-[#4ade80] font-bold">{p.price}</span>
          </div>
        ))}
      </div>

      {/* Mini cart */}
      <div
        className="w-24 rounded-lg p-2 flex flex-col justify-between border"
        style={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
      >
        <div>
          <div className="text-[10px] font-bold text-white mb-2">Ticket</div>
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-[#94a3b8]">
              <span>🌮 x2</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between text-[9px] text-[#94a3b8]">
              <span>☕ x1</span>
              <span>$30</span>
            </div>
          </div>
        </div>
        <div className="border-t pt-1 mt-2" style={{ borderColor: "#334155" }}>
          <div className="flex justify-between text-[10px] font-bold text-white">
            <span>Total</span>
            <span>$80</span>
          </div>
          <div className="mt-1.5 bg-[#16a34a] text-white text-[9px] text-center py-1 rounded font-semibold">
            Cobrar
          </div>
        </div>
      </div>
    </div>
  );
}
