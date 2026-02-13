import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="py-6 md:py-8 border-t border-border/50 bg-muted/30">
    <div className="container mx-auto px-5 flex flex-col items-center gap-3">
      <img src={logo} alt="AI Laptop Wala" className="h-10 w-auto" />
      <p className="text-xs text-muted-foreground text-center">
        © 2026 AI Laptop Wala | Powered by Asati Infotech. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
