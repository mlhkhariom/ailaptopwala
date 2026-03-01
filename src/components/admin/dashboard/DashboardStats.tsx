import { useChats } from "@/hooks/useN8nData";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, Clock, TrendingUp, Users, Activity } from "lucide-react";
import { useMemo } from "react";

export function DashboardStats() {
  const { data: contacts = [] } = useChats();

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalConversations = contacts.length;
    const activeToday = contacts.filter(c => {
      const msgTime = new Date(c.time);
      return msgTime >= today;
    }).length;

    const totalUnread = contacts.reduce((sum, c) => sum + c.unread, 0);
    
    const avgResponseTime = "< 5 min"; // Placeholder

    return {
      totalConversations,
      activeToday,
      totalUnread,
      avgResponseTime,
    };
  }, [contacts]);

  const statCards = [
    {
      title: "Total Conversations",
      value: stats.totalConversations,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Today",
      value: stats.activeToday,
      icon: Activity,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Unread Messages",
      value: stats.totalUnread,
      icon: Send,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Avg Response Time",
      value: stats.avgResponseTime,
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="p-4 md:p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">
                {stat.title}
              </p>
              <p className="text-2xl md:text-3xl font-bold mt-2">
                {stat.value}
              </p>
            </div>
            <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
