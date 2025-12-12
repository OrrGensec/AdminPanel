"use client";

import { AlertCircle, TrendingUp } from "lucide-react";

export default function EscalationsPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Escalations</h1>
            <p className="text-gray-400">High-priority issues requiring immediate attention</p>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Escalated Issues</h3>
            <p className="text-gray-400">Critical tickets and escalated support issues will be tracked here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
