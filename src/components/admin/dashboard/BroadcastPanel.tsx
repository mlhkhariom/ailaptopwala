import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useChats, useSendWhatsAppMessage } from "@/hooks/useN8nData";
import { Send, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function BroadcastPanel() {
  const { data: contacts = [] } = useChats();
  const sendMessage = useSendWhatsAppMessage();
  const [message, setMessage] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.id));
    }
  };

  const handleToggleContact = (id: string) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleBroadcast = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (selectedContacts.length === 0) {
      toast.error('Please select at least one contact');
      return;
    }

    setIsSending(true);
    let successCount = 0;

    for (const contactId of selectedContacts) {
      const contact = contacts.find(c => c.id === contactId);
      if (!contact?.phoneNumber) continue;

      try {
        await sendMessage.mutateAsync({
          phoneNumber: contact.phoneNumber,
          message: message,
          contactId: contactId,
        });
        successCount++;
      } catch (error) {
        console.error(`Failed to send to ${contact.name}:`, error);
      }
    }

    setIsSending(false);
    toast.success(`Broadcast sent to ${successCount} contacts!`);
    setMessage('');
    setSelectedContacts([]);
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Broadcast Message</h1>
        <p className="text-muted-foreground mt-1">Send message to multiple contacts at once</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Composer */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Compose Message</h2>
          <Textarea
            placeholder="Type your broadcast message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedContacts.length} contacts selected
            </span>
            <Button
              onClick={handleBroadcast}
              disabled={isSending || !message.trim() || selectedContacts.length === 0}
              className="gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Broadcast
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Contact Selection */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Select Recipients</h2>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => handleToggleContact(contact.id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{contact.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{contact.phoneNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
