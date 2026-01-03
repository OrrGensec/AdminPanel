"use client"
import { useEffect, useRef, useState } from "react";
import EditableText from '../../../components/cms/EditableText';
import { CMSService } from '../../../../lib/cms-api';

interface ProcessStep {
  id: number;
  step_number: string;
  title: string;
  subtitle?: string;
  description?: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  bullet4?: string;
  bullet5?: string;
  bullet6?: string;
  bullet7?: string;
  bullet8?: string;
  bullet9?: string;
  wordbreak?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  image_url: string;
  button_text?: string;
  button_text2?: string;
  button_text3?: string;
  order: number;
  is_active: boolean;
}

interface HowWeOperateData {
  page: {
    id: number;
    hero_title: string;
    meta_title?: string;
    meta_description?: string;
    is_active: boolean;
  };
  steps: ProcessStep[];
}

export default function StickyScrollSplit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState<HowWeOperateData | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cmsService = new CMSService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching How We Operate data from backend...');
        const response = await cmsService.getHowWeOperatePage();
        console.log('✅ How We Operate API Response:', response);
        setData(response);
      } catch (error) {
        console.error('❌ Error fetching How We Operate data:', error);
        // Fallback to default data if API fails
        setData({
          page: {
            id: 1,
            hero_title: "How We Operate",
            is_active: true
          },
          steps: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !data?.steps) return;

      const sections = containerRef.current.querySelectorAll('.card-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index: number) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionBottom = sectionTop + htmlSection.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  const handleSave = async (field: string, value: string, stepIndex?: number) => {
    if (!data) return;
    
    try {
      if (stepIndex !== undefined) {
        // Update individual step data
        const step = data.steps[stepIndex];
        const updateData = { [field]: value };
        
        await cmsService.updateProcessStep(step.id, updateData);
        
        const updatedSteps = [...data.steps];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], [field]: value };
        setData({ ...data, steps: updatedSteps });
      } else {
        // Update page data
        const updateData = { page: { [field]: value } };
        
        await cmsService.updateHowWeOperatePage(updateData);
        setData({ ...data, page: { ...data.page, [field]: value } });
      }
      console.log('✅ Saved:', field, value);
    } catch (error) {
      console.error('❌ Error saving:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Error loading content</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-card rounded-lg p-4 shadow-lg">
          <h3 className="text-white font-semibold mb-3">Content Sections</h3>
          <div className="space-y-2">
            <a href="/content-management/how-we-operate" className="block text-[#33FF99] hover:text-white transition-colors text-sm">
              How We Operate
            </a>
            <div className="relative group">
              <a href="/content-management/services" className="block text-[#33FF99] hover:text-white transition-colors text-sm cursor-pointer">
                Services ▼
              </a>
              <div className="absolute left-0 top-6 bg-[#1a3a52] rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                <a href="/content-management/services/living-systems-regeneration" className="block text-gray-300 hover:text-[#33FF99] transition-colors text-xs py-1">
                  Living Systems Regeneration
                </a>
                <a href="/content-management/services/operational-systems-infrastructure" className="block text-gray-300 hover:text-[#33FF99] transition-colors text-xs py-1">
                  Operational Systems Infrastructure
                </a>
                <a href="/content-management/services/strategy-advisory-compliant" className="block text-gray-300 hover:text-[#33FF99] transition-colors text-xs py-1">
                  Strategy Advisory Compliant
                </a>
              </div>
            </div>
            <a href="/content-management/resources-blogs" className="block text-[#33FF99] hover:text-white transition-colors text-sm">
              Resources & Blogs
            </a>
            <a href="/content-management/legal-policy" className="block text-[#33FF99] hover:text-white transition-colors text-sm">
              Legal & Policy
            </a>
            <a href="/content-management/contact" className="block text-[#33FF99] hover:text-white transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative w-full py-20 pt-32 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          <EditableText
            content={data.page.hero_title}
            onSave={(newText) => handleSave('hero_title', newText)}
            tag="h1"
            className="text-center text-emerald-400 text-5xl md:text-6xl font-bold mb-12"
            placeholder="Enter title..."
          />
        </div>
      </div>

      {/* Split Layout Section */}
      <div ref={containerRef} className="relative  mt-90 lg:mt-0 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Stacking Cards */}
          <div>
            {data.steps.map((card, index) => (
              <div
                key={card.id}
                className="card-section"
                style={{
                  height: '100vh',
                  position: 'sticky',
                  top: `${24 + index * 2}px`,
                  zIndex: index + 1
                }}
              >
                <div
                  className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 w-full transition-all duration-700 ease-out"
                  style={{
                    transform: activeIndex === index
                      ? 'scale(1) rotateY(0deg)'
                      : activeIndex > index
                        ? `scale(${0.95 - (activeIndex - index) * 0.03}) rotateY(-2deg)`
                        : 'scale(0.98) rotateY(2deg)',
                    opacity: 1,
                    boxShadow: activeIndex === index
                      ? '0 25px 50px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.1)'
                      : '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      <EditableText
                        content={card.step_number}
                        onSave={(newText) => handleSave('step_number', newText, index)}
                        tag="span"
                        className=""
                        placeholder="ID"
                      />
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <EditableText
                        content="+"
                        onSave={(newText) => console.log('Saved plus sign:', newText)}
                        tag="span"
                        className="text-white font-bold text-2xl"
                        placeholder="+"
                      />
                    </div>
                  </div>

                  <EditableText
                    content={card.title}
                    onSave={(newText) => handleSave('title', newText, index)}
                    tag="h2"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
                    placeholder="Enter title..."
                  />

                  {card.subtitle && (
                    <EditableText
                      content={card.subtitle}
                      onSave={(newText) => handleSave('subtitle', newText, index)}
                      tag="h3"
                      className="text-base sm:text-lg font-semibold text-emerald-400 mb-4"
                      placeholder="Enter subtitle..."
                    />
                  )}

                  {card.description && (
                    <EditableText
                      content={card.description}
                      onSave={(newText) => handleSave('description', newText, index)}
                      tag="p"
                      className="text-sm sm:text-base text-white mb-4"
                      placeholder="Enter description..."
                      multiline
                    />
                  )}

                  <div className="space-y-2">
                    {card.bullet1 && <EditableText content={card.bullet1} onSave={(newText) => handleSave('bullet1', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.bullet2 && <EditableText content={card.bullet2} onSave={(newText) => handleSave('bullet2', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.wordbreak && <EditableText content={card.wordbreak} onSave={(newText) => handleSave('wordbreak', newText, index)} tag="p" className="text-white text-base sm:text-lg font-bold text-center my-4" placeholder="Enter text..." />}
                    {card.bullet3 && <EditableText content={card.bullet3} onSave={(newText) => handleSave('bullet3', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.bullet4 && <EditableText content={card.bullet4} onSave={(newText) => handleSave('bullet4', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.bullet5 && <EditableText content={card.bullet5} onSave={(newText) => handleSave('bullet5', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.bullet6 && <EditableText content={card.bullet6} onSave={(newText) => handleSave('bullet6', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.bullet7 && <EditableText content={card.bullet7} onSave={(newText) => handleSave('bullet7', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.bullet8 && <EditableText content={card.bullet8} onSave={(newText) => handleSave('bullet8', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                    {card.bullet9 && <EditableText content={card.bullet9} onSave={(newText) => handleSave('bullet9', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base" placeholder="Enter bullet point..." />}
                  </div>

                  {card.description1 && <EditableText content={card.description1} onSave={(newText) => handleSave('description1', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base mt-4" placeholder="Enter description..." multiline />}
                  {card.description2 && <EditableText content={card.description2} onSave={(newText) => handleSave('description2', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base mt-2" placeholder="Enter description..." multiline />}
                  {card.description3 && <EditableText content={card.description3} onSave={(newText) => handleSave('description3', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base mt-2" placeholder="Enter description..." multiline />}
                  {card.description4 && <EditableText content={card.description4} onSave={(newText) => handleSave('description4', newText, index)} tag="p" className="text-gray-300 text-sm sm:text-base mt-2" placeholder="Enter description..." multiline />}

                  {card.button_text && (
                    <div className="flex flex-col gap-3 mt-6">
                      <button className="bg-emerald-400 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-300 transition-all hover:scale-105 text-sm sm:text-base">
                        <EditableText content={card.button_text} onSave={(newText) => handleSave('button_text', newText, index)} tag="span" className="" placeholder="Enter button text..." />
                      </button>
                      {card.button_text2 && (
                        <button className="border border-emerald-400 text-emerald-400 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 text-sm sm:text-base">
                          <EditableText content={card.button_text2} onSave={(newText) => handleSave('button_text2', newText, index)} tag="span" className="" placeholder="Enter button text..." />
                        </button>
                      )}
                      {card.button_text3 && (
                        <button className="border border-emerald-400 text-emerald-400 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 text-sm sm:text-base">
                          <EditableText content={card.button_text3} onSave={(newText) => handleSave('button_text3', newText, index)} tag="span" className="" placeholder="Enter button text..." />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Fixed Image */}
          <div className="block static">
            <div className="fixed top-52 left-1/2 transform -translate-x-1/2 lg:top-58 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-[85%] sm:w-[80%] lg:w-[75%] max-w-[500px] sm:max-w-[600px] lg:max-w-[900px] h-[45vh] sm:h-[45vh] lg:h-[calc(75vh-3rem)]">
              <div className="w-full h-full flex items-center">
                <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    key={activeIndex}
                    src={data.steps[activeIndex]?.image_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop'}
                    alt={data.steps[activeIndex]?.title || 'Process step'}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out"
                    style={{
                      transform: 'scale(1.05)',
                      animation: `imageAnim${activeIndex % 5} 1s ease-out`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-2 lg:bottom-8 left-2 lg:left-8 right-2 lg:right-8">
                    <EditableText
                      content={data.steps[activeIndex]?.step_number || '01'}
                      onSave={(newText) => handleSave('step_number', newText, activeIndex)}
                      tag="div"
                      className="text-emerald-400 text-sm lg:text-xl font-bold mb-1 lg:mb-2"
                      placeholder="Enter ID..."
                    />
                    <EditableText
                      content={data.steps[activeIndex]?.title || 'Process Step'}
                      onSave={(newText) => handleSave('title', newText, activeIndex)}
                      tag="div"
                      className="text-white text-sm lg:text-2xl xl:text-3xl font-bold"
                      placeholder="Enter title..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes imageAnim0 {
          0% { opacity: 0; transform: scale(1.2) translateX(30px); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1.05) translateX(0px); filter: blur(0px); }
        }
        @keyframes imageAnim1 {
          0% { opacity: 0; transform: scale(0.8) translateY(-30px) rotate(5deg); filter: brightness(0.5); }
          100% { opacity: 1; transform: scale(1.05) translateY(0px) rotate(0deg); filter: brightness(1); }
        }
        @keyframes imageAnim2 {
          0% { opacity: 0; transform: scale(1.1) translateX(-40px) skewX(10deg); filter: saturate(0); }
          100% { opacity: 1; transform: scale(1.05) translateX(0px) skewX(0deg); filter: saturate(1); }
        }
        @keyframes imageAnim3 {
          0% { opacity: 0; transform: scale(0.9) translateY(40px) rotateX(20deg); filter: contrast(0.3); }
          100% { opacity: 1; transform: scale(1.05) translateY(0px) rotateX(0deg); filter: contrast(1); }
        }
        @keyframes imageAnim4 {
          0% { opacity: 0; transform: scale(1.3) translate(-20px, 20px) rotateZ(-3deg); filter: hue-rotate(180deg); }
          100% { opacity: 1; transform: scale(1.05) translate(0px, 0px) rotateZ(0deg); filter: hue-rotate(0deg); }
        }
      `}</style>
    </div>
  );
}