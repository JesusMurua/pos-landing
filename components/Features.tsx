const features = [
  {
    icon: "📶",
    title: "Sin internet",
    description: "Funciona offline. Sincroniza cuando hay conexión.",
  },
  {
    icon: "🖨️",
    title: "Hardware",
    description: "Compatible con impresoras térmicas, escáner de barras y báscula.",
  },
  {
    icon: "🎯",
    title: "Promociones",
    description: "Crea descuentos, 2x1, bundles y cupones automáticos.",
  },
  {
    icon: "📊",
    title: "Reportes",
    description: "Ve tus ventas en tiempo real. Por producto, por hora, por sucursal.",
  },
  {
    icon: "🏪",
    title: "Multi-sucursal",
    description: "Administra varias ubicaciones desde un solo lugar.",
  },
  {
    icon: "📱",
    title: "Instálalo como app",
    description: "Funciona en tablet, celular o computadora. Sin descargas.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 md:py-14 bg-white">
      <div className="max-w-[880px] mx-auto px-6 md:px-10">
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-[26px] md:text-[32px] font-bold text-[#0f172a] leading-[1.15]"
            style={{ letterSpacing: "-0.75px" }}
          >
            Todo lo que necesitas para vender más
          </h2>
          <p className="mt-3 text-[13px] md:text-[14px] text-[#64748b] leading-[1.7]">
            Sin complicaciones. Sin internet obligatorio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-[14px] p-5 transition-all duration-200 hover:border-primary-500 hover:-translate-y-0.5"
              style={{ border: "0.5px solid #e5e7eb" }}
            >
              <span className="text-[24px] block mb-3 leading-none">{f.icon}</span>
              <h3 className="text-[13px] font-semibold text-[#0f172a] mb-1.5 leading-tight">
                {f.title}
              </h3>
              <p className="text-[11px] text-[#64748b]" style={{ lineHeight: 1.65 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
