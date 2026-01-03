"use client";
import { useEffect, useRef } from "react";
import NetworkCard from "../strategy_advisory/NetworkCard";

interface NetworkCard {
  title: string;
  description: string;
  icon: string;
}

interface NetworkAdvantageSectionProps {
  title?: string;
  description: string;
  networkCards: NetworkCard[];
  layout?: 'grid' | 'flex';
}

export default function NetworkAdvantageSection({ 
  title = "The ORR Network Advantage", 
  description, 
  networkCards, 
  layout = 'flex' 
}: NetworkAdvantageSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.7s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide-animate {
          opacity: 0;
          transform: translateY(30px);
        }
      `}</style>
      <div ref={headerRef} className="text-center mb-16 slide-animate">
        <h2 className="text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-slate-200 text-lg max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div ref={cardsRef} className="max-w-6xl mx-auto slide-animate">
        {layout === 'grid' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {networkCards.slice(0, 3).map((card, index) => (
                <NetworkCard key={index} {...card} />
              ))}
            </div>
            {networkCards.length > 3 && (
              <div className="flex justify-center">
                <NetworkCard {...networkCards[3]} />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {networkCards.map((card, index) => (
              <NetworkCard key={index} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}