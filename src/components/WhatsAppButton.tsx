import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919893496163"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform whatsapp-pulse"
  >
    <MessageCircle size={26} />
  </a>
);

export default WhatsAppButton;
