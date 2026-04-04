interface StepExitoProps {
  email: string;
  onReset: () => void;
}

export default function StepExito({ email, onReset }: StepExitoProps) {
  return (
    <div className="text-center py-4">
      <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">Solicitud Enviada</h2>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        Tu factura será enviada a{" "}
        <span className="font-medium text-gray-900">{email}</span>{" "}
        en los próximos minutos.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-primary-600 text-white font-medium px-6 py-2.5 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors cursor-pointer"
        >
          Facturar otro ticket
        </button>
        <a
          href="/"
          className="rounded-xl border border-gray-300 bg-white text-gray-700 font-medium px-6 py-2.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors inline-flex items-center justify-center"
        >
          Ir al inicio
        </a>
      </div>
    </div>
  );
}
