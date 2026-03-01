import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Laptop, Wrench, ShieldCheck, Zap, BookOpen } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useInView } from "@/hooks/useInView";

const blogPosts = [
  {
    id: "refurbished-laptop-guide",
    title: "Refurbished Laptop Kaise Choose Karein? – Complete Buying Guide 2025",
    excerpt: "Refurbished laptop lene se pehle in 10 baaton ka dhyan rakhein. Quality, warranty, aur best deals kaise paayein — sab kuch yahan samjhein.",
    icon: Laptop,
    date: "2025-01-15",
    readTime: "5 min",
    tags: ["Buying Guide", "Refurbished"],
    content: [
      { heading: "Refurbished Laptop Kya Hota Hai?", text: "Refurbished laptop vo hota hai jo pehle use hua ho, lekin professionally repair, clean, aur test karke dobara sale ke liye ready kiya gaya ho. Ye naya jaisa dikhta hai aur bahut affordable hota hai." },
      { heading: "Kahan Se Khareedein?", text: "Hamesha trusted seller se khareedein jaise AI Laptop Wala jo har laptop ko 40-point quality check se guzaarta hai. Road-side shops se bachein." },
      { heading: "Kya Check Karein?", text: "Battery health, screen condition, keyboard feel, hinge tightness, SSD vs HDD, RAM upgradability — ye sab zaroor check karein purchase se pehle." },
      { heading: "Warranty Ka Dhyan Rakhein", text: "Kam se kam 3-6 months warranty lein. AI Laptop Wala par har product ke saath warranty milti hai." },
      { heading: "Budget Ke Hisaab Se Best Options", text: "₹10,000 mein basic use ke liye, ₹15,000-25,000 mein office/student use, aur ₹30,000+ mein gaming/editing ke liye acche options milte hain." },
    ]
  },
  {
    id: "laptop-slow-fix",
    title: "Laptop Slow Chal Raha Hai? – 7 Instant Speed Boost Tips",
    excerpt: "Aapka laptop slow ho gaya? Ye 7 simple tips try karein — bina paise kharche speed double karein!",
    icon: Zap,
    date: "2025-02-01",
    readTime: "4 min",
    tags: ["Tips & Tricks", "Speed"],
    content: [
      { heading: "1. Startup Programs Band Karein", text: "Task Manager > Startup tab mein unwanted programs disable karein. Isse boot time 50% tak kam ho sakta hai." },
      { heading: "2. Disk Cleanup Karein", text: "Windows + R > cleanmgr type karein > temporary files delete karein. Ye GB's mein space free karega." },
      { heading: "3. SSD Upgrade Karein", text: "Agar HDD hai to SSD lagwaayein — ye sabse bada speed boost hai. AI Laptop Wala par SSD upgrade service available hai." },
      { heading: "4. RAM Badhayein", text: "4GB RAM kam hai 2025 mein. Kam se kam 8GB rakkhein. RAM upgrade bhi AI Laptop Wala par hota hai." },
      { heading: "5. Antivirus Scan Karein", text: "Windows Defender se full scan karein. Malware laptop ko bahut slow kar deta hai." },
      { heading: "6. Visual Effects Kam Karein", text: "System Properties > Performance > Adjust for best performance select karein." },
      { heading: "7. Windows Reinstall Karein", text: "Agar kuch kaam nahi aata to fresh Windows install karwa lein. AI Laptop Wala mein OS installation service available hai." },
    ]
  },
  {
    id: "macbook-vs-windows",
    title: "MacBook vs Windows Laptop – Kaun Sa Best Hai Aapke Liye?",
    excerpt: "MacBook lein ya Windows? Dono ke pros & cons samjhein aur apne use case ke hisaab se best choice karein.",
    icon: ShieldCheck,
    date: "2025-02-20",
    readTime: "6 min",
    tags: ["Comparison", "MacBook"],
    content: [
      { heading: "Build Quality", text: "MacBook ki build quality unmatched hai — aluminum unibody, premium feel. Windows mein ThinkPad aur Dell XPS acche hain, lekin MacBook premium lagta hai." },
      { heading: "Performance", text: "Apple M-series chips bahut powerful hain battery life ke saath. Windows mein Intel/AMD chips hain jo gaming aur heavy software ke liye better hain." },
      { heading: "Software Compatibility", text: "Agar aap coding, design, ya video editing karte hain to MacBook best hai. Agar gaming, accounting software, ya specific Windows apps chahiye to Windows better hai." },
      { heading: "Price Comparison", text: "Naya MacBook ₹80,000+ se shuru hota hai. AI Laptop Wala par open-box MacBook ₹35,000 se mil sakta hai — 50%+ savings!" },
      { heading: "Hamari Recommendation", text: "Students aur professionals ke liye MacBook best hai. Gamers aur budget buyers ke liye Windows laptop better choice hai. Dono AI Laptop Wala par available hain." },
    ]
  },
  {
    id: "laptop-care-tips",
    title: "Laptop Ki Care Kaise Karein? – 8 Tips for Long Life",
    excerpt: "Apne laptop ko 5+ saal tak chalana hai? Ye 8 care tips follow karein aur laptop naya jaisa rahega.",
    icon: Wrench,
    date: "2025-03-10",
    readTime: "4 min",
    tags: ["Maintenance", "Tips"],
    content: [
      { heading: "1. Regular Cleaning", text: "Har 2-3 months mein keyboard, screen, aur vents clean karein. Compressed air can se dust nikaalein." },
      { heading: "2. Overcharging Se Bachein", text: "Battery 20-80% range mein rakhein. 100% tak charge karke connected mat rakhein." },
      { heading: "3. Hard Surface Par Use Karein", text: "Bed ya pillow par laptop mat rakhein — vents block hote hain aur overheating hoti hai." },
      { heading: "4. Antivirus Updated Rakhein", text: "Windows Defender ya trusted antivirus install rakhein aur regular scan karein." },
      { heading: "5. Software Updated Rakhein", text: "Windows updates aur driver updates regular install karein — ye security aur performance dono improve karte hain." },
      { heading: "6. Backup Zaroor Rakhein", text: "Important data ka backup external drive ya cloud par rakhein. Kab kya ho jaaye!" },
      { heading: "7. Liquid Se Door Rakhein", text: "Laptop ke paas chai/coffee mat rakhein. Liquid damage repair bahut costly hota hai." },
      { heading: "8. Professional Servicing", text: "Saal mein ek baar professional cleaning karwaayein. AI Laptop Wala mein ye service available hai." },
    ]
  },
];

const BlogCard = ({ post, index }: { post: typeof blogPosts[0]; index: number }) => {
  const { ref, inView } = useInView();
  const Icon = post.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.id}`} className="block group">
        <div className="glass-card-solid glow-cyan-hover gradient-border rounded-2xl overflow-hidden touch-card h-full">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
              </div>
            </div>
            <h3 className="font-heading text-base md:text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{tag}</span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
              Read More <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Blog = () => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AI Laptop Wala Blog – Tech Tips & Laptop Buying Guide",
    "url": "https://ailaptopwala.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "AI Laptop Wala",
      "url": "https://ailaptopwala.com"
    },
    "blogPost": blogPosts.map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "description": p.excerpt,
      "datePublished": p.date,
      "url": `https://ailaptopwala.com/blog/${p.id}`,
      "author": { "@type": "Person", "name": "Nitin Asati" },
      "publisher": { "@type": "Organization", "name": "AI Laptop Wala" }
    }))
  };

  return (
    <div className="pt-20 pb-16">
      <SEOHead
        title="Tech Tips & Laptop Buying Guide – AI Laptop Wala Blog Indore"
        description="Laptop buying guide, speed tips, MacBook vs Windows comparison, care tips aur bahut kuch. AI Laptop Wala Indore ka tech blog."
        canonical="/blog"
        keywords="laptop buying guide, refurbished laptop tips, laptop speed tips, MacBook vs Windows, laptop care, tech tips Indore, AI Laptop Wala blog"
        jsonLd={blogSchema}
      />

      <div className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-12 md:py-16">
        <div className="container mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <BookOpen size={14} /> Tech Blog
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black mb-3">
            Tips & <span className="text-primary">Guides</span>
          </h1>
          <p className="text-background/60 text-sm md:text-base max-w-lg mx-auto">
            Laptop khareedne se pehle aur khareedne ke baad — sab kuch seekhein yahan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { blogPosts };
export default Blog;
