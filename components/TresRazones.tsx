const reasons = [
  {
    num: "01",
    title: "Cualquiera lo aprende solo",
    text: "Si sabes usar un celular, sabes usar Brío. Sin capacitación, sin manual, sin soporte técnico.",
    bg: "#f0fdf4",
    color: "#16a34a",
  },
  {
    num: "02",
    title: "Funciona sin internet",
    text: "Se fue la luz, se fue el WiFi — no importa. Brío sigue operando y se sincroniza cuando vuelve la señal.",
    bg: "#eff6ff",
    color: "#3b82f6",
  },
  {
    num: "03",
    title: "Crece contigo, no te frena",
    text: "Empiezas solo, después contratas a alguien, luego abres otra sucursal. Brío lo soporta todo sin cambiar de sistema.",
    bg: "#f5f3ff",
    color: "#8b5cf6",
  },
];

export default function TresRazones() {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[880px] mx-auto px-6 md:px-10">
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-[26px] md:text-[32px] font-bold text-[#0f172a] leading-[1.15]"
            style={{ letterSpacing: "-0.75px" }}
          >
            Tres razones por las que te va a gustar
          </h2>
          <p className="mt-3 text-[13px] md:text-[14px] text-[#64748b] leading-[1.7]">
            Sin tecnicismos. Sin letra chica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((r) => (
            <div
              key={r.num}
              className="rounded-[14px] p-6"
              style={{ backgroundColor: r.bg }}
            >
              <div
                className="text-[11px] font-semibold tracking-[0.08em] mb-3"
                style={{ color: r.color }}
              >
                {r.num}
              </div>
              <h3
                className="text-[15px] font-bold text-[#0f172a] mb-2 leading-[1.3]"
                style={{ letterSpacing: "-0.3px" }}
              >
                {r.title}
              </h3>
              <p className="text-[13px] text-[#475569] leading-[1.7]">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
