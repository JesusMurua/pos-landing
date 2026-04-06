const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export interface TicketData {
  orderId: number;
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

export interface InvoiceResult {
  invoiceId: number;
  status: string;
  pdfUrl: string;
  xmlUrl: string;
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
    `${API_BASE}/api/publicinvoicing/${encodeURIComponent(orderId)}?totalCents=${totalCents}`,
  );

  if (!res.ok) {
    if (res.status === 404) {
      throw new ApiError("Ticket no encontrado. Verifica el número de orden.", 404);
    }
    if (res.status === 403) {
      throw new ApiError("El monto no coincide con el ticket.", 403);
    }
    if (res.status === 429) {
      throw new ApiError("Demasiadas solicitudes. Espera un momento e intenta de nuevo.", 429);
    }
    throw new ApiError("Error al buscar el ticket. Intenta de nuevo.", res.status);
  }

  const body = await res.json();
  return {
    orderId: body.orderId,
    restaurantName: body.businessName,
    date: body.issuedAt,
    total: body.totalCents / 100,
    items: body.items?.map((item: { name: string; quantity: number; totalCents: number }) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.totalCents / 100,
    })),
  };
}

export async function requestInvoice(
  orderId: number,
  totalCents: number,
  fiscal: FiscalData,
): Promise<InvoiceResult> {
  const res = await fetch(`${API_BASE}/api/publicinvoicing/${encodeURIComponent(orderId)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      totalCents,
      rfc: fiscal.rfc,
      legalName: fiscal.razonSocial,
      zipCode: fiscal.codigoPostal,
      taxRegime: fiscal.regimenFiscal,
      useOfCfdi: fiscal.usoCfdi,
      email: fiscal.email,
    }),
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
    if (res.status === 429) {
      throw new ApiError("Demasiadas solicitudes. Espera un momento e intenta de nuevo.", 429);
    }
    throw new ApiError("Error al solicitar la factura. Intenta de nuevo.", res.status);
  }

  return res.json();
}
