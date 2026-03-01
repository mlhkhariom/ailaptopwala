import { useState, useEffect } from "react";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { ConversationsPanel } from "@/components/admin/chat/ConversationsPanel";
import { TemplatesLibrary } from "@/components/admin/dashboard/TemplatesLibrary";
import { BroadcastPanel } from "@/components/admin/dashboard/BroadcastPanel";
import { ProductsPanel } from "@/components/admin/products/ProductsPanel";
import { ProductImagesPanel } from "@/components/admin/images/ProductImagesPanel";
import { LiveChatPanel } from "@/components/admin/live/LiveChatPanel";
import { Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Add PWA manifest link only for admin panel
  useEffect(() => {
    const link = document.querySelector("link[rel='manifest']");
    if (!link) {
      const manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = '/manifest.json';
      document.head.appendChild(manifestLink);
    }

    // Add theme color for PWA
    const themeColor = document.querySelector("meta[name='theme-color']");
    if (!themeColor) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#8b5cf6';
      document.head.appendChild(meta);
    }

    // Add apple touch icon
    const appleIcon = document.querySelector("link[rel='apple-touch-icon']");
    if (!appleIcon) {
      const icon = document.createElement('link');
      icon.rel = 'apple-touch-icon';
      icon.href = '/icon-192.png';
      document.head.appendChild(icon);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "chats":
        return <ConversationsPanel />;
      case "templates":
        return <TemplatesLibrary />;
      case "broadcast":
        return <BroadcastPanel />;
      case "products":
        return <ProductsPanel />;
      case "images":
        return <ProductImagesPanel />;
      case "live":
        return <LiveChatPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - AI Laptop Wala</title>
        <meta name="description" content="AI Laptop Wala Admin Panel - Manage chats, products, and orders" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
          {/* Mobile top padding for fixed header */}
          <div className="h-14 md:hidden shrink-0" />
          
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
          
          <footer className="py-3 px-4 sm:px-6 border-t border-border bg-card/50 backdrop-blur-sm shrink-0">
            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
              Build With <Heart className="w-3 h-3 text-destructive fill-destructive" /> By MLHK Infotech (Hariom Vishwkarma)
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
