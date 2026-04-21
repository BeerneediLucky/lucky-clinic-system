import { motion } from "framer-motion";
import { MessageCircle, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/918919348815?text=Hello%20Doctor,%20I%20want%20to%20book%20an%20appointment";
const DIRECTIONS_URL = "https://www.google.com/maps/search/62RQ%2B23+Narasaraopet";

const HeroSection = () =>
<section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
    {/* Decorative blobs */}
    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/40 blur-3xl" />

    <div className="container relative z-10 py-28 md:py-36 grid md:grid-cols-2 gap-8 items-center">
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-2xl">
      
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center gap-1 rounded-full bg-trust-green/10 text-trust-green px-3 py-1 text-xs font-semibold">
            <Clock className="h-3 w-3" /> Open Now · Closes 3 PM
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
            <Star className="h-3 w-3 fill-current" /> 4.6 Rating · 52 Reviews
          </span>
          <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold">
            Women-owned · LGBTQ+ Friendly
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Lucky Clinic System
          <span className="block text-xl md:text-2xl font-medium text-muted-foreground mt-1">Premium Healthcare</span>
        </h1>

        <p className="mt-4 text-xl md:text-2xl font-display text-gradient-primary font-semibold">
          Healthy Skin, Confident You
        </p>
        <p className="mt-2 text-muted-foreground text-base md:text-lg max-w-lg">
          Trusted healthcare and clinic management. Expert treatment for your medical needs.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-trust-green hover:bg-trust-green/90 text-trust-green-foreground gap-2 text-base shadow-lg">
              <MessageCircle className="h-5 w-5" /> Book on WhatsApp
            </Button>
          </a>
          <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2 text-base">
              <MapPin className="h-5 w-5" /> Get Directions
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Right side animated image */}
      <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative hidden md:block">
      
        <motion.div
        animate={{ y: [-15, 10, -15] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
        
          <img
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80"
          alt="Dermatology and Skincare"
          className="rounded-3xl shadow-2xl border-4 border-white/40 w-full max-w-[420px] mx-auto object-cover h-[520px]" />
        
          
          {/* Decorative floating element */}
          <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute -bottom-8 -left-4 bg-white p-4 rounded-full shadow-xl text-primary">
          
            <Star className="h-8 w-8 fill-current" />
          </motion.div>
        </motion.div>
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/20 rounded-full blur-[80px] -z-20 transform scale-105" />
      </motion.div>
    </div>
  </section>;


export default HeroSection;