import { motion } from "framer-motion";
import { Droplets, Shield, Sun, Scissors, Sparkles } from "lucide-react";

const services = [
  { icon: Droplets, title: "Acne & Pimples Treatment", desc: "Advanced treatments for acne, pimples, and breakouts with lasting results." },
  { icon: Shield, title: "Skin Allergy Treatment", desc: "Expert diagnosis and relief for rashes, eczema, and allergic reactions." },
  { icon: Sun, title: "Pigmentation & Spots", desc: "Effective solutions for dark spots, melasma, and uneven skin tone." },
  { icon: Scissors, title: "Hair Fall Treatment", desc: "Comprehensive hair fall analysis and treatment for healthier, stronger hair." },
  { icon: Sparkles, title: "Physiotherapy", desc: "Professional rehabilitation for sports injuries, paralysis, and post-op recovery." },
  { icon: Droplets, title: "Arthritis Care", desc: "Specialized joint care and management plans for geriatric and chronic patients." }
];


const ServicesSection = () =>
<section id="services" className="py-20">
    <div className="container">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-xl mx-auto mb-14">
      
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Our Services</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
          Expert Dermatology Care
        </h2>
        <p className="text-muted-foreground mt-3">
          Comprehensive skin and hair treatments tailored to your unique needs.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) =>
      <motion.div
        key={s.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300">
        
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.desc}</p>
          </motion.div>
      )}
      </div>
    </div>
  </section>;


export default ServicesSection;