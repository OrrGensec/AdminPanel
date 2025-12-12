"use client";

import { FileStack, FileText } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Templates</h1>
            <p className="text-gray-400">Reports, Contracts, and Data Structures templates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
              <FileText size={32} className="text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Report Templates</h3>
              <p className="text-gray-400 text-sm">Standardized report formats</p>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
              <FileText size={32} className="text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Contract Templates</h3>
              <p className="text-gray-400 text-sm">Legal document templates</p>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
              <FileStack size={32} className="text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Data Structure Templates</h3>
              <p className="text-gray-400 text-sm">DS templates for clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
