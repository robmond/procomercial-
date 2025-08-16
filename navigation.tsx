import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Building2, Menu } from "lucide-react";
import logoImage from "@assets/logo-c98a1531_1755308410577.png";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up or at the top
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/properties", label: "Propiedades" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/#calculadora", label: "Calculadora" },
  ];

  const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => {
    const isActive = location === href || (href !== "/" && location.startsWith(href));
    
    return (
      <Link href={href}>
        <a 
          className={`transition-colors font-medium ${
            isActive ? "text-gray-800 font-semibold" : "text-gray-700 hover:text-gray-900 hover:font-semibold"
          }`}
          onClick={onClick}
          data-testid={`nav-link-${label.toLowerCase()}`}
        >
          {label}
        </a>
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo a la izquierda */}
          <Link href="/">
            <a className="flex items-center space-x-2" data-testid="nav-logo">
              <img 
                src={logoImage} 
                alt="ProComercial Logo" 
                className="h-12 w-auto"
              />
            </a>
          </Link>

          {/* Desktop Navigation centrada */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white backdrop-blur-md border-gray-200">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <div key={link.href} className="text-gray-800">
                    <Link href={link.href}>
                      <a 
                        className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                        data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
