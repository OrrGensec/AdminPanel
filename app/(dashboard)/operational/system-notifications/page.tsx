"use client";

import { Bell, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function SystemNotificationsPage() {
  const [notifications] = useState([
    { id: 1, type: "info", title: "System Update", message: "New features available", time: "2 hours ago" },
    { id: 2, type: "warning", title: "Maintenance Scheduled", message: "System maintenance on Dec 15", time: "5 hours ago" },
    { id: 3, type: "success", title: "Backup Complete", message: "Daily backup completed successfully", time: "1 day ago" },
    { id: 4, type: "error", title: "Failed Payment", message: "Payment failed for client #1234", time: "2 days ago" },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "info": return <Info className="text-blue-400" />;
      case "warning": return <AlertCircle className="text-orange-400" />;
      case "success": return <CheckCircle className="text-green-400" />;
      case "error": return <XCircle className="text-red-400" />;
      default: return <Bell className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">System Notifications</h1>
            <p className="text-gray-400">Important system alerts and updates</p>
          </div>

          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{notif.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{notif.message}</p>
                    <span className="text-xs text-gray-500">{notif.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
