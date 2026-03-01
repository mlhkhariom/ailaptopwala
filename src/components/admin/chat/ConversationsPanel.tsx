import { useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { useChats, type ChatContact } from "@/hooks/useN8nData";
import { cn } from "@/lib/utils";
import { ChatListSkeleton, ChatWindowSkeleton } from "./ChatSkeleton";

export function ConversationsPanel() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: contacts = [], isLoading } = useChats();
  
  const selectedContact = contacts.find(c => c.id === selectedId) || null;

  const handleBack = () => {
    setSelectedId(null);
  };

  if (isLoading) {
    return (
      <div className="relative flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-0px)] overflow-hidden">
        <div className={cn("w-full md:w-96 shrink-0", selectedId ? "hidden md:block" : "block")}>
          <ChatListSkeleton />
        </div>
        <div className={cn("flex-1", selectedId ? "block" : "hidden md:block")}>
          <ChatWindowSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-0px)] overflow-hidden">
      <div className={cn(
        "w-full md:w-96 border-r border-border/50 shrink-0 h-full",
        "md:flex flex-col",
        selectedId ? "hidden" : "flex"
      )}>
        <ChatList selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      <div className={cn(
        "flex-1 flex-col h-full",
        selectedId ? "flex" : "hidden md:flex"
      )}>
        <ChatWindow 
          contactId={selectedId} 
          contact={selectedContact} 
          onBack={handleBack} 
        />
      </div>
    </div>
  );
}