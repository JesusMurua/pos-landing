"use client";

import { useState } from "react";
import StepIndicator from "./StepIndicator";
import StepBuscarTicket from "./StepBuscarTicket";
import StepDetallesCompra from "./StepDetallesCompra";
import StepDatosFiscales from "./StepDatosFiscales";
import StepExito from "./StepExito";
import { lookupTicket, requestInvoice, ApiError } from "@/lib/api";
import type { TicketData, FiscalData, InvoiceResult } from "@/lib/api";

const INITIAL_FISCAL: FiscalData = {
  rfc: "",
  razonSocial: "",
  codigoPostal: "",
  regimenFiscal: "",
  usoCfdi: "",
  email: "",
};

export default function FacturaWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [totalCents, setTotalCents] = useState(0);
  const [fiscal, setFiscal] = useState<FiscalData>(INITIAL_FISCAL);
  const [invoiceResult, setInvoiceResult] = useState<InvoiceResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (orderId: string, cents: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await lookupTicket(orderId, cents);
      setTicket(data);
      setTotalCents(cents);
      setStep(2);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Error inesperado. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvoiceRequest = async (data: FiscalData) => {
    if (!ticket) return;
    setIsLoading(true);
    setError(null);
    setFiscal(data);
    try {
      const result = await requestInvoice(ticket.orderId, totalCents, data);
      setInvoiceResult(result);
      setStep(4);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Error inesperado. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setTicket(null);
    setTotalCents(0);
    setFiscal(INITIAL_FISCAL);
    setInvoiceResult(null);
    setError(null);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-lg">
        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {step === 1 && (
            <StepBuscarTicket
              onSearch={handleSearch}
              isLoading={isLoading}
              error={error}
            />
          )}
          {step === 2 && ticket && (
            <StepDetallesCompra
              ticket={ticket}
              onContinue={() => { setError(null); setStep(3); }}
              onBack={() => { setError(null); setStep(1); }}
            />
          )}
          {step === 3 && (
            <StepDatosFiscales
              initialData={fiscal}
              onSubmit={handleInvoiceRequest}
              onBack={() => { setError(null); setStep(2); }}
              isLoading={isLoading}
              error={error}
            />
          )}
          {step === 4 && (
            <StepExito
              email={fiscal.email}
              pdfUrl={invoiceResult?.pdfUrl}
              xmlUrl={invoiceResult?.xmlUrl}
              onReset={handleReset}
            />
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Servicio de facturación electrónica proporcionado por FINO
        </p>
      </div>
    </div>
  );
}
