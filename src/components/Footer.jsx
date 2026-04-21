import { Phone, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/918919348815?text=Hello%20Doctor,%20I%20want%20to%20book%20an%20appointment";

const Footer = () =>
<footer className="bg-foreground text-background py-12">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-display text-xl font-bold">Lucky Clinic System</h3>
          <p className="text-background/60 text-sm mt-1">Premium Healthcare</p>
          <p className="text-background/70 text-sm mt-3 leading-relaxed">
            Trusted healthcare and clinical management.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm text-background/70">
            <a href="#home" className="hover:text-background transition-colors">Home</a>
            <a href="#about" className="hover:text-background transition-colors">About Doctor</a>
            <a href="#services" className="hover:text-background transition-colors">Services</a>
            <a href="#reviews" className="hover:text-background transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-background transition-colors">Contact</a>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-3 text-sm text-background/70">
            <a href="tel:+918919348815" className="flex items-center gap-2 hover:text-background transition-colors">
              <Phone className="h-4 w-4" /> +91 89193 48815
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-background transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Dr Kondapalli Hospital Centre, Ravipadu Road, Narasaraopet, AP – 522601</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 mt-8 pt-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} Lucky Clinic System. All rights reserved.
      </div>
    </div>
  </footer>;


export default Footer;