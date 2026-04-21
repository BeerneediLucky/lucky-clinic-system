import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/918919348815?text=Hello%20Doctor,%20I%20want%20to%20book%20an%20appointment";

const FloatingWhatsApp = () =>
<a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Book appointment on WhatsApp"
  className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-trust-green text-trust-green-foreground shadow-lg hover:scale-110 transition-transform animate-float">
  
    <MessageCircle className="h-7 w-7" />
  </a>;


export default FloatingWhatsApp;