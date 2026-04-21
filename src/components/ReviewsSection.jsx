import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
{ name: "Priya R.", text: "Very friendly doctor, explains clearly even to non-educated patients. I felt very comfortable during my visit.", rating: 5 },
{ name: "Ramesh K.", text: "Best skin doctor in Narasaraopet with fast recovery. My acne cleared up in just 3 weeks!", rating: 5 },
{ name: "Lakshmi D.", text: "Excellent results for acne and spots. Dr. Lucky really listens and gives the right treatment.", rating: 5 },
{ name: "Suresh M.", text: "Very professional clinic, clean environment. My skin allergy was treated quickly. Highly recommend!", rating: 4 }];


const ReviewsSection = () =>
<section id="reviews" className="py-20 bg-card">
    <div className="container">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-xl mx-auto mb-14">
      
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Patient Reviews</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
          Trusted by Our Patients
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex">
            {[...Array(5)].map((_, i) =>
          <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400 fill-yellow-400/50"}`} />
          )}
          </div>
          <span className="font-semibold text-foreground">4.6</span>
          <span className="text-muted-foreground text-sm">based on 52 reviews</span>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {reviews.map((r, i) =>
      <motion.div
        key={r.name}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="p-6 rounded-2xl bg-background border border-border shadow-card">
        
            <Quote className="h-8 w-8 text-primary/20 mb-3" />
            <p className="text-foreground leading-relaxed text-sm">{r.text}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="font-semibold text-sm text-foreground">{r.name}</span>
              <div className="flex">
                {[...Array(r.rating)].map((_, j) =>
            <Star key={j} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            )}
              </div>
            </div>
          </motion.div>
      )}
      </div>
    </div>
  </section>;


export default ReviewsSection;