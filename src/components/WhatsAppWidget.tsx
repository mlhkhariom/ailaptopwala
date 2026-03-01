import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quickMessages = [
  { label: "💻 Laptop Price Inquiry", msg: "Hi, I want to know laptop prices." },
  { label: "🔧 Repair / Home Service", msg: "Hi, I need laptop repair / home service in Indore." },
  { label: "🍎 MacBook Availability", msg: "Hi, is any MacBook available?" },
  { label: "🎮 Gaming Laptop", msg: "Hi, I'm looking for a gaming laptop." },
  { label: "📦 Bulk / Office Order", msg: "Hi, I want to place a bulk/office laptop order." },
];

const WhatsAppWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="w-72 sm:w-80 rounded-2xl shadow-2xl border border-border overflow-hidden bg-card"
          >
            {/* Header */}
            <div className="bg-[hsl(142,70%,40%)] px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">AI Laptop Wala</p>
                <p className="text-[10px] text-white/70">Usually replies within minutes</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat body */}
            <div className="p-4 bg-muted/30">
              <div className="bg-card rounded-xl p-3 shadow-sm border border-border/50 mb-4">
                <p className="text-xs text-foreground font-medium mb-1">👋 Namaste!</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  AI Laptop Wala mein aapka swagat hai. Neeche se select karein ya apna message likhen!
                </p>
              </div>

              <div className="space-y-2">
                {quickMessages.map((qm) => (
                  <a
                    key={qm.label}
                    href={`https://wa.me/919893496163?text=${encodeURIComponent(qm.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full text-left text-xs font-medium bg-card hover:bg-primary/5 border border-border/50 rounded-xl px-3 py-2.5 transition-colors group"
                  >
                    <Send size={12} className="text-[hsl(142,70%,45%)] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    {qm.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Custom message */}
            <div className="p-3 border-t border-border/50">
              <a
                href="https://wa.me/919893496163"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[hsl(142,70%,45%)] py-2.5 text-sm font-bold text-white hover:bg-[hsl(142,70%,40%)] transition-colors active:scale-95"
              >
                <MessageCircle size={14} /> Open WhatsApp Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform whatsapp-pulse"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
