import { Building2 } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/logo-c98a1531_1755308410577.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { href: "/properties", label: "Propiedades" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/#calculadora", label: "Calculadora" },
      { href: "/blog", label: "Blog" },
    ],
    support: [
      { href: "/help", label: "Centro de Ayuda" },
      { href: "/terms", label: "Términos y Condiciones" },
      { href: "/privacy", label: "Política de Privacidad" },
      { href: "/contact", label: "Contacto" },
      { href: "/faq", label: "FAQ" },
    ],
    social: [
      { href: "#", icon: "fab fa-facebook", label: "Facebook", color: "text-electric-blue" },
      { href: "#", icon: "fab fa-instagram", label: "Instagram", color: "text-electric-blue" },
      { href: "#", icon: "fab fa-linkedin", label: "LinkedIn", color: "text-electric-blue" },
      { href: "#", icon: "fab fa-youtube", label: "YouTube", color: "text-electric-blue" },
    ]
  };

  return (
    <footer className="relative bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <a className="flex items-center space-x-2 mb-6" data-testid="footer-logo">
                <img 
                  src={logoImage} 
                  alt="ProComercial Logo" 
                  className="h-12 w-auto"
                />
              </a>
            </Link>
            
            <p className="text-gray-600 text-sm mb-6">
              La plataforma líder para inversiones en propiedades comerciales en Chile.
            </p>
            
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all"
                  aria-label={social.label}
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                >
                  <i className={`${social.icon} text-blue-600`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Soporte</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    data-testid={`support-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Contacto</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-blue-600 w-4"></i>
                <span data-testid="contact-email">contacto@procomercial.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-blue-600 w-4"></i>
                <span data-testid="contact-phone">+56 2 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-blue-600 w-4"></i>
                <span data-testid="contact-location">Santiago, Chile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600 text-sm" data-testid="copyright">
            © {currentYear} ProComercial. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
