"use client";

import { DollarSign, CreditCard, TrendingUp, Users } from "lucide-react";

export default function BillingCreditOverviewPage() {
  const stats = [
    { label: "Total Revenue", value: "€45,230", icon: DollarSign, color: "text-green-400" },
    { label: "Active Subscriptions", value: "127", icon: Users, color: "text-blue-400" },
    { label: "Pending Payments", value: "€3,450", icon: CreditCard, color: "text-orange-400" },
    { label: "Growth Rate", value: "+12.5%", icon: TrendingUp, color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Billing & Credit Overview</h1>
            <p className="text-gray-400">Financial summary and credit status</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`${stat.color} w-8 h-8`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
            <p className="text-gray-400">Transaction history will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
