import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Developer",
    text: "MacBook Pro open-box liya AI Laptop Wala se — bilkul naya condition mein mila at 40% discount! Best deal ever. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "College Student",
    text: "Refurbished laptop liya budget mein — ekdum smooth chalti hai. Nitin bhaiya ne bahut acha guide kiya. Thank you AI Laptop Wala!",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "Business Owner",
    text: "Office ke liye 5 laptops liye bulk mein. Sabka condition excellent tha aur price bhi market se kaafi kam. After-sales support bhi zabardast!",
    rating: 5,
  },
  {
    name: "Sneha Joshi",
    role: "Graphic Designer",
    text: "Gaming laptop liya content creation ke liye — RTX wala. Performance outstanding hai aur Bhagwan Das ji ne personally setup karke diya.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "CA Professional",
    text: "Home repair service use ki — screen replacement ke liye. Technician ghar aaya, 1 ghante mein fix kar diya. Very professional service!",
    rating: 5,
  },
  {
    name: "Anita Gupta",
    role: "Teacher",
    text: "Refurbished desktop liya online classes ke liye. Bahut smooth run hota hai. Price bhi pocket-friendly tha. Thank you team!",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-16 md:py-24 section-alt">
      <div ref={ref} className="container mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
            Happy <span className="gradient-text">Customers</span>
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-3 max-w-md mx-auto">
            5000+ satisfied customers trust AI Laptop Wala for their tech needs.
          </p>
          <div className="section-divider mb-10 md:mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card-solid gradient-border p-5 md:p-6 rounded-2xl flex flex-col touch-card"
            >
              <Quote size={20} className="text-primary/30 mb-3" />
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} className="text-[hsl(45,100%,50%)] fill-[hsl(45,100%,50%)]" />
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, j) => (
                  <Star key={`e-${j}`} size={13} className="text-border" />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
