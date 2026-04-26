import { motion } from "framer-motion";
import { Heart, MessageSquare, Award, Users } from "lucide-react";
import doctorImg from "@/assets/doctor-portrait.jpg";

const highlights = [
{ icon: Heart, label: "Friendly & patient-focused care" },
{ icon: MessageSquare, label: "Simple explanation of treatments" },
{ icon: Award, label: "High success rate in acne & skin issues" },
{ icon: Users, label: "Trusted by 50+ happy patients" }];


const AboutSection = () =>
<section id="about" className="py-20 bg-card">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        
          <img
          src={doctorImg}
          alt="Dr. Lucky - Dermatologist at Lucky Skin Clinic"
          className="rounded-2xl shadow-card w-full max-w-sm mx-auto object-cover"
          width={600}
          height={700} />
        
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}>
        
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Meet Your Doctor</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Dr. Lucky
          </h2>
          <p className="text-muted-foreground mt-1 text-lg">Dermatologist</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Dr. Lucky provides compassionate, expert dermatological care to patients of all backgrounds. 
            Known for his warm approach and clear communication, he ensures every patient understands 
            their treatment plan and feels confident in their skin health journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {highlights.map((h) =>
          <div key={h.label} className="flex items-start gap-3 p-3 rounded-xl bg-secondary">
                <h.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-secondary-foreground">{h.label}</span>
              </div>
          )}
          </div>
        </motion.div>
      </div>
    </div>
  </section>;


export default AboutSection;