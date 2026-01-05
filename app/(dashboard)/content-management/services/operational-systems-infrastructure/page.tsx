"use client";
import { useEffect, useRef, useState } from "react";
import WhatWeOfferSection from "@/components/shared/WhatWeOfferSection";
import HowWeWorkSection from "@/components/shared/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/shared/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/shared/DigitalSolutionsSection";
import CaseExampleSection from "@/components/shared/CaseExampleSection";
import EditableText from "@/components/EditableText";

interface OperationalSystemsContent {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  services_title: string;
  service_1_title: string;
  service_1_description: string;
  service_2_title: string;
  service_2_description: string;
  service_3_title: string;
  service_3_description: string;
  process_title: string;
  process_description: string;
  process_step_1_title: string;
  process_step_1: string;
  process_step_2_title: string;
  process_step_2: string;
  process_step_3_title: string;
  process_step_3: string;
  case_challenge: string;
  case_solution: string;
  case_result: string;
  case_image_alt: string;
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
}

export default function OperationalSystemsPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [content, setContent] = useState<OperationalSystemsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://orr-backend-web-latest.onrender.com/admin-portal/v1/cms/operational-systems/');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateContent = async (field: string, value: string) => {
    try {
      const response = await fetch('https://orr-backend-web-latest.onrender.com/admin-portal/v1/cms/operational-systems/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });
      
      if (response.ok) {
        setContent(prev => prev ? { ...prev, [field]: value } : null);
      }
    } catch (err) {
      console.error('Failed to update content:', err);
    }
  };

  const updateOffer = (index: number, field: string, value: string) => {
    const fieldMap = {
      0: { title: 'service_1_title', description: 'service_1_description' },
      1: { title: 'service_2_title', description: 'service_2_description' },
      2: { title: 'service_3_title', description: 'service_3_description' }
    };
    const backendField = fieldMap[index as keyof typeof fieldMap]?.[field as keyof typeof fieldMap[0]];
    if (backendField) {
      updateContent(backendField, value);
    }
  };

  const updateHowWeWork = async (updatedData: any) => {
    if (updatedData.subtitle) await updateContent('process_title', updatedData.subtitle);
    if (updatedData.description) await updateContent('process_description', updatedData.description);
    if (updatedData.sections) {
      for (let index = 0; index < updatedData.sections.length; index++) {
        const section = updatedData.sections[index];
        if (section.title) {
          await updateContent(`process_step_${index + 1}_title`, section.title);
        }
        if (section.content?.[0]) {
          await updateContent(`process_step_${index + 1}`, section.content[0]);
        }
      }
    }
  };

  const updateCaseExample = async (updatedData: any) => {
    if (updatedData.challenge) await updateContent('case_challenge', updatedData.challenge);
    if (updatedData.solution) await updateContent('case_solution', updatedData.solution);
    if (updatedData.result) await updateContent('case_result', updatedData.result);
    if (updatedData.imageAlt) await updateContent('case_image_alt', updatedData.imageAlt);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 relative overflow-hidden bg-background z-10">
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .section-animate {
          opacity: 1;
          transform: translateY(0);
          position: relative;
          z-index: 10;
        }
      `}</style>
      <div ref={el => { sectionsRef.current[0] = el; }} className="section-animate">
        <header className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
          <div className="max-w-6xl space-y-6 sm:space-y-8">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <EditableText
                content={content.hero_title}
                onSave={(value) => updateContent('hero_title', value)}
                className="text-[#47ff4c]"
                tag="span"
              />
            </h1>

            <div className="space-y-4 max-w-4xl">
              <EditableText
                content={content.hero_subtitle}
                onSave={(value) => updateContent('hero_subtitle', value)}
                className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed"
                tag="p"
                multiline
              />

              <EditableText
                content={content.hero_description}
                onSave={(value) => updateContent('hero_description', value)}
                className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed"
                tag="p"
                multiline
              />
            </div>
          </div>
        </header>
      </div>
      <div ref={el => { sectionsRef.current[1] = el; }} className="section-animate">
        <WhatWeOfferSection 
          title={content.services_title}
          offers={[
            {
              title: content.service_1_title,
              description: content.service_1_description,
              icon: "M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17M2 12L12 17L22 12"
            },
            {
              title: content.service_2_title,
              description: content.service_2_description,
              icon: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H21ZM3 10V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H3Z"
            },
            {
              title: content.service_3_title,
              description: content.service_3_description,
              icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"
            }
          ]}
          onUpdateOffer={updateOffer}
          onUpdateTitle={(title) => updateContent('services_title', title)}
        />
      </div>
      <div ref={el => { sectionsRef.current[2] = el; }} className="section-animate">
        <HowWeWorkSection
          subtitle={content.process_title}
          description={content.process_description}
          sections={[
            {
              title: content.process_step_1_title || "Listen (Assess)",
              content: [content.process_step_1]
            },
            {
              title: content.process_step_2_title || "Solve (Design & Implement)",
              content: [content.process_step_2]
            },
            {
              title: content.process_step_3_title || "Optimize (Refine & Evolve)",
              content: [content.process_step_3]
            }
          ]}
          onUpdate={updateHowWeWork}
        />
      </div>
      <div ref={el => { sectionsRef.current[5] = el; }} className="section-animate">
        <CaseExampleSection
          caseExample={{
            challenge: content.case_challenge,
            solution: content.case_solution,
            result: content.case_result
          }}
          imageAlt={content.case_image_alt}
          onUpdate={updateCaseExample}
        />
      </div>
      <div ref={el => { sectionsRef.current[6] = el; }} className="section-animate">
        <section className="relative z-10 py-24 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
            <EditableText
              content={content.cta_title}
              onSave={(value) => updateContent('cta_title', value)}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
              tag="h2"
            />
            <EditableText
              content={content.cta_description}
              onSave={(value) => updateContent('cta_description', value)}
              className="text-slate-200 text-lg mb-12 max-w-3xl mx-auto"
              tag="p"
              multiline
            />
            <button className="bg-gradient-to-r from-[#47ff4c] to-[#0ec277] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#47ff4c]/25 transition-all duration-300 inline-block">
              <EditableText
                content={content.cta_button_text}
                onSave={(value) => updateContent('cta_button_text', value)}
                className=""
                tag="span"
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}