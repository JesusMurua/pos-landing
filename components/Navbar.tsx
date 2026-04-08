"use client";

import { useState, useEffect } from "react";
import Button from "./ui/Button";

const navLinks = [
  { label: "Funciones", href: "#features" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-200 ${
        scrolled ? "shadow-sm border-gray-200" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">Kaja</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" href={`${APP_URL}/login`}>
              Iniciar sesión
            </Button>
            <Button variant="primary" size="sm" href={`${APP_URL}/register?plan=free&giro=general&country=MX`}>
              Empezar gratis →
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
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
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40">
          <div className="flex flex-col px-6 py-8 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg text-gray-700 hover:text-gray-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-gray-200" />
            <Button variant="ghost" size="lg" href={`${APP_URL}/login`}>
              Iniciar sesión
            </Button>
            <Button variant="primary" size="lg" href={`${APP_URL}/register?plan=free&giro=general&country=MX`}>
              Empezar gratis →
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
