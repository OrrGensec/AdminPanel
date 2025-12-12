"use client";

import { FileBarChart, CheckCircle, Clock } from "lucide-react";

export default function ConsultationReportsPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Consultation Reports</h1>
            <p className="text-gray-400">Drafts and approved reports</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
              <Clock size={32} className="text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Draft Reports</h3>
              <p className="text-gray-400 text-sm mb-4">Reports in progress</p>
              <div className="text-3xl font-bold text-white">12</div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
              <CheckCircle size={32} className="text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Approved Reports</h3>
              <p className="text-gray-400 text-sm mb-4">Finalized reports</p>
              <div className="text-3xl font-bold text-white">45</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
