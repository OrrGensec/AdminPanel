export default function HowWeWorkSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          How we work:
        </h2>
        <h3 className="text-3xl font-bold text-[#47ff4c]">
          Listen . Solve . Optimize
        </h3>
        <p className="text-slate-200 text-lg mt-6 max-w-3xl mx-auto">
          Just like your Business GP, we follow a systematic diagnostic and treatment 
          approach to restore operational health.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-card rounded-2xl p-8 space-y-8">
        {/* Listen (Assess) */}
        <div className="bg-slate-700/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Listen (Assess)
          </h3>
          
          <p className="text-slate-300 text-center leading-relaxed">
            We start by listening — understanding your current systems, pain points, and goals. Through interviews, process observation, and data 
            review, we diagnose what's working and what's not. Every business has its own operational 'symptoms,' and we take time to understand the 
            root causes.
          </p>
        </div>

        <hr className="border-[#0ec277]" />

        {/* Solve (Design & Implement) */}
        <div className="bg-slate-700/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Solve (Design & Implement)
          </h3>
          
          <p className="text-slate-300 text-center leading-relaxed">
            Based on our assessment, we prescribe tailored solutions — whether that's new SOPs, communication frameworks, or complete office 
            infrastructure. Every solution is built for your specific context. Then we execute it, working alongside your team (and leveraging our trusted 
            network of specialists when needed) to implement systems that work from day one.
          </p>
        </div>

        <hr className="border-[#0ec277]" />

        {/* Optimize (Refine & Evolve) */}
        <div className="bg-slate-700/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Optimize (Refine & Evolve)
          </h3>
          
          <p className="text-slate-300 text-center leading-relaxed">
            Systems need to evolve with your business. We provide ongoing support, training, and refinement to ensure your operational 
            infrastructure continues to serve your growing organization. Like regular check-ups with your GP, we monitor performance and 
            adjust as needed.
          </p>
        </div>
      </div>
    </section>
  )
}