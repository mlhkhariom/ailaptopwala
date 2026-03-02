import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "@/lib/api";

// ==================== PRODUCT INTERFACES ====================

export interface Product {
  id: string;
  category: 'laptops' | 'desktops' | 'accessories';
  // Common fields
  brand?: string;
  model?: string;
  name?: string; // For accessories
  processor?: string;
  generation?: string;
  ram_gb?: number | null;
  ram_type?: string;
  storage_type?: string;
  storage_gb?: number | null;
  screen_size?: string;
  monitor_size?: string;
  graphics?: string;
  condition?: string;
  price_range?: string;
  stock_quantity?: number | null;
  special_feature?: string;
  warranty_in_months?: number | null;
  image_url_1?: string | null;
  image_url_2?: string | null;
  updated_at?: string;
  // Computed
  status: 'active' | 'low_stock' | 'out_of_stock';
  displayName: string;
  price: number | null;
}

function parsePriceToNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/,/g, '');
  const match = cleaned.match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const num = Number(match[0]);
  return Number.isFinite(num) ? num : null;
}

function computeStatus(stock: number | null | undefined): 'active' | 'low_stock' | 'out_of_stock' {
  if (stock === null || stock === undefined) return 'active'; // No stock info = assume active
  if (stock === 0) return 'out_of_stock';
  if (stock <= 3) return 'low_stock';
  return 'active';
}

function normalizeLaptop(raw: any): Product {
  const id = String(raw?.row_number ?? crypto.randomUUID());
  const displayName = `${raw?.brand ?? ''} ${raw?.model ?? ''}`.trim() || `Laptop ${id}`;
  
  return {
    id,
    category: 'laptops',
    brand: raw?.brand || '',
    model: raw?.model || '',
    processor: raw?.processor || '',
    generation: raw?.generation || '',
    ram_gb: raw?.ram_gb ?? null,
    storage_type: raw?.storage_type || '',
    storage_gb: raw?.storage_gb ?? null,
    screen_size: raw?.screen_size || '',
    graphics: raw?.graphics || '',
    condition: raw?.condition || 'Used',
    price_range: raw?.price_range || '',
    stock_quantity: raw?.stock_quantity ?? null,
    special_feature: raw?.special_feature || '',
    warranty_in_months: raw?.warranty_in_months ?? null,
    image_url_1: raw?.image_url_1 || null,
    image_url_2: raw?.image_url_2 || null,
    updated_at: raw?.updated_at || null,
    status: computeStatus(raw?.stock_quantity),
    displayName,
    price: parsePriceToNumber(raw?.price_range),
  };
}

function normalizeDesktop(raw: any): Product {
  const id = String(raw?.row_number ?? crypto.randomUUID());
  const displayName = `${raw?.brand ?? ''} ${raw?.model ?? ''}`.trim() || `Desktop ${id}`;
  
  return {
    id,
    category: 'desktops',
    brand: raw?.brand || '',
    model: raw?.model || '',
    processor: raw?.processor || '',
    generation: raw?.generation || '',
    ram_gb: raw?.ram_gb ?? null,
    ram_type: raw?.ram_type || '',
    storage_gb: raw?.storage_gb ?? null,
    monitor_size: raw?.monitor_size || '',
    graphics: raw?.graphics || '',
    condition: raw?.condition || 'Used',
    price_range: raw?.price_range || '',
    stock_quantity: raw?.stock_quantity ?? null,
    special_feature: raw?.special_feature || '',
    warranty_in_months: raw?.warranty_in_months ?? null,
    image_url_1: raw?.image_url_1 || null,
    image_url_2: raw?.image_url_2 || null,
    updated_at: raw?.updated_at || null,
    status: computeStatus(raw?.stock_quantity),
    displayName,
    price: parsePriceToNumber(raw?.price_range),
  };
}

function normalizeAccessory(raw: any): Product {
  const id = String(raw?.row_number ?? crypto.randomUUID());
  const displayName = raw?.accessories_name || `Accessory ${id}`;
  const stockQty = raw?.stock_quantity ?? null;
  
  return {
    id,
    category: 'accessories',
    name: raw?.accessories_name || '',
    price_range: raw?.price_range_inr || '',
    image_url_1: raw?.image_url_1 || null,
    image_url_2: raw?.image_url_2 || null,
    updated_at: raw?.updated_at || null,
    status: computeStatus(stockQty),
    displayName,
    price: parsePriceToNumber(raw?.price_range_inr),
    stock_quantity: stockQty,
  };
}

async function fetchAllProducts(): Promise<Product[]> {
  const [laptopsRaw, desktopsRaw, accessoriesRaw] = await Promise.all([
    callApi<any[]>('get-laptop').catch(() => []),
    callApi<any[]>('get-desktops').catch(() => []),
    callApi<any[]>('get-accessories').catch(() => []),
  ]);

  const laptops = (laptopsRaw || []).map(normalizeLaptop);
  const desktops = (desktopsRaw || []).map(normalizeDesktop);
  const accessories = (accessoriesRaw || []).map(normalizeAccessory);

  return [...laptops, ...desktops, ...accessories];
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 10_000,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
  });
}

// ==================== PRODUCT MUTATIONS ====================

function getActionPrefix(category: string): string {
  switch (category.toLowerCase()) {
    case 'laptops': return 'laptop';
    case 'desktops': return 'desktop';
    case 'accessories': return 'accessory';
    default: return 'product';
  }
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (product: Partial<Product>) => {
      const action = `add-${getActionPrefix(product.category || '')}`;
      console.log('Adding product:', action, product);
      return callApi(action, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (product: Product) => {
      const action = `update-${getActionPrefix(product.category)}`;
      console.log('Updating product:', action, product);
      return callApi(action, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: string }) => {
      const action = `delete-${getActionPrefix(category)}`;
      console.log('Deleting product:', action, { id });
      return callApi(action, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// ==================== CHAT INTERFACES ====================

interface RawChatMessage {
  id?: number;
  contact_uid?: string;
  content?: string;
  role?: 'user' | 'assistant';
  created_at?: string;
  image_url?: string;
  mobile_number?: string;
  name?: string;
}



// Represents the raw contact data from the 'get-contacts' API call

interface RawContact {

  uid: string;

  name: string;

  phone_number: string;

  email: string | null;

  created_at: string;

  updated_at: string;

}



interface NormalizedMessage {
  id: string;
  contactUid: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  imageUrl?: string;
  mobileNumber?: string;
  name?: string;
}



export interface ChatMessage {

  id: string;

  contactId: string;

  message: string;

  sender: 'user' | 'agent';

  timestamp: string;

  imageUrl?: string; // Added for image support

  mobileNumber?: string; // Added for mobile number support

}



export interface ChatContact {

  id: string;

  name: string;

  phoneNumber: string;

  lastMessage: string;

  time: string;

  unread: number;

  online: boolean;

}



function normalizeRawMessage(raw: RawChatMessage): NormalizedMessage | null {
  if (!raw.contact_uid) return null;
  
  return {
    id: String(raw.id ?? crypto.randomUUID()),
    contactUid: raw.contact_uid,
    content: raw.content || '',
    role: raw.role || 'user',
    created_at: raw.created_at || new Date().toISOString(),
    imageUrl: raw.image_url,
    mobileNumber: raw.mobile_number,
    name: raw.name,
  };
}



function formatRelativeTime(dateStr: string): string {

  if (!dateStr) return '';

  const date = new Date(dateStr);

  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const diffMins = Math.floor(diffMs / 60000);

  const diffHours = Math.floor(diffMins / 60);

  const diffDays = Math.floor(diffHours / 24);



  if (diffMins < 1) return 'Just now';

  if (diffMins < 60) return `${diffMins}m ago`;

  if (diffHours < 24) return `${diffHours}h ago`;

  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();

}



// This function is no longer the primary source for contacts, but can be a fallback

function deriveContactsFromMessages(messages: NormalizedMessage[]): ChatContact[] {

  const contactMap = new Map<string, NormalizedMessage[]>();



  for (const msg of messages) {

    if (!msg.contactUid) continue;

    if (!contactMap.has(msg.contactUid)) {

      contactMap.set(msg.contactUid, []);

    }

    contactMap.get(msg.contactUid)!.push(msg);

  }



  const contacts: ChatContact[] = [];



  for (const [contactId, msgs] of contactMap.entries()) {

    const sorted = msgs.sort(

      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()

    );

    const lastMsg = sorted[0];

    const unreadCount = sorted.filter(m => m.role === 'user').length;



    let phoneNumber = '';

    let displayName = '';

    

    // Try to get name from messages first
    const msgWithName = sorted.find(m => m.name);
    if (msgWithName?.name) {
      displayName = msgWithName.name;
    }
    
    // Get mobile number from any message
    const msgWithPhone = sorted.find(m => m.mobileNumber);
    if (msgWithPhone?.mobileNumber) {
      phoneNumber = msgWithPhone.mobileNumber;
      
      // If no name found, use formatted phone number
      if (!displayName) {
        if (phoneNumber.startsWith('91') && phoneNumber.length > 10) {
          displayName = phoneNumber.slice(2); // Remove country code
        } else {
          displayName = phoneNumber;
        }
      }
    }
    
    // Fallback to contact UID if nothing else
    if (!displayName) {
      displayName = `Contact ${contactId.slice(0, 8)}`;
    }





    contacts.push({

      id: contactId,

      name: displayName,

      phoneNumber: phoneNumber,

      lastMessage: lastMsg?.content ?? '',

      time: lastMsg?.created_at ? formatRelativeTime(lastMsg.created_at) : '',

      unread: Math.min(unreadCount, 9),

      online: false,

    });

  }



  contacts.sort((a, b) => {

    const aTime = contactMap.get(a.id)?.[0]?.created_at ?? '';

    const bTime = contactMap.get(b.id)?.[0]?.created_at ?? '';

    if (!aTime) return 1;

    if (!bTime) return -1;

    return new Date(bTime).getTime() - new Date(aTime).getTime();

  });

  return contacts;

}



function normalizeToChatMessage(raw: NormalizedMessage): ChatMessage {

  return {

    id: raw.id,

    contactId: raw.contactUid,

    message: raw.content,

    sender: raw.role === 'assistant' ? 'agent' : 'user',

    timestamp: raw.created_at,

    imageUrl: raw.imageUrl,

    mobileNumber: raw.mobileNumber,

  };

}



async function fetchAllMessages(): Promise<NormalizedMessage[]> {
  const rawMessages = await callApi<RawChatMessage[]>('get-chats');
  
  // Fetch names separately via nginx proxy
  try {
    const namesResponse = await fetch('https://ailaptopwala.com/api/postgres-api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get-contact-names' })
    });
    
    if (namesResponse.ok) {
      const namesData = await namesResponse.json();
      const nameMap = new Map(namesData.map((n: any) => [n.mobile_number, n.name]));
      
      // Add names to messages
      rawMessages.forEach((msg: any) => {
        if (msg.mobile_number && !msg.name) {
          msg.name = nameMap.get(msg.mobile_number);
        }
      });
    }
  } catch (error) {
    console.log('Could not fetch names from local server');
  }
  
  const normalized = (rawMessages || [])
    .map(normalizeRawMessage)
    .filter((m): m is NormalizedMessage => m !== null);
  return normalized;
}



async function fetchChatContacts(): Promise<ChatContact[]> {
  console.log('fetchChatContacts called');
  // Fetch contacts and messages in parallel

  const [rawContacts, allMessages] = await Promise.all([

    callApi<RawContact[]>('get-contacts').catch(() => []),

    fetchAllMessages().catch(() => []),

  ]);

  console.log('fetchChatContacts data:', { contactsCount: rawContacts?.length, messagesCount: allMessages?.length });

  if (!rawContacts || rawContacts.length === 0) {

    // Fallback to old method if no contacts are found

    return deriveContactsFromMessages(allMessages);

  }



  // Process messages for quick lookup

  const messageMap = new Map<string, NormalizedMessage[]>();

  for (const msg of allMessages) {

    if (!messageMap.has(msg.contactUid)) {

      messageMap.set(msg.contactUid, []);

    }

    messageMap.get(msg.contactUid)!.push(msg);

  }



  // Enrich contacts with message data

  const chatContacts = rawContacts.map((contact): ChatContact => {

    const messages = messageMap.get(contact.uid) || [];

    const sorted = messages.sort(

      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()

    );

    const lastMsg = sorted[0];

    const unreadCount = sorted.filter(m => m.role === 'user').length; // Simple unread logic



    return {

      id: contact.uid,

      name: contact.name || `Contact ${contact.uid.slice(0, 8)}`,

      phoneNumber: contact.phone_number,

      lastMessage: lastMsg?.content ?? 'No messages yet',

      time: lastMsg?.created_at ? formatRelativeTime(lastMsg.created_at) : formatRelativeTime(contact.updated_at),

      unread: unreadCount,

      online: false, // Presence detection would require more logic

    };

  });

  console.log('deriveContactsFromMessages result:', { count: chatContacts.length, contacts: chatContacts.slice(0, 3) });

  // Sort contacts by the timestamp of their last message

  chatContacts.sort((a, b) => {

    const aTime = messageMap.get(a.id)?.[0]?.created_at ?? '';

    const bTime = messageMap.get(b.id)?.[0]?.created_at ?? '';

    if (!aTime) return 1;

    if (!bTime) return -1;

    return new Date(bTime).getTime() - new Date(aTime).getTime();

  });



  return chatContacts;

}





export function useChats() {
  return useQuery({
    queryKey: ['all-messages'],
    queryFn: async () => {
      const messages = await fetchAllMessages();
      return deriveContactsFromMessages(messages);
    },
    staleTime: 60_000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}


export function useChatMessages(contactId: string | null) {

  return useQuery<NormalizedMessage[], Error, ChatMessage[]> ({

    queryKey: ['chat-messages', contactId],

    queryFn: fetchAllMessages,

    staleTime: 5_000,

    refetchInterval: 5_000,

    refetchIntervalInBackground: true,

    enabled: !!contactId,

    select: (messages) => {

      if (!contactId) return [];

      return messages

        .filter(m => m.contactUid === contactId)

        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

        .map(normalizeToChatMessage);

    },

  });

}



export function useSendMessage() {

  const queryClient = useQueryClient();

  

  return useMutation({

    mutationFn: ({ contactId, message, imageUrl, mobileNumber }: { contactId: string; message: string; imageUrl?: string; mobileNumber?: string }) => 

      callApi('send-message', { contactId, message, imageUrl, mobileNumber }),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['all-messages'] });

      queryClient.invalidateQueries({ queryKey: ['chat-contacts'] });

    },

  });

}



// ==================== WHATSAPP API ====================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:54321/functions/v1';

async function callWhatsAppApi<T>(action: string, data?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/whatsapp-api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, data }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WhatsApp API Error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
}



export function useSendWhatsAppMessage() {

  const queryClient = useQueryClient();

  

  return useMutation({

    mutationFn: async ({

      phoneNumber,

      message,

      imageUrl,

      contactId,

      templateName,

      templateLanguage,

      templateFields

    }: {

      phoneNumber: string;

      message?: string;

      imageUrl?: string;

      contactId: string;

      templateName?: string;

      templateLanguage?: string;

      templateFields?: Record<string, string>;

    }) => {

      console.log('useSendWhatsAppMessage called with:', { phoneNumber, message, imageUrl, contactId });

      // Save to database directly via edge function with explicit parameters
      const messageToSave = message || (imageUrl ? '[Image]' : `[Template: ${templateName}]`);
      
      console.log('Saving to database:', { contactId, message: messageToSave, imageUrl, mobileNumber: phoneNumber });
      
      // Call API with explicit field names
      await callApi('send-message', { 
        contactId: contactId,
        message: messageToSave,
        image_url: imageUrl,  // Use snake_case
        mobile_number: phoneNumber,  // Use snake_case
        role: 'assistant'
      });
      
      // Send via WhatsApp API directly
      const apiToken = 'IBG2MWvHajNsh4hnys7hb5VhiLr4914GqE8Ow8dtYyfdJJxDD17o6L7J44BYGll9';
      const vendorUid = 'a9070526-2ee5-4fd4-b0ad-0ba402ab92ce';
      const apiBaseUrl = 'https://wbuz.in/api';
      
      try {
        const cleanPhone = phoneNumber.replace(/^\+/, '').replace(/^0+/, '');
        
        if (imageUrl) {
          // Send media message
          const response = await fetch(`${apiBaseUrl}/${vendorUid}/contact/send-media-message?token=${apiToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone_number: cleanPhone,
              media_type: 'image',
              media_url: imageUrl,
              caption: message || ''
            })
          });
          
          if (!response.ok) {
            const error = await response.text();
            console.error('WhatsApp media API error:', error);
          }
        } else if (message) {
          // Send text message
          const response = await fetch(`${apiBaseUrl}/${vendorUid}/contact/send-message?token=${apiToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone_number: cleanPhone,
              message_body: message
            })
          });
          
          if (!response.ok) {
            const error = await response.text();
            console.error('WhatsApp text API error:', error);
          }
        }
      } catch (error) {
        console.error('WhatsApp API error:', error);
      }
      
      return { success: true };

    },

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['all-messages'] });
      
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });

      queryClient.invalidateQueries({ queryKey: ['chat-contacts'] });

    },

  });

}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (messageId: string) => {
      console.log('Deleting message:', messageId);
      
      // Direct database delete via postgres-api with proper action
      try {
        const result = await callApi('delete-message', { messageId });
        console.log('Delete result:', result);
        return { success: true };
      } catch (error) {
        // If delete-message action not available, try alternative
        console.error('Delete via API failed, trying alternative:', error);
        
        // Alternative: Mark as deleted by updating content
        await callApi('update-message', { 
          messageId, 
          content: '[Deleted]',
          image_url: null 
        });
        
        return { success: true };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-messages'] });
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    },
    onError: (error) => {
      console.error('Delete error:', error);
    }
  });
}



export function useWhatsAppContacts() {

  return useQuery({

    queryKey: ['whatsapp-contacts'],

    queryFn: () => callWhatsAppApi<{ success: boolean; data: any }>('get-contacts'),

    staleTime: 30_000,

    refetchInterval: 30_000,

  });

}



export function useWhatsAppMessages(contactUid?: string) {

  return useQuery({

    queryKey: ['whatsapp-messages', contactUid],

    queryFn: () => callWhatsAppApi<{ success: boolean; data: any }>('get-messages', { contact_uid: contactUid }),

    staleTime: 10_000,

    refetchInterval: 10_000,

    enabled: !!contactUid,

  });

}
