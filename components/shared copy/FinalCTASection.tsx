interface FinalCTASectionProps {
  title: string;
  highlightedTitle: string;
  description: string;
  buttonText: string;
}

export default function FinalCTASection({ title, highlightedTitle, description, buttonText }: FinalCTASectionProps) {
  return (
    <section className="relative z-10 py-24 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-[#47ff4c] mb-8">
          {highlightedTitle}
        </h2>
        <p className="text-slate-200 text-lg mb-12 max-w-2xl mx-auto">
          {description}
        </p>
        <button className="bg-gradient-to-r from-[#47ff4c] to-[#0ec277] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#47ff4c]/25 transition-all duration-300">
          {buttonText}
        </button>
      </div>
    </section>
  )
}