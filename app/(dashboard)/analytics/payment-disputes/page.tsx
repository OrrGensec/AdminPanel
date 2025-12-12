"use client";

import { AlertTriangle, XCircle, MessageSquare } from "lucide-react";

export default function PaymentDisputesPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Payment Disputes</h1>
            <p className="text-gray-400">Handle payment disputes and chargebacks</p>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Payment Disputes</h3>
            <p className="text-gray-400">Manage payment disputes, chargebacks, and resolution processes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
