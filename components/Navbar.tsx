import Link from "next/link";
import FinoLogo from "./landing/FinoLogo";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

const navLinks = [
  { label: "Funciones", href: "#features" },
  { label: "Giros", href: "#giros" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <FinoLogo />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                color: "#94a3b8",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href={`${APP_URL}/login`}
            style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", padding: "8px 12px" }}
          >
            Entrar
          </a>
          <a
            href={`${APP_URL}/register`}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "white",
              background: "#16a34a",
              padding: "8px 16px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Empezar gratis →
          </a>
        </div>
      </div>
    </nav>
  );
}
