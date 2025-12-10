"use client";

import {
  contentAPI,
  dashboardAPI,
  meetingAPI,
  notificationAPI,
  ticketAPI,
} from "@/app/services";
import type {
  ContentListItem,
  DashboardMetrics,
  MeetingListItem,
  Notification,
  TicketListItem,
} from "@/app/services/types";
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Loader,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const defaultMetrics: DashboardMetrics = {
    active_clients: 0,
    pending_tickets: 0,
    upcoming_meetings: 0,
    system_notifications: 0,
    portal_logins: 0,
    ai_chat_sessions: 0,
    escalation_rate: 0,
  };

  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pendingTickets, setPendingTickets] = useState<TicketListItem[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<MeetingListItem[]>([]);
  const [recentContent, setRecentContent] = useState<ContentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all dashboard data in parallel
        const [metricsData, notificationsData, ticketsData, meetingsData, contentData] =
          await Promise.all([
            dashboardAPI.getOverview().catch(() => null),
            notificationAPI
              .listNotifications({ is_read: false })
              .catch(() => ({ results: [] })),
            ticketAPI
              .listTickets({ status: "new" })
              .catch(() => ({ results: [] })),
            meetingAPI.getUpcomingMeetings().catch(() => ({ results: [] })),
            contentAPI.listContent({ limit: 5 }).catch(() => ({ results: [] })),
          ]);

        // Type-safe data extraction
        setMetrics(
          metricsData && typeof metricsData === "object" && "active_clients" in metricsData
            ? (metricsData as DashboardMetrics)
            : defaultMetrics
        );

        const extractArray = (data: any): any[] => {
          if (Array.isArray(data)) return data;
          if (data && typeof data === "object" && "results" in data && Array.isArray(data.results))
            return data.results;
          return [];
        };

        setNotifications(extractArray(notificationsData) as Notification[]);
        setPendingTickets(extractArray(ticketsData) as TicketListItem[]);
        setUpcomingMeetings(extractArray(meetingsData) as MeetingListItem[]);
        setRecentContent(extractArray(contentData) as ContentListItem[]);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load some dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 flex flex-col gap-6 md:gap-8 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 text-xs md:text-sm mt-2">
                Welcome back! Here's your overview
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={16} />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Key Metrics - Grid Pattern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Active Clients Card */}
              <div className="group relative bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-primary/30 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium">Active Clients</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-3xl font-bold text-white">
                        {metrics.active_clients}
                      </p>
                      <span className="text-primary text-xs">Portal active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Tickets Card */}
              <div className="group relative bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-xl p-6 border border-orange-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-orange-500/30 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AlertCircle className="w-7 h-7 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium">Pending Tickets</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-3xl font-bold text-white">
                        {metrics.pending_tickets}
                      </p>
                      <span className="text-orange-400 text-xs">Awaiting action</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Meetings Card */}
              <div className="group relative bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-6 border border-blue-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-blue-500/30 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium">Upcoming Meetings</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-3xl font-bold text-white">
                        {metrics.upcoming_meetings}
                      </p>
                      <span className="text-blue-400 text-xs">Next 7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Two Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* left Column - Meetings */}

            <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-xl border border-white/10 p-5 md:p-6 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <Calendar size={18} className="text-blue-400" />
                  </div>
                  Upcoming Meetings
                </h2>
                <span className="bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
                  {upcomingMeetings.length}
                </span>
              </div>

              {upcomingMeetings.length > 0 ? (
                <div className="space-y-2 max-h-[680px] overflow-y-auto">
                  {upcomingMeetings.slice(0, 10).map((meeting) => (
                    <div
                      key={meeting.id}
                      className="bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/5 transition-all duration-200 group/item"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white group-hover/item:text-blue-300 transition-colors">
                            {meeting.client_name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(
                              meeting.confirmed_datetime || meeting.requested_datetime
                            ).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {meeting.meeting_type} • {meeting.duration_minutes} min
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300 flex-shrink-0 font-medium">
                          {meeting.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-6">
                  No upcoming meetings
                </p>
              )}
            </div>
            {/* Left Column - Notifications & Tickets */}

            <div className="space-y-6">
              {/* Pending Notifications Widget */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-xl border border-white/10 p-5 md:p-6 hover:border-primary/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                      <Bell size={18} className="text-primary" />
                    </div>
                    Notifications
                  </h2>
                  <span className="bg-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    {notifications.length}
                  </span>
                </div>

                {notifications.length > 0 ? (
                  <div className="space-y-2 max-h-[320px] overflow-y-auto">
                    {notifications.slice(0, 5).map((notif, idx) => (
                      <div
                        key={notif.id}
                        className="bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/5 transition-all duration-200 flex items-start gap-3 group/item"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{notif.title}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-6">
                    No pending notifications
                  </p>
                )}
              </div>

              {/* Pending Tickets Widget */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-xl border border-white/10 p-5 md:p-6 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                      <AlertCircle size={18} className="text-orange-400" />
                    </div>
                    Support Tickets
                  </h2>
                  <span className="bg-orange-500/30 text-orange-300 px-3 py-1 rounded-full text-xs font-bold">
                    {pendingTickets.length}
                  </span>
                </div>

                {pendingTickets.length > 0 ? (
                  <div className="space-y-2 max-h-[320px] overflow-y-auto">
                    {pendingTickets.slice(0, 5).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/5 transition-all duration-200 group/item"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white group-hover/item:text-primary transition-colors">
                              {ticket.ticket_id}
                            </p>
                            <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                              {ticket.subject}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {ticket.client_name}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded font-medium flex-shrink-0 ${
                            ticket.priority === "urgent"
                              ? "bg-red-500/20 text-red-300"
                              : ticket.priority === "high"
                              ? "bg-orange-500/20 text-orange-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-6">
                    No pending tickets
                  </p>
                )}
              </div>
            </div>

            
          </div>

          {/* Recent Content & Quick Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Content Table - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 bg-gradient-to-br from-white/15 to-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300">
              <div className="p-5 md:p-6 border-b border-white/10 flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <FileText size={18} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-white">Recent Content</h2>
              </div>
              {recentContent.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="text-left p-4 text-primary font-semibold text-sm">Title</th>
                        <th className="text-left p-4 text-primary font-semibold text-sm hidden sm:table-cell">Type</th>
                        <th className="text-left p-4 text-primary font-semibold text-sm">Status</th>
                        <th className="text-left p-4 text-primary font-semibold text-sm hidden lg:table-cell">Views</th>
                        <th className="text-left p-4 text-primary font-semibold text-sm hidden md:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentContent.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors duration-200 group/row">
                          <td className="py-3 px-4">
                            <span className="text-white font-medium line-clamp-1 text-sm group-hover/row:text-primary transition-colors">
                              {item.title}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300 text-sm hidden sm:table-cell">
                            <span className="capitalize">{item.content_type}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`w-fit px-3 py-1 rounded-lg font-medium text-xs capitalize ${
                              item.status === "published"
                                ? "bg-primary/30 text-primary border border-primary/30"
                                : item.status === "draft"
                                ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/30"
                                : "bg-gray-500/30 text-gray-300 border border-gray-500/30"
                            }`}>
                              {item.status}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-300 text-sm hidden lg:table-cell">
                            {item.view_count}
                          </td>
                          <td className="py-3 px-4 text-gray-400 text-sm hidden md:table-cell">
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <FileText size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No recent content available</p>
                </div>
              )}
            </div>

            {/* Quick Actions Card - Takes 1 column on large screens */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-xl border border-white/10 p-5 md:p-6 hover:border-primary/30 transition-all duration-300 flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <CheckCircle size={18} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
              </div>

              <button
                onClick={() => router.push("/tickets")}
                className="group relative bg-gradient-primary text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 overflow-hidden text-sm hover:opacity-90"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CheckCircle size={18} />
                <span className="relative">View All Tickets</span>
              </button>

              <button
                onClick={() => router.push("/schedule-meetings")}
                className="group relative bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-white/10 hover:border-primary/30 overflow-hidden text-sm"
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Calendar size={18} />
                <span className="relative">Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
