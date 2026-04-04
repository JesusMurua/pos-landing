const STEPS = [
  "Buscar Ticket",
  "Detalles",
  "Datos Fiscales",
  "Listo",
];

interface StepIndicatorProps {
  current: number;
}

export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isCompleted = step < current;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isCompleted
                    ? "bg-primary-600 text-white"
                    : isActive
                      ? "bg-primary-600 text-white ring-4 ring-primary-100"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive ? "text-primary-700" : isCompleted ? "text-primary-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>

            {step < STEPS.length && (
              <div
                className={`flex-1 h-0.5 mx-2 sm:mx-3 rounded-full transition-colors ${
                  isCompleted ? "bg-primary-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
