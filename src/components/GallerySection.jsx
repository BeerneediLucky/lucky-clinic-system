import { motion } from "framer-motion";
import clinicInterior from "@/assets/clinic-interior.jpg";
import treatmentVisual from "@/assets/treatment-visual.jpg";
import clinicReception from "@/assets/clinic-reception.jpg";

const images = [
{ src: clinicInterior, alt: "Lucky Clinic treatment room - modern equipment", w: 800, h: 600 },
{ src: clinicReception, alt: "Lucky Clinic reception - welcoming environment", w: 800, h: 600 },
{ src: treatmentVisual, alt: "Dermatology skincare products at Lucky Clinic", w: 800, h: 600 }];


const GallerySection = () =>
<section id="gallery" className="py-20">
    <div className="container">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-xl mx-auto mb-14">
      
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Our Clinic</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
          Clean & Hygienic Environment
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) =>
      <motion.div
        key={img.alt}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="overflow-hidden rounded-2xl shadow-card">
        
            <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          loading="lazy"
          className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500" />
        
          </motion.div>
      )}
      </div>
    </div>
  </section>;


export default GallerySection;