import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "./Blog";
import SEOHead from "@/components/SEOHead";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const Icon = post.icon;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": "Nitin Asati" },
    "publisher": { "@type": "Organization", "name": "AI Laptop Wala", "url": "https://ailaptopwala.com" },
    "url": `https://ailaptopwala.com/blog/${post.id}`,
    "mainEntityOfPage": `https://ailaptopwala.com/blog/${post.id}`
  };

  return (
    <div className="pt-20 pb-16">
      <SEOHead
        title={`${post.title} – AI Laptop Wala Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.id}`}
        keywords={post.tags.join(", ") + ", AI Laptop Wala, Indore"}
        jsonLd={articleSchema}
      />

      <div className="container mx-auto px-5 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{post.title.substring(0, 40)}...</span>
        </div>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} read</span>
            </div>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{tag}</span>
            ))}
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 p-5 rounded-2xl bg-muted/50 border border-border/50">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="space-y-8">
            {post.content.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <h2 className="font-heading text-lg md:text-xl font-bold mb-3 text-foreground">{section.heading}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{section.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="font-heading text-lg font-bold mb-2">Koi Sawal Hai?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Laptop se related koi bhi query ho — WhatsApp par poochein, hum turant reply karenge!
            </p>
            <a
              href="https://wa.me/919893496163?text=Hi%2C%20I%20read%20your%20blog%20and%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[hsl(142,70%,45%)] px-6 py-3 text-sm font-bold text-white hover:bg-[hsl(142,70%,40%)] transition-colors active:scale-95"
            >
              <MessageCircle size={16} /> WhatsApp Par Poochein
            </a>
          </div>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
              <ArrowLeft size={14} /> All Articles
            </Link>
            <button
              onClick={() => navigator.share?.({ title: post.title, url: window.location.href }).catch(() => {})}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;
