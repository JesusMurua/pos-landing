const API_BASE = process.env.NEXT_PUBLIC_POS_API_URL || "";

export interface TicketData {
  orderId: string;
  restaurantName: string;
  date: string;
  total: number;
  items?: { name: string; quantity: number; price: number }[];
}

export interface FiscalData {
  rfc: string;
  razonSocial: string;
  codigoPostal: string;
  regimenFiscal: string;
  usoCfdi: string;
  email: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function lookupTicket(
  orderId: string,
  totalCents: number,
): Promise<TicketData> {
  const res = await fetch(
    `${API_BASE}/api/public/invoicing/${encodeURIComponent(orderId)}?totalCents=${totalCents}`,
  );

  if (!res.ok) {
    if (res.status === 404) {
      throw new ApiError("Ticket no encontrado. Verifica el número de orden.", 404);
    }
    if (res.status === 403) {
      throw new ApiError("El monto no coincide con el ticket.", 403);
    }
    throw new ApiError("Error al buscar el ticket. Intenta de nuevo.", res.status);
  }

  return res.json();
}

export async function requestInvoice(
  orderId: string,
  fiscal: FiscalData,
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/public/invoicing/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, ...fiscal }),
  });

  if (!res.ok) {
    if (res.status === 409) {
      throw new ApiError("Este ticket ya fue facturado.", 409);
    }
    if (res.status === 422) {
      const body = await res.json().catch(() => null);
      throw new ApiError(
        body?.message || "Datos fiscales inválidos. Revisa la información.",
        422,
      );
    }
    throw new ApiError("Error al solicitar la factura. Intenta de nuevo.", res.status);
  }
}
