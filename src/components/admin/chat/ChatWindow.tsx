import { User, Bot, MoreVertical, Loader2, Phone, MessageCircle, Check, CheckCheck, PanelRightOpen, PanelRightClose, Send, Paperclip, Smile, Image as ImageIcon, ArrowLeft, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useChatMessages, useSendWhatsAppMessage, useDeleteMessage, type ChatContact, type ChatMessage } from "@/hooks/useN8nData";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useEffect, useRef, useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ContactTags } from "./ContactTags";
import { toast } from "sonner";

interface ChatWindowProps {
  contactId: string | null;
  contact?: ChatContact | null;
  onBack?: () => void;
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }
}

function getMessageGroups(messages: ChatMessage[]) {
  const groups: { date: string; messages: ChatMessage[] }[] = [];
  
  messages.forEach(msg => {
    const dateKey = new Date(msg.timestamp).toDateString();
    const existingGroup = groups.find(g => g.date === dateKey);
    if (existingGroup) {
      existingGroup.messages.push(msg);
    } else {
      groups.push({ date: dateKey, messages: [msg] });
    }
  });
  
  return groups;
}

export function ChatWindow({ contactId, contact, onBack }: ChatWindowProps) {
  const { data: messages = [], isLoading, error } = useChatMessages(contactId);
  const { uploadImage, uploading: isUploadingImage } = useCloudinaryUpload();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const sendMessage = useSendWhatsAppMessage();
  const deleteMessage = useDeleteMessage();

  const messageGroups = useMemo(() => getMessageGroups(messages), [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent, imageUrl?: string) => {
    e?.preventDefault();
    const textMessage = messageInput.trim();

    if (!textMessage && !imageUrl) return;

    if (!contactId || !contact?.phoneNumber) {
      toast.error('Cannot send message: contact details are missing.');
      return;
    }

    setIsSending(true);
    try {
      await sendMessage.mutateAsync({
        phoneNumber: contact.phoneNumber,
        message: textMessage,
        imageUrl,
        contactId,
      });
      setMessageInput('');
      if (imageUrl) {
        toast.success('Image sent successfully!');
      } else {
        toast.success('Message sent successfully!');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      await handleSendMessage(undefined, imageUrl);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (confirm('Delete this message?')) {
      try {
        await deleteMessage.mutateAsync(messageId);
        toast.success('Message deleted');
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  // Get phone number from contact or from messages
  const phoneNumber = contact?.phoneNumber || messages[0]?.mobileNumber || '';
  
  // Format display name: if contact has a proper name (not just formatted number), show it, else show formatted number
  let displayName = contact?.name || '';
  
  // Check if name is just a formatted phone number (contains only digits, spaces, +)
  const isPhoneNumberName = displayName && /^[\d\s+]+$/.test(displayName);
  
  if (!displayName || isPhoneNumberName) {
    // Use phone number as display name
    if (phoneNumber) {
      // Format: 919165100124 -> Hariom (9165100124) or just 9165100124
      const cleanNumber = phoneNumber.replace(/^\+?91/, ''); // Remove country code
      displayName = cleanNumber;
    } else {
      displayName = contactId ? `Contact ${contactId.slice(0, 8)}` : 'Unknown';
    }
  }
  
  const initials = displayName.slice(0, 2).toUpperCase();

  if (!contactId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background to-card/50">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 glow-primary">
            <MessageCircle className="w-12 h-12 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-3 text-gradient">Select a Conversation</h3>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Choose a chat from the sidebar to view messages and conversation history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex h-full bg-gradient-to-br from-background via-background to-card/30">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/jpg"
      />

      {/* Main Chat Area - WhatsApp Layout */}
      <div className="flex-1 flex flex-col h-full max-h-screen overflow-hidden">
        {/* Header - Fixed Top */}
        <div className="h-14 md:h-20 border-b border-border/50 flex items-center justify-between px-3 md:px-6 bg-card/95 backdrop-blur-xl flex-shrink-0 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <Button variant="ghost" size="icon" className="md:hidden rounded-full h-9 w-9 shrink-0" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="h-9 w-9 md:h-12 md:w-12 border-2 border-primary/30 shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-primary/30 to-accent/30 text-primary font-bold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm md:text-lg truncate">{displayName}</h3>
              <div className="flex items-center gap-2">
                {phoneNumber && (
                  <p className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1 truncate">
                    <Phone className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
                    <span className="truncate">{phoneNumber}</span>
                  </p>
                )}
                <span className="flex items-center gap-1 text-[10px] md:text-xs text-success shrink-0">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-success animate-pulse" />
                  <span className="hidden md:inline">Active</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-secondary/50 hidden md:flex h-9 w-9"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 h-9 w-9">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area - Scrollable */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-3 md:px-6 py-3 md:py-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] bg-repeat min-h-0"
        >
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Loading messages...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-destructive" />
              </div>
              <p className="text-sm text-destructive font-medium">Failed to load messages</p>
              <p className="text-xs text-muted-foreground mt-1">Please try again later</p>
            </div>
          )}

          {!isLoading && !error && messages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">No messages yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Start a conversation to see messages here</p>
            </div>
          )}

          <div className="space-y-6">
            {messageGroups.map((group) => (
              <div key={group.date}>
                {/* Date Separator */}
                <div className="flex items-center justify-center my-8">
                  <div className="bg-secondary/60 text-muted-foreground text-xs px-5 py-2 rounded-full font-medium backdrop-blur-md shadow-sm border border-border/30">
                    {formatDate(group.messages[0].timestamp)}
                  </div>
                </div>

                {/* Messages for this date */}
                <div className="space-y-4">
                  {group.messages.map((message, i) => {
                    const isUser = message.sender === "user";
                    const showAvatar = i === 0 || group.messages[i - 1]?.sender !== message.sender;
                    
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-2 animate-fade-in",
                          isUser ? "flex-row" : "flex-row-reverse"
                        )}
                        style={{ animationDelay: `${i * 20}ms` }}
                      >
                        {/* Avatar */}
                        <div className={cn("w-7 md:w-8 shrink-0", !showAvatar && "invisible")}>
                          {showAvatar && (
                            <div className={cn(
                              "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center",
                              isUser 
                                ? "bg-gradient-to-br from-primary to-primary/70" 
                                : "bg-gradient-to-br from-accent to-accent/70"
                            )}>
                              {isUser ? (
                                <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
                              ) : (
                                <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent-foreground" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className={cn(
                          "max-w-[80%] md:max-w-[75%] group relative",
                          isUser ? "items-start" : "items-end"
                        )}>
                          {/* Delete button - temporarily disabled until edge function is deployed */}
                          {false && !isUser && (
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive/90 hover:bg-destructive text-destructive-foreground rounded-full p-1.5 shadow-lg z-10"
                              title="Delete message"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                          <div className={cn(
                            "rounded-2xl md:rounded-2xl shadow-md transition-all hover:shadow-lg",
                            isUser 
                              ? "bg-card/80 border border-border/50 text-foreground rounded-bl-md backdrop-blur-sm"
                              : "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-br-md shadow-primary/20",
                            !message.message && "p-1.5"
                          )}>
                            {message.imageUrl && (
                              <img
                                src={message.imageUrl}
                                alt="Sent image"
                                className="rounded-xl max-w-[240px] md:max-w-xs cursor-pointer"
                                onClick={() => window.open(message.imageUrl, '_blank')}
                              />
                            )}
                            {message.message && (
                              <p className="text-[13px] md:text-sm whitespace-pre-wrap leading-relaxed break-words px-3 py-2 md:px-4 md:py-3">
                                {message.message}
                              </p>
                            )}
                          </div>
                          <div className={cn(
                            "flex items-center gap-1 mt-0.5 md:mt-1 px-1",
                            isUser ? "justify-start" : "justify-end"
                          )}>
                            <span className="text-[9px] md:text-[10px] text-muted-foreground">
                              {formatTime(message.timestamp)}
                            </span>
                            {!isUser && (
                              <CheckCheck className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary/70" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
             {isUploadingImage && (
              <div className="flex justify-end animate-fade-in">
                <div className="flex gap-2 items-end">
                    <div className="w-8 shrink-0 invisible"></div>
                    <div className="max-w-[75%]">
                        <div className="rounded-2xl p-2.5 shadow-sm bg-primary/20 animate-pulse">
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <ImageIcon className="w-4 h-4" />
                            <span>Uploading...</span>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message Input - Fixed at bottom */}
        <div className="h-auto min-h-[56px] md:min-h-[64px] px-2 md:px-6 py-2 md:py-3 border-t border-border/50 bg-card/98 backdrop-blur-xl flex-shrink-0 sticky bottom-0 z-10">
          <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 md:gap-2 h-full">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="shrink-0 rounded-full hover:bg-secondary/50 h-9 w-9 md:h-10 md:w-10"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage || isSending}
            >
              <Paperclip className="w-4.5 h-4.5 md:w-5 md:h-5 text-muted-foreground" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={contact?.phoneNumber ? "Type a message..." : "No phone number available"}
                className="pr-9 md:pr-12 bg-secondary/40 border-border/50 h-9 md:h-12 rounded-full md:rounded-xl focus:ring-2 focus:ring-primary/40 transition-all text-sm"
                disabled={isSending || isUploadingImage || !contact?.phoneNumber}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0.5 md:right-1 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-secondary/50"
              >
                <Smile className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              </Button>
            </div>
            <Button 
              type="submit" 
              size="icon"
              disabled={isSending || isUploadingImage || !(messageInput.trim() || isUploadingImage) || !contact?.phoneNumber}
              className="shrink-0 h-9 w-9 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 disabled:opacity-50 shadow-lg shadow-primary/30"
            >
              {(isSending || isUploadingImage) ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </Button>
          </form>
          {!contact?.phoneNumber && contactId && (
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1 text-center">
              Phone number not available for this contact
            </p>
          )}
        </div>
      </div>

      {/* Right Sidebar - Templates & Tags */}
      {showSidebar && (
        <div className="w-72 border-l border-border/50 bg-card/30 backdrop-blur-sm p-4 space-y-6 animate-fade-in overflow-y-auto hidden md:block">
          {/* Contact Tags */}
          <ContactTags contactId={contactId} />
          
          {/* Divider */}
          <div className="border-t border-border/30" />
        </div>
      )}
    </div>
  );
}