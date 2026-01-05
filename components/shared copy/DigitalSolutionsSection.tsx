"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface DigitalSolutionsSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  imageAlt: string;
  whoIsThisFor: string[];
  features: string[];
}

export default function DigitalSolutionsSection({
  title,
  subtitle,
  description,
  imageAlt,
  whoIsThisFor,
  features
}: DigitalSolutionsSectionProps) {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

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

    if (leftColRef.current) observer.observe(leftColRef.current);
    if (rightColRef.current) observer.observe(rightColRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .slide-left {
          opacity: 0;
          transform: translateX(-30px);
        }
        
        .slide-right {
          opacity: 0;
          transform: translateX(30px);
        }
        
        .animate-title-bounce {
          animation: titleBounce 1s ease-out 0.3s forwards;
          opacity: 0;
          transform: translateY(-20px);
        }
        
        .animate-subtitle-glow {
          animation: subtitleGlow 1s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-description-fade {
          animation: descriptionFade 1s ease-out 0.7s forwards;
          opacity: 0;
        }
        
        .animate-section-title {
          animation: sectionTitle 0.8s ease-out 0.4s forwards;
          opacity: 0;
          transform: translateX(-20px);
        }
        
        .animate-list-item {
          animation: listItem 0.6s ease-out forwards;
          opacity: 0;
          transform: translateX(-15px);
        }
        
        .animate-feature-pop {
          animation: featurePop 0.5s ease-out forwards;
          opacity: 0;
          transform: scale(0.9);
        }
        
        @keyframes titleBounce {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes subtitleGlow {
          to {
            opacity: 1;
            text-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
          }
        }
        
        @keyframes descriptionFade {
          to {
            opacity: 1;
          }
        }
        
        @keyframes sectionTitle {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes listItem {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes featurePop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image and Who is this for */}
          <div ref={leftColRef} className="space-y-8 slide-left">
            {/* Image */}
            <div className="rounded-2xl h-80 flex items-center justify-center">
              <Image 
                src="/network-visualization.jpg"
                alt={imageAlt}
                className="w-full h-full object-cover rounded-2xl"
                width={800}
                height={600}
              />
            </div>
            {/* Who is this for? */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 animate-section-title">
                Who is <span className="text-primary">this for?</span>
              </h3>
              <ul className="space-y-3 text-slate-300">
                {whoIsThisFor.map((item, index) => (
                  <li key={index} className="flex items-start animate-list-item" style={{animationDelay: `${index * 0.1}s`}}>
                    <span className="text-primary mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Content and Features */}
          <div ref={rightColRef} className="space-y-8 slide-right">
            {/* Header */}
            <div className="py-18">
              <h2 className="text-4xl font-bold text-white mb-4 animate-title-bounce">
                {title}
              </h2>
              {subtitle && (
                <h2 className="text-4xl font-bold text-primary mb-6 animate-subtitle-glow">
                  {subtitle}
                </h2>
              )}
              <p className="text-slate-200 text-lg animate-description-fade">
                {description}
              </p>
            </div>

            {/* Features box */}
            <div className="border-2 border-primary rounded-2xl px-6 py-12 hover:scale-105 transition-transform duration-300">
              <ul className="space-y-3 text-slate-300 text-sm">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start animate-feature-pop" style={{animationDelay: `${index * 0.1}s`}}>
                    <span className="text-primary mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}