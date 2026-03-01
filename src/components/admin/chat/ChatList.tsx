import { useState, useMemo } from "react";
import { Search, Loader2, RefreshCw, MessageCircle, MessageSquare, Phone, Filter, Calendar, Mail, X, ArrowUpDown, ArrowDown, ArrowUp, MessageSquarePlus, Download, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChats, type ChatContact } from "@/hooks/useN8nData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewMessageDialog } from "./NewMessageDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface ChatListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

type DateFilter = 'all' | 'today' | 'week' | 'month' | 'custom';
type UnreadFilter = 'all' | 'unread' | 'read';
type SortOption = 'date-desc' | 'date-asc' | 'unread' | 'name-asc' | 'name-desc';

export function ChatList({ selectedId, onSelect }: ChatListProps) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [unreadFilter, setUnreadFilter] = useState<UnreadFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [customDateFrom, setCustomDateFrom] = useState<Date | undefined>();
  const [customDateTo, setCustomDateTo] = useState<Date | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  
  const { data: contacts = [], isLoading, error, refetch } = useChats();

  const hasActiveFilters = dateFilter !== 'all' || unreadFilter !== 'all';

  const toggleSelection = (contactId: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const selectAll = () => {
    setSelectedContacts(new Set(filteredAndSortedContacts.map(c => c.id)));
  };

  const clearSelection = () => {
    setSelectedContacts(new Set());
    setSelectionMode(false);
  };

  const exportToCSV = () => {
    if (selectedContacts.size === 0) {
      toast.error('Please select contacts to export');
      return;
    }

    const selectedData = contacts.filter(c => selectedContacts.has(c.id));
    
    // CSV header - Only Name and Phone Number
    const csvContent = [
      ['Name', 'Phone Number'].join(','),
      ...selectedData.map(c => [
        `"${c.name || ''}"`,
        c.phoneNumber || ''
      ].join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Exported ${selectedContacts.size} contacts`);
    clearSelection();
  };

  const makeCall = (phoneNumber: string) => {
    // Extract 10 digit number
    let cleanNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    if (cleanNumber.startsWith('91') && cleanNumber.length > 10) {
      cleanNumber = cleanNumber.slice(2); // Remove country code
    }
    cleanNumber = cleanNumber.slice(-10); // Get last 10 digits
    
    if (cleanNumber.length === 10) {
      window.location.href = `tel:${cleanNumber}`;
      toast.success(`Calling ${cleanNumber}...`);
    } else {
      toast.error('Invalid phone number');
    }
  };

  // Helper to parse relative time to sortable value
  const parseTimeToMs = (time: string): number => {
    if (!time) return 0;
    if (time === 'Just now') return Date.now();
    
    const match = time.match(/(\d+)([mhd])\s*ago/);
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];
      const now = Date.now();
      if (unit === 'm') return now - value * 60 * 1000;
      if (unit === 'h') return now - value * 60 * 60 * 1000;
      if (unit === 'd') return now - value * 24 * 60 * 60 * 1000;
    }
    
    // Try parsing as date
    const parsed = Date.parse(time);
    return isNaN(parsed) ? 0 : parsed;
  };

  const filteredAndSortedContacts = useMemo(() => {
    // First filter
    const filtered = contacts.filter(c => {
      // Text search
      const name = c.name || '';
      const lastMessage = c.lastMessage || '';
      const phone = c.phoneNumber || '';
      const searchLower = search.toLowerCase();
      const matchesSearch = name.toLowerCase().includes(searchLower) ||
        lastMessage.toLowerCase().includes(searchLower) ||
        phone.includes(search);
      
      if (!matchesSearch) return false;

      // Unread filter
      if (unreadFilter === 'unread' && c.unread === 0) return false;
      if (unreadFilter === 'read' && c.unread > 0) return false;

      // Date filter - parse the time string to check date
      if (dateFilter !== 'all' && c.time) {
        const contactTime = c.time;
        
        // Simple time parsing from relative time
        if (dateFilter === 'today') {
          if (!contactTime.includes('m ago') && !contactTime.includes('h ago') && contactTime !== 'Just now') {
            return false;
          }
        } else if (dateFilter === 'week') {
          if (contactTime.includes('d ago')) {
            const days = parseInt(contactTime);
            if (days > 7) return false;
          }
        } else if (dateFilter === 'month') {
          if (contactTime.includes('d ago')) {
            const days = parseInt(contactTime);
            if (days > 30) return false;
          }
        }
      }

      return true;
    });

    // Then sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return parseTimeToMs(b.time) - parseTimeToMs(a.time);
        case 'date-asc':
          return parseTimeToMs(a.time) - parseTimeToMs(b.time);
        case 'unread':
          return b.unread - a.unread;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [contacts, search, unreadFilter, dateFilter, sortBy]);

  const clearFilters = () => {
    setDateFilter('all');
    setUnreadFilter('all');
    setSortBy('date-desc');
    setCustomDateFrom(undefined);
    setCustomDateTo(undefined);
  };

  const getSortLabel = (sort: SortOption): string => {
    switch (sort) {
      case 'date-desc': return 'Newest First';
      case 'date-asc': return 'Oldest First';
      case 'unread': return 'Most Unread';
      case 'name-asc': return 'Name A-Z';
      case 'name-desc': return 'Name Z-A';
    }
  };

  return (
    <div className="w-96 h-full border-r border-border/50 flex flex-col bg-card/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-border/50 bg-card/30">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-base md:text-lg truncate">Conversations</h2>
              <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                {filteredAndSortedContacts.length} of {contacts.length} chats
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 md:gap-1 shrink-0">
            {selectionMode ? (
              <>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={selectAll}
                  className="h-8 px-3 text-xs"
                >
                  All
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={exportToCSV}
                  disabled={selectedContacts.size === 0}
                  className="h-8 px-3 text-xs gap-1"
                >
                  <Download className="w-3 h-3" />
                  Export ({selectedContacts.size})
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={clearSelection}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectionMode(true)}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-xl"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Button>
                <NewMessageDialog />
                <Button 
                  variant={showFilters ? "secondary" : "ghost"}
                  size="icon" 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "h-8 w-8 md:h-9 md:w-9 rounded-xl relative",
                    hasActiveFilters && "text-primary"
                  )}
                >
                  <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {hasActiveFilters && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => refetch()} 
                  disabled={isLoading}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-xl hover:bg-secondary/50"
                >
                  <RefreshCw className={cn("w-3.5 h-3.5 md:w-4 md:h-4", isLoading && "animate-spin")} />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Search */}
        <div className="relative px-4 md:px-5 pb-3 md:pb-4">
          <Search className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 md:pl-10 bg-secondary/30 border-border/50 h-9 md:h-11 rounded-xl focus:ring-2 focus:ring-primary/30 text-sm"
          />
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-3 bg-secondary/20 rounded-xl border border-border/30 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Filters</span>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Date Filter */}
            <div className="mb-3">
              <label className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Date Range
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={dateFilter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateFilter(option.value as DateFilter)}
                    className={cn(
                      "h-7 px-2.5 text-xs rounded-lg",
                      dateFilter === option.value 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary/50 border-border/50"
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Unread Filter */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                Status
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'unread', label: 'Unread' },
                  { value: 'read', label: 'Read' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={unreadFilter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUnreadFilter(option.value as UnreadFilter)}
                    className={cn(
                      "h-7 px-2.5 text-xs rounded-lg",
                      unreadFilter === option.value 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary/50 border-border/50"
                    )}
                  >
                    {option.label}
                    {option.value === 'unread' && (
                      <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px] bg-primary/20 text-primary">
                        {contacts.filter(c => c.unread > 0).length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="pt-3 border-t border-border/30">
              <label className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                <ArrowUpDown className="w-3 h-3" />
                Sort By
              </label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="h-8 text-xs bg-secondary/50 border-border/50 rounded-lg">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">
                    <span className="flex items-center gap-2">
                      <ArrowDown className="w-3 h-3" />
                      Newest First
                    </span>
                  </SelectItem>
                  <SelectItem value="date-asc">
                    <span className="flex items-center gap-2">
                      <ArrowUp className="w-3 h-3" />
                      Oldest First
                    </span>
                  </SelectItem>
                  <SelectItem value="unread">
                    <span className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      Most Unread
                    </span>
                  </SelectItem>
                  <SelectItem value="name-asc">
                    <span className="flex items-center gap-2">
                      <ArrowUp className="w-3 h-3" />
                      Name A-Z
                    </span>
                  </SelectItem>
                  <SelectItem value="name-desc">
                    <span className="flex items-center gap-2">
                      <ArrowDown className="w-3 h-3" />
                      Name Z-A
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {hasActiveFilters && !showFilters && (
          <div className="mt-3 flex flex-wrap gap-1.5 animate-fade-in">
            {dateFilter !== 'all' && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {dateFilter === 'today' ? 'Today' : dateFilter === 'week' ? 'This Week' : 'This Month'}
                <button 
                  onClick={() => setDateFilter('all')}
                  className="ml-1.5 hover:text-primary-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {unreadFilter !== 'all' && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 text-xs">
                <Mail className="w-3 h-3 mr-1" />
                {unreadFilter === 'unread' ? 'Unread' : 'Read'}
                <button 
                  onClick={() => setUnreadFilter('all')}
                  className="ml-1.5 hover:text-primary-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Loader2 className="w-7 h-7 animate-spin text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Loading conversations...</span>
          </div>
        )}

        {error && (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-destructive" />
            </div>
            <p className="text-sm text-destructive font-medium mb-2">Failed to load chats</p>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="rounded-lg">
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && filteredAndSortedContacts.length === 0 && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-medium text-sm mb-1">
              {contacts.length === 0 
                ? "No conversations yet"
                : hasActiveFilters
                  ? "No matches for filters"
                  : "No matches found"}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {contacts.length === 0 
                ? "New chats will appear here"
                : hasActiveFilters
                  ? "Try adjusting your filters"
                  : "Try a different search term"}
            </p>
            {hasActiveFilters && (
              <Button 
                variant="link" 
                size="sm" 
                onClick={clearFilters}
                className="mt-2 text-primary"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}

        <div className="py-2">
          {filteredAndSortedContacts.map((contact, i) => {
            const isSelected = selectedId === contact.id;
            const isChecked = selectedContacts.has(contact.id);
            const initials = contact.name.slice(0, 2).toUpperCase();
            
            return (
              <div
                key={contact.id}
                className={cn(
                  "w-full px-4 py-3.5 flex items-start gap-3.5 transition-all animate-fade-in relative",
                  "hover:bg-secondary/40",
                  isSelected && "bg-primary/10 hover:bg-primary/15"
                )}
                style={{ animationDelay: `${i * 20}ms` }}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-primary rounded-r-full" />
                )}

                {/* Checkbox for selection mode */}
                {selectionMode && (
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleSelection(contact.id)}
                    className="mt-3"
                  />
                )}

                {/* Avatar */}
                <button
                  onClick={() => !selectionMode && onSelect(contact.id)}
                  className="relative shrink-0"
                  disabled={selectionMode}
                >
                  <Avatar className={cn(
                    "h-12 w-12 border-2 transition-colors",
                    isSelected ? "border-primary/50" : "border-transparent"
                  )}>
                    <AvatarFallback className={cn(
                      "text-sm font-semibold transition-colors",
                      isSelected 
                        ? "bg-gradient-to-br from-primary/30 to-accent/30 text-primary" 
                        : "bg-secondary text-muted-foreground"
                    )}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" />
                  )}
                </button>

                {/* Content */}
                <button
                  onClick={() => !selectionMode && onSelect(contact.id)}
                  className="flex-1 min-w-0 text-left"
                  disabled={selectionMode}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "font-semibold text-sm truncate",
                      isSelected && "text-primary"
                    )}>
                      {contact.name}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">{contact.time}</span>
                  </div>
                  
                  {contact.phoneNumber && (
                    <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mb-1">
                      <Phone className="w-3 h-3" />
                      {contact.phoneNumber}
                    </p>
                  )}
                  
                  <p className={cn(
                    "text-sm truncate",
                    contact.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {contact.lastMessage || "No messages yet"}
                  </p>
                  
                  {/* Unread Badge */}
                  {contact.unread > 0 && (
                    <Badge variant="default" className="shrink-0 h-5 min-w-5 rounded-full px-1.5 text-xs font-bold bg-primary">
                      {contact.unread > 9 ? '9+' : contact.unread}
                    </Badge>
                  )}
                </button>

                {/* Call Button */}
                {contact.phoneNumber && !selectionMode && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      makeCall(contact.phoneNumber);
                    }}
                    className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary shrink-0"
                    title="Call"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}