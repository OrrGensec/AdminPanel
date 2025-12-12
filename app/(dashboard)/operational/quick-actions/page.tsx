"use client";

import { Zap, UserPlus, FileText, Calendar, Mail, Bell } from "lucide-react";

export default function QuickActionsPage() {
  const quickActions = [
    { icon: UserPlus, label: "Add New Client", href: "/client-management", color: "bg-blue-500" },
    { icon: FileText, label: "Create Content", href: "/content-management/new", color: "bg-green-500" },
    { icon: Calendar, label: "Schedule Meeting", href: "/schedule-meetings", color: "bg-purple-500" },
    { icon: Mail, label: "Send Message", href: "/tickets/client-messages", color: "bg-orange-500" },
    { icon: Bell, label: "Create Announcement", href: "/operational/system-notifications", color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Quick Actions</h1>
            <p className="text-gray-400">Perform common tasks quickly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => window.location.href = action.href}
                  className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className={`${action.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{action.label}</h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
