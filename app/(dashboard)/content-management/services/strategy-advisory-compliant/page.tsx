"use client";
import { useEffect, useRef, useState } from "react";
import WhatWeOfferSection from "@/components/shared/WhatWeOfferSection";
import HowWeWorkSection from "@/components/shared/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/shared/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/shared/DigitalSolutionsSection";
import CaseExampleSection from "@/components/shared/CaseExampleSection";
import EditableText from "@/components/EditableText";

interface StrategicAdvisoryContent {
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
  network_title: string;
  network_description: string;
  network_card_1_title: string;
  network_card_1_description: string;
  network_card_2_title: string;
  network_card_2_description: string;
  network_card_3_title: string;
  network_card_3_description: string;
  network_card_4_title: string;
  network_card_4_description: string;
  network_card_5_title: string;
  network_card_5_description: string;
  digital_title: string;
  digital_subtitle: string;
  digital_description: string;
  digital_who_1: string;
  digital_who_2: string;
  digital_who_3: string;
  digital_feature_1: string;
  digital_feature_2: string;
  digital_feature_3: string;
  case_challenge: string;
  case_solution: string;
  case_result: string;
  case_image_alt: string;
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
}

export default function StrategyAdvisoryPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [content, setContent] = useState<StrategicAdvisoryContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://orr-backend-web-latest.onrender.com/admin-portal/v1/cms/strategic-advisory/');
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

  const updateContent = async (field: string, value: string) => {
    try {
      const response = await fetch('https://orr-backend-web-latest.onrender.com/admin-portal/v1/cms/strategic-advisory/', {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">No content available</div>
      </div>
    );
  }

  const offers = [
    {
      title: content.service_1_title,
      description: content.service_1_description,
      icon: "M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
    },
    {
      title: content.service_2_title,
      description: content.service_2_description,
      icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
    },
    {
      title: content.service_3_title,
      description: content.service_3_description,
      icon: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"
    }
  ];

  const howWeWorkData = {
    subtitle: content.process_title,
    description: content.process_description,
    sections: [
      {
        title: content.process_step_1_title || "Step 1",
        content: [content.process_step_1]
      },
      {
        title: content.process_step_2_title || "Step 2",
        content: [content.process_step_2]
      },
      {
        title: content.process_step_3_title || "Step 3",
        content: [content.process_step_3]
      }
    ]
  };

  const networkAdvantageData = {
    title: content.network_title,
    description: content.network_description,
    networkCards: [
      {
        title: content.network_card_1_title,
        description: content.network_card_1_description,
        icon: "M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
      },
      {
        title: content.network_card_2_title,
        description: content.network_card_2_description,
        icon: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"
      },
      {
        title: content.network_card_3_title,
        description: content.network_card_3_description,
        icon: "M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"
      },
      {
        title: content.network_card_4_title,
        description: content.network_card_4_description,
        icon: "M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M15.5 16L11 11.5L12.5 10L15.5 13L20.5 8L22 9.5L15.5 16Z"
      },
      {
        title: content.network_card_5_title,
        description: content.network_card_5_description,
        icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
      }
    ]
  };

  const digitalSolutionsData = {
    title: content.digital_title,
    subtitle: content.digital_subtitle,
    description: content.digital_description,
    imageAlt: "Network visualization showing connected nodes and data flows",
    whoIsThisFor: [
      content.digital_who_1 || "Organizations seeking strategic guidance",
      content.digital_who_2 || "Companies planning digital transformation",
      content.digital_who_3 || "Businesses needing compliance solutions"
    ],
    features: [
      content.digital_feature_1 || "Strategic planning and advisory",
      content.digital_feature_2 || "Digital transformation roadmaps",
      content.digital_feature_3 || "Compliance and risk management"
    ]
  };

  const caseExampleData = {
    challenge: content.case_challenge,
    solution: content.case_solution,
    result: content.case_result,
    imageAlt: content.case_image_alt
  };

  const updateOffer = async (index: number, field: string, value: string) => {
    const fieldMap = {
      0: { title: 'service_1_title', description: 'service_1_description' },
      1: { title: 'service_2_title', description: 'service_2_description' },
      2: { title: 'service_3_title', description: 'service_3_description' }
    };
    const backendField = fieldMap[index as keyof typeof fieldMap]?.[field as keyof typeof fieldMap[0]];
    if (backendField) {
      await updateContent(backendField, value);
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

  const updateNetworkAdvantage = async (updatedData: any) => {
    if (updatedData.title) await updateContent('network_title', updatedData.title);
    if (updatedData.description) await updateContent('network_description', updatedData.description);
    if (updatedData.networkCards) {
      for (let index = 0; index < updatedData.networkCards.length; index++) {
        const card = updatedData.networkCards[index];
        if (card.title) await updateContent(`network_card_${index + 1}_title`, card.title);
        if (card.description) await updateContent(`network_card_${index + 1}_description`, card.description);
      }
    }
  };

  const updateDigitalSolutions = async (updatedData: any) => {
    if (updatedData.title) await updateContent('digital_title', updatedData.title);
    if (updatedData.subtitle) await updateContent('digital_subtitle', updatedData.subtitle);
    if (updatedData.description) await updateContent('digital_description', updatedData.description);
    if (updatedData.whoIsThisFor) {
      for (let i = 0; i < updatedData.whoIsThisFor.length; i++) {
        await updateContent(`digital_who_${i + 1}`, updatedData.whoIsThisFor[i]);
      }
    }
    if (updatedData.features) {
      for (let i = 0; i < updatedData.features.length; i++) {
        await updateContent(`digital_feature_${i + 1}`, updatedData.features[i]);
      }
    }
  };

  const updateCaseExample = async (updatedData: any) => {
    if (updatedData.challenge) await updateContent('case_challenge', updatedData.challenge);
    if (updatedData.solution) await updateContent('case_solution', updatedData.solution);
    if (updatedData.result) await updateContent('case_result', updatedData.result);
    if (updatedData.imageAlt) await updateContent('case_image_alt', updatedData.imageAlt);
  };

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
                onSave={(content) => updateContent('hero_title', content)}
                className="text-[#47ff4c]"
                tag="span"
              /><br />
           
            </h1>
        
            <div className="space-y-4 max-w-4xl">
              <EditableText
                content={content.hero_subtitle}
                onSave={(content) => updateContent('hero_subtitle', content)}
                className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed"
                tag="p"
              />

              <EditableText
                content={content.hero_description}
                onSave={(content) => updateContent('hero_description', content)}
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
          offers={offers} 
          onUpdateOffer={updateOffer}
          onUpdateTitle={(title) => updateContent('services_title', title)}
        />
      </div>
      <div ref={el => { sectionsRef.current[2] = el; }} className="section-animate">
        <HowWeWorkSection
          subtitle={howWeWorkData.subtitle}
          description={howWeWorkData.description}
          sections={howWeWorkData.sections}
          layout="single"
          onUpdate={updateHowWeWork}
        />
      </div>
      {/* <div ref={el => { sectionsRef.current[3] = el; }} className="section-animate">
        <NetworkAdvantageSection
          title={networkAdvantageData.title}
          description={networkAdvantageData.description}
          networkCards={networkAdvantageData.networkCards}
          onUpdate={updateNetworkAdvantage}
        />
      </div> */}
      <div ref={el => { sectionsRef.current[4] = el; }} className="section-animate">
        <DigitalSolutionsSection
          title={digitalSolutionsData.title}
          subtitle={digitalSolutionsData.subtitle}
          description={digitalSolutionsData.description}
          imageAlt={digitalSolutionsData.imageAlt}
          whoIsThisFor={digitalSolutionsData.whoIsThisFor}
          features={digitalSolutionsData.features}
          onUpdate={updateDigitalSolutions}
        />
      </div>
      <div ref={el => { sectionsRef.current[5] = el; }} className="section-animate">
        <CaseExampleSection
          caseExample={{
            challenge: caseExampleData.challenge,
            solution: caseExampleData.solution,
            result: caseExampleData.result
          }}
          imageAlt={caseExampleData.imageAlt}
          onUpdate={updateCaseExample}
        />
      </div>
      <div ref={el => { sectionsRef.current[6] = el; }} className="section-animate">
        <section className="relative z-10 py-24 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
            <EditableText
              content={content.cta_title}
              onSave={(content) => updateContent('cta_title', content)}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
              tag="h2"
            />
            <EditableText
              content={content.cta_description}
              onSave={(content) => updateContent('cta_description', content)}
              className="text-slate-200 text-lg mb-12 max-w-3xl mx-auto"
              tag="p"
              multiline
            />
            <button className="bg-gradient-to-r from-[#47ff4c] to-[#0ec277] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#47ff4c]/25 transition-all duration-300 inline-block">
              <EditableText
                content={content.cta_button_text}
                onSave={(content) => updateContent('cta_button_text', content)}
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