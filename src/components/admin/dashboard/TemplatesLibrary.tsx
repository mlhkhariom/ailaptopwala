import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Plus, Copy, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

const defaultTemplates: Template[] = [
  { id: '1', name: 'Greeting', content: 'Hello! Welcome to AI LaptopWala. How can I help you today?', category: 'General' },
  { id: '2', name: 'Product Inquiry', content: 'Thank you for your interest! Let me share the details about this product.', category: 'Sales' },
  { id: '3', name: 'Price Quote', content: 'The price for this laptop is ₹{price}. We also offer EMI options.', category: 'Sales' },
  { id: '4', name: 'Closing', content: 'Thank you for contacting us! Feel free to reach out anytime.', category: 'General' },
];

export function TemplatesLibrary() {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '', category: 'General' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Template copied to clipboard!');
  };

  const handleAdd = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast.error('Please fill all fields');
      return;
    }
    
    const template: Template = {
      id: Date.now().toString(),
      ...newTemplate
    };
    
    setTemplates([...templates, template]);
    setNewTemplate({ name: '', content: '', category: 'General' });
    setIsDialogOpen(false);
    toast.success('Template added!');
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success('Template deleted!');
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Message Templates</h1>
          <p className="text-muted-foreground mt-1">Quick reply templates for faster responses</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Template Name</label>
                <Input
                  placeholder="e.g., Welcome Message"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  placeholder="e.g., Sales, Support"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Message Content</label>
                <Textarea
                  placeholder="Type your template message..."
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  rows={4}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleAdd} className="w-full">
                Create Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-4 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{template.name}</h3>
                <span className="text-xs text-muted-foreground">{template.category}</span>
              </div>
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {template.content}
            </p>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => handleCopy(template.content)}
              >
                <Copy className="w-3 h-3" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(template.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
