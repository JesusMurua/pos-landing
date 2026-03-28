import Button from "./ui/Button";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://restaurant-app-roan-two.vercel.app";

export default function Hero() {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      {/* Decorative green blob */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-20 blur-3xl pointer-events-none">
        <div className="w-full h-full rounded-full bg-primary-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 rounded-full w-fit border border-primary-200">
              ✓ Gratis 3 meses — sin tarjeta
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 tracking-tight leading-tight">
              Kaja, el sistema que no te complica.
            </h1>

            <p className="text-base md:text-xl text-gray-500 leading-relaxed max-w-lg">
Para negocios que no paran.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" href={`${APP_URL}/register`}>
                Empezar gratis →
              </Button>
              <Button variant="ghost" size="lg" href="#how-it-works">
                Ver cómo funciona
              </Button>
            </div>

            {/* Social proof */}
            <p className="text-sm text-gray-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-500 inline-block" />
              Más de 500 negocios ya usan POS Táctil
            </p>
          </div>

          {/* Right column — Browser mockup */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md transform md:-rotate-2">
              {/* Browser frame */}
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 text-center">
                      postactil.app
                    </div>
                  </div>
                </div>

                {/* POS interface SVG */}
                <div className="p-4">
                  <POSIllustration />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function POSIllustration() {
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
            className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-100 aspect-square"
          >
            <span className="text-xl md:text-2xl">{p.emoji}</span>
            <span className="text-[10px] text-gray-600 mt-1 font-medium">{p.name}</span>
            <span className="text-[10px] text-primary-600 font-bold">{p.price}</span>
          </div>
        ))}
      </div>

      {/* Mini cart */}
      <div className="w-24 bg-gray-50 rounded-lg border border-gray-100 p-2 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-bold text-gray-700 mb-2">Ticket</div>
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-gray-500">
              <span>🌮 x2</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between text-[9px] text-gray-500">
              <span>☕ x1</span>
              <span>$30</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-1 mt-2">
          <div className="flex justify-between text-[10px] font-bold text-gray-800">
            <span>Total</span>
            <span>$80</span>
          </div>
          <div className="mt-1.5 bg-primary-600 text-white text-[9px] text-center py-1 rounded font-medium">
            Cobrar
          </div>
        </div>
      </div>
    </div>
  );
}
