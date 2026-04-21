import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const DIRECTIONS_URL = "https://www.google.com/maps/search/62RQ%2B23+Narasaraopet";

const LocationSection = () =>
<section id="contact" className="py-20 bg-card">
    <div className="container">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-xl mx-auto mb-14">
      
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Find Us</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
          Visit Our Clinic
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Map */}
        <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden shadow-card h-80 md:h-full min-h-[320px]">
        
          <iframe
          title="Lucky Clinic Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.5!2d80.04!3d16.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDE2JzQ4LjAiTiA4MMKwMDInMjQuMCJF!5e0!3m2!1sen!2sin!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" />
        
        </motion.div>

        {/* Info cards */}
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-4">
        
          <div className="p-5 rounded-2xl bg-background border border-border shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Dr Kondapalli Hospital Centre, Ravipadu Road, Hyderabad Road,
                  Narasaraopet, Andhra Pradesh – 522601
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-background border border-border shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-trust-green/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-trust-green" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Timings</h3>
                <p className="text-sm mt-1">
                  <span className="inline-flex items-center gap-1.5 text-trust-green font-medium">
                    <span className="w-2 h-2 rounded-full bg-trust-green animate-pulse" /> Open Now
                  </span>
                  <span className="text-muted-foreground ml-2">· Closes at 3:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-background border border-border shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <a href="tel:+918919348815" className="text-primary text-sm font-medium mt-1 block hover:underline">
                  +91 89193 48815
                </a>
              </div>
            </div>
          </div>

          <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="block">
            <Button size="lg" className="w-full gap-2 mt-2">
              <Navigation className="h-5 w-5" /> Get Directions
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  </section>;


export default LocationSection;