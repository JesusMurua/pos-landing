"use client";

import { useState } from "react";
import BrioIcon from "./ui/BrioIcon";
import { DEFAULT_REGISTER_QUERY } from "../lib/pricing-definitions";

const navLinks = [
  { label: "Funciones", href: "#features" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a] border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <BrioIcon size={32} />
            <span className="font-bold text-white text-lg tracking-tight">Brío</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#64748b] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`${APP_URL}/login`}
              className="text-[13px] text-[#64748b] hover:text-white transition-colors px-3 py-2"
            >
              Entrar
            </a>
            <a
              href={`${APP_URL}/register?${DEFAULT_REGISTER_QUERY}`}
              className="inline-flex items-center justify-center bg-[#16a34a] hover:bg-[#15803d] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Empezar gratis →
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#cbd5e1] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#0f172a] z-40">
          <div className="flex flex-col px-6 py-8 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg text-[#cbd5e1] hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-[#1e293b]" />
            <a
              href={`${APP_URL}/login`}
              className="text-base text-[#cbd5e1] hover:text-white"
            >
              Entrar
            </a>
            <a
              href={`${APP_URL}/register?${DEFAULT_REGISTER_QUERY}`}
              className="inline-flex items-center justify-center bg-[#16a34a] hover:bg-[#15803d] text-white text-base font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Empezar gratis →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
