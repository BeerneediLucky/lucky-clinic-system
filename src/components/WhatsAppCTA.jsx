import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/918919348815?text=Hello%20Doctor,%20I%20want%20to%20book%20an%20appointment";

const WhatsAppCTA = () =>
<section className="py-16 bg-primary">
    <div className="container text-center">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      
        <MessageCircle className="h-12 w-12 text-primary-foreground/80 mx-auto mb-4" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
          Skip Waiting. Book Instantly on WhatsApp
        </h2>
        <p className="text-primary-foreground/80 mt-2 max-w-md mx-auto">
          No calls, no queues. Just message us and get your appointment confirmed in minutes.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="mt-6 bg-trust-green hover:bg-trust-green/90 text-trust-green-foreground gap-2 text-base shadow-lg">
            <MessageCircle className="h-5 w-5" /> Chat with Us Now
          </Button>
        </a>
      </motion.div>
    </div>
  </section>;


export default WhatsAppCTA;