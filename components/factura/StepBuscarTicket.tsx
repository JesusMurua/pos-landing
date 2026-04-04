import { useState } from "react";

interface StepBuscarTicketProps {
  onSearch: (orderId: string, totalCents: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function StepBuscarTicket({ onSearch, isLoading, error }: StepBuscarTicketProps) {
  const [orderId, setOrderId] = useState("");
  const [total, setTotal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cents = Math.round(parseFloat(total) * 100);
    if (orderId.trim() && cents > 0) {
      onSearch(orderId.trim(), cents);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Buscar Ticket</h2>
        <p className="text-sm text-gray-500 mt-1">
          Ingresa los datos de tu ticket para generar tu factura
        </p>
      </div>

      <div>
        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1.5">
          Número de Orden
        </label>
        <input
          id="orderId"
          type="text"
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Ej. 3f2a1b4c-..."
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1.5">
          Monto Total (MXN)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
          <input
            id="total"
            type="number"
            required
            min="0.01"
            step="0.01"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-gray-300 pl-8 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !orderId.trim() || !total}
        className="w-full rounded-xl bg-primary-600 text-white font-medium py-2.5 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Buscando...
          </span>
        ) : (
          "Buscar Ticket"
        )}
      </button>
    </form>
  );
}
