import FinoLogo from "./landing/FinoLogo";

interface FooterColProps {
  title: string;
  links: string[];
}

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div>
      <h4 style={{ color: "white", fontWeight: 600, fontSize: 13, marginBottom: 16 }}>{title}</h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {links.map((l) => (
          <li key={l}>
            <a href="#" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contacto" style={{ background: "#0f172a", color: "#94a3b8", marginTop: 0 }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 32px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <FinoLogo />
          <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 16, maxWidth: 280 }}>
            El sistema de punto de venta hecho para que cualquier negocio cobre fácil.
          </p>
        </div>
        <FooterCol title="Producto" links={["Funciones", "Precios", "Para tu giro", "Hardware"]} />
        <FooterCol title="Empresa" links={["Sobre nosotros", "Casos de éxito", "Blog", "Contacto"]} />
        <FooterCol
          title="Soporte"
          links={["WhatsApp", "hola@finomx.app", "Centro de ayuda", "Estado del sistema"]}
        />
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 32px",
          borderTop: "1px solid #1e293b",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span>© 2026 Fino · Todos los derechos reservados</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>
            Términos
          </a>
          <a href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
