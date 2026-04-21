import { useState, useEffect } from "react";
import { Phone, Menu, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/918919348815?text=Hello%20Doctor,%20I%20want%20to%20book%20an%20appointment";

const navLinks = [
{ label: "Home", href: "#home" },
{ label: "About", href: "#about" },
{ label: "Services", href: "#services" },
{ label: "Reviews", href: "#reviews" },
{ label: "Gallery", href: "#gallery" },
{ label: "Contact", href: "#contact" }];


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-card/95 backdrop-blur-md shadow-card" : "bg-transparent"}`
      }>
      
      <div className="container flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-2 leading-tight">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-foreground">
              Lucky Clinic System
            </span>
            <span className="text-xs text-muted-foreground">Premium Healthcare</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            
              {l.label}
            </a>
          )}
          <a href="tel:+918919348815">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Phone className="h-3.5 w-3.5" /> Call Now
            </Button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-trust-green hover:bg-trust-green/90 text-trust-green-foreground gap-1.5">
              Book on WhatsApp
            </Button>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu">
          
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen &&
      <nav className="md:hidden bg-card border-t border-border px-6 pb-4 pt-2 flex flex-col gap-3">
          {navLinks.map((l) =>
        <a
          key={l.href}
          href={l.href}
          className="text-sm font-medium text-muted-foreground py-1"
          onClick={() => setMobileOpen(false)}>
          
              {l.label}
            </a>
        )}
          <div className="flex gap-2 pt-2">
            <a href="tel:+918919348815" className="flex-1">
              <Button size="sm" variant="outline" className="w-full gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Call
              </Button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full bg-trust-green hover:bg-trust-green/90 text-trust-green-foreground">
                WhatsApp
              </Button>
            </a>
          </div>
        </nav>
      }
    </header>);

};

export default Header;