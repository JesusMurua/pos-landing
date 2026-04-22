import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";
import { DEFAULT_REGISTER_QUERY } from "../lib/pricing-definitions";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

const steps = [
  {
    number: "1",
    title: "Crea tu cuenta gratis",
    description: "Solo necesitas tu correo. Sin tarjeta de crédito.",
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Configura tu negocio",
    description: "Dinos qué tipo de negocio tienes y listo en 5 minutos.",
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Empieza a cobrar",
    description: "Agrega productos y cobra desde cualquier dispositivo.",
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Empieza en menos de 10 minutos" />

        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Arrow connectors (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[33%] w-[34%] h-0.5">
            <div className="w-full border-t-2 border-dashed border-primary-300" />
          </div>
          <div className="hidden md:block absolute top-12 left-[66%] w-[34%] h-0.5">
            <div className="w-full border-t-2 border-dashed border-primary-300" />
          </div>

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              {/* Number badge */}
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm mb-6 relative z-10">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-4">{step.icon}</div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="primary" size="lg" href={`${APP_URL}/register?${DEFAULT_REGISTER_QUERY}`}>
            Crear mi cuenta gratis →
          </Button>
        </div>
      </div>
    </section>
  );
}
