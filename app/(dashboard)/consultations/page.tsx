"use client";

import { Calendar, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function ConsultationsPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">All Consultations</h1>
            <p className="text-gray-400">Manage consultation sessions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/consultations/past" className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all">
              <Calendar size={32} className="text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Past Consultation Meetings</h3>
              <p className="text-gray-400 text-sm">View completed consultation sessions</p>
            </Link>

            <Link href="/consultations/scheduled" className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all">
              <Calendar size={32} className="text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Scheduled Consultation Meetings</h3>
              <p className="text-gray-400 text-sm">Upcoming consultation sessions</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
