import type { TicketData } from "@/lib/api";

interface StepDetallesCompraProps {
  ticket: TicketData;
  onContinue: () => void;
  onBack: () => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function StepDetallesCompra({ ticket, onContinue, onBack }: StepDetallesCompraProps) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Detalles de Compra</h2>
        <p className="text-sm text-gray-500 mt-1">Verifica que los datos sean correctos</p>
      </div>

      <div className="rounded-xl bg-gray-50 border border-gray-200 divide-y divide-gray-200">
        <div className="px-4 py-3 flex justify-between">
          <span className="text-sm text-gray-500">Restaurante</span>
          <span className="text-sm font-medium text-gray-900">{ticket.restaurantName}</span>
        </div>
        <div className="px-4 py-3 flex justify-between">
          <span className="text-sm text-gray-500">Fecha</span>
          <span className="text-sm font-medium text-gray-900">{formatDate(ticket.date)}</span>
        </div>
        <div className="px-4 py-3 flex justify-between">
          <span className="text-sm text-gray-500">Orden</span>
          <span className="text-sm font-medium text-gray-900 font-mono">{ticket.orderId}</span>
        </div>
        <div className="px-4 py-3 flex justify-between">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-base font-semibold text-gray-900">{formatCurrency(ticket.total)}</span>
        </div>
      </div>

      {ticket.items && ticket.items.length > 0 && (
        <div className="rounded-xl bg-gray-50 border border-gray-200">
          <div className="px-4 py-2.5 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Productos</span>
          </div>
          <div className="divide-y divide-gray-100">
            {ticket.items.map((item, i) => (
              <div key={i} className="px-4 py-2.5 flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-gray-900 font-medium">{formatCurrency(item.price)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium py-2.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors cursor-pointer"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex-1 rounded-xl bg-primary-600 text-white font-medium py-2.5 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
