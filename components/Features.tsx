import SectionHeader from "./ui/SectionHeader";

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
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Todo lo que necesitas para vender más"
          subtitle="Sin complicaciones. Sin internet obligatorio."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-3xl block mb-4">{f.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
