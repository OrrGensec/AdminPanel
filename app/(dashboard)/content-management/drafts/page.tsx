"use client";

import { FilePen, Edit } from "lucide-react";

export default function ContentDraftsPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden star">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Content Drafts</h1>
            <p className="text-gray-400">Work in progress content</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <FilePen size={48} className="mx-auto text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Draft Content</h3>
            <p className="text-gray-400">Unpublished content drafts will be listed here for review and editing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
