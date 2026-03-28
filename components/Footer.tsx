const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://restaurant-app-roan-two.vercel.app";

const footerLinks = [
  { label: "Inicio", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Precios", href: "#precios" },
  { label: "Login", href: `${APP_URL}/login` },
  { label: "Registro", href: `${APP_URL}/register` },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-white text-lg">POS Táctil</span>
            </div>
            <p className="text-sm leading-relaxed">
              El punto de venta para tu negocio mexicano.
            </p>
          </div>

          {/* Col 2 — Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Enlaces</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/5215500000000"
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@postactil.app"
                  className="hover:text-white transition-colors"
                >
                  hola@postactil.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span>© 2026 POS Táctil</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
