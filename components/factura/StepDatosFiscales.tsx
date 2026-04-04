import { useState } from "react";
import { REGIMEN_FISCAL, USO_CFDI } from "@/lib/sat-catalogs";
import type { FiscalData } from "@/lib/api";

interface StepDatosFiscalesProps {
  initialData: FiscalData;
  onSubmit: (data: FiscalData) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

const RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

export default function StepDatosFiscales({
  initialData,
  onSubmit,
  onBack,
  isLoading,
  error,
}: StepDatosFiscalesProps) {
  const [form, setForm] = useState<FiscalData>(initialData);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FiscalData, string>>>({});

  const update = (field: keyof FiscalData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errors: Partial<Record<keyof FiscalData, string>> = {};

    const rfc = form.rfc.toUpperCase().trim();
    if (!RFC_REGEX.test(rfc)) {
      errors.rfc = "RFC inválido. Debe tener 12 o 13 caracteres alfanuméricos.";
    }
    if (!form.razonSocial.trim()) {
      errors.razonSocial = "La razón social es requerida.";
    }
    if (!/^\d{5}$/.test(form.codigoPostal.trim())) {
      errors.codigoPostal = "El código postal debe tener 5 dígitos.";
    }
    if (!form.regimenFiscal) {
      errors.regimenFiscal = "Selecciona un régimen fiscal.";
    }
    if (!form.usoCfdi) {
      errors.usoCfdi = "Selecciona un uso de CFDI.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Ingresa un correo electrónico válido.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      rfc: form.rfc.toUpperCase().trim(),
      razonSocial: form.razonSocial.trim(),
      codigoPostal: form.codigoPostal.trim(),
      email: form.email.trim(),
    });
  };

  const inputClass = (field: keyof FiscalData) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow ${
      fieldErrors[field] ? "border-red-400 ring-1 ring-red-200" : "border-gray-300"
    }`;

  const selectClass = (field: keyof FiscalData) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow appearance-none ${
      fieldErrors[field] ? "border-red-400 ring-1 ring-red-200" : "border-gray-300"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Datos Fiscales</h2>
        <p className="text-sm text-gray-500 mt-1">Ingresa la información para tu factura</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rfc" className="block text-sm font-medium text-gray-700 mb-1.5">RFC</label>
          <input
            id="rfc"
            type="text"
            required
            maxLength={13}
            value={form.rfc}
            onChange={(e) => update("rfc", e.target.value.toUpperCase())}
            placeholder="XAXX010101000"
            className={inputClass("rfc")}
          />
          {fieldErrors.rfc && <p className="mt-1 text-xs text-red-600">{fieldErrors.rfc}</p>}
        </div>

        <div>
          <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-1.5">Código Postal</label>
          <input
            id="codigoPostal"
            type="text"
            required
            maxLength={5}
            inputMode="numeric"
            value={form.codigoPostal}
            onChange={(e) => update("codigoPostal", e.target.value.replace(/\D/g, ""))}
            placeholder="06600"
            className={inputClass("codigoPostal")}
          />
          {fieldErrors.codigoPostal && <p className="mt-1 text-xs text-red-600">{fieldErrors.codigoPostal}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700 mb-1.5">Razón Social</label>
        <input
          id="razonSocial"
          type="text"
          required
          value={form.razonSocial}
          onChange={(e) => update("razonSocial", e.target.value)}
          placeholder="Nombre o razón social"
          className={inputClass("razonSocial")}
        />
        {fieldErrors.razonSocial && <p className="mt-1 text-xs text-red-600">{fieldErrors.razonSocial}</p>}
      </div>

      <div>
        <label htmlFor="regimenFiscal" className="block text-sm font-medium text-gray-700 mb-1.5">Régimen Fiscal</label>
        <select
          id="regimenFiscal"
          required
          value={form.regimenFiscal}
          onChange={(e) => update("regimenFiscal", e.target.value)}
          className={selectClass("regimenFiscal")}
        >
          <option value="">Selecciona un régimen</option>
          {REGIMEN_FISCAL.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {fieldErrors.regimenFiscal && <p className="mt-1 text-xs text-red-600">{fieldErrors.regimenFiscal}</p>}
      </div>

      <div>
        <label htmlFor="usoCfdi" className="block text-sm font-medium text-gray-700 mb-1.5">Uso del CFDI</label>
        <select
          id="usoCfdi"
          required
          value={form.usoCfdi}
          onChange={(e) => update("usoCfdi", e.target.value)}
          className={selectClass("usoCfdi")}
        >
          <option value="">Selecciona un uso</option>
          {USO_CFDI.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {fieldErrors.usoCfdi && <p className="mt-1 text-xs text-red-600">{fieldErrors.usoCfdi}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="tu@correo.com"
          className={inputClass("email")}
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium py-2.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-colors cursor-pointer"
        >
          Volver
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-xl bg-primary-600 text-white font-medium py-2.5 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isLoading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Solicitando...
            </span>
          ) : (
            "Solicitar Factura"
          )}
        </button>
      </div>
    </form>
  );
}
