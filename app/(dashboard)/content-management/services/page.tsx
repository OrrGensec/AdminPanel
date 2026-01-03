"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import EditableText from '../../../components/cms/EditableText';
import { CMSService } from '../../../../lib/cms-api';

interface ServiceStage {
  id: number;
  stage_number: number;
  title: string;
  subtitle: string;
  description: string;
  focus_content: string;
  button_text: string;
  order: number;
  is_active: boolean;
}

interface ServicePillar {
  id: number;
  title: string;
  description: string;
  button_text: string;
  order: number;
  is_active: boolean;
}

interface ServicesPageData {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  pillars_title: string;
  business_gp_title: string;
  business_gp_subtitle: string;
  business_gp_description: string;
  business_gp_button_text: string;
  business_gp_image: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

interface ServicesData {
  page: ServicesPageData;
  stages: ServiceStage[];
  pillars: ServicePillar[];
}

export default function Services() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [data, setData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const cmsService = new CMSService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching Services data from backend...');
        const result = await cmsService.getServicesPageContent();
        console.log('✅ Services API Response:', result);
        if (result) {
          console.log('📊 Services Data Structure:', {
            page: result.page,
            stages: result.stages?.length + ' stages' || '0 stages',
            pillars: result.pillars?.length + ' pillars' || '0 pillars'
          });
          setData(result);
        }
      } catch (error) {
        console.error('❌ Error fetching Services data:', error);
        // Fallback data
        setData({
          page: {
            id: 1,
            hero_title: "ORR Solutions - Listen. Solve. Optimise.",
            hero_subtitle: "We treat your organisation as a whole system — digital, regulatory, and living. We listen first, then design the right mix of advisory, systems, AI, and on-the-ground projects so you can move better and grow smarter too.",
            pillars_title: "The Three Pillars",
            business_gp_title: "ORR is your Business GP for",
            business_gp_subtitle: "complex systems — digital and living.",
            business_gp_description: "We listen to the whole organisation, solve with structure and insight, and optimise so you can grow with confidence.",
            business_gp_button_text: "Contact Us",
            business_gp_image: "/images/handshake.png",
            is_active: true
          },
          stages: [
            {
              id: 1,
              stage_number: 1,
              title: "STAGE 1 - DISCOVER",
              subtitle: "Listen.",
              description: "We start simple: one calm conversation and a quick scan of your reality.",
              focus_content: "We focus on:\n• Your context, people, and pressures\n• Regulatory, operational, data, and environmental risks\n• Which questions actually matter",
              button_text: "Sign up",
              order: 1,
              is_active: true
            },
            {
              id: 2,
              stage_number: 2,
              title: "STAGE 2 - DIAGNOSE",
              subtitle: "Think. Then listen again.",
              description: "We turn symptoms into a clear map of problems and opportunities.",
              focus_content: "What happens here:\n• Bottleneck and process mapping\n• Compliance, governance, and risk review\n• Data and living systems scan",
              button_text: "Learn More",
              order: 2,
              is_active: true
            }
          ],
          pillars: [
            {
              id: 1,
              title: "Digital Systems, Automation & AI",
              description: "SOPs, workflows, portals, dashboards, and AI helpers that make work flow with less effort and fewer surprises.",
              button_text: "Learn More",
              order: 1,
              is_active: true
            },
            {
              id: 2,
              title: "Strategic Advisory & Compliance",
              description: "Short, sharp clarity on rules, risk, and direction — from regulation and ESG to biotech and environmental questions.",
              button_text: "Learn More",
              order: 2,
              is_active: true
            },
            {
              id: 3,
              title: "Living Systems & Regeneration",
              description: "Support for land, water, species, and ecosystems — from production systems to restoration and incident response.",
              button_text: "Learn More",
              order: 3,
              is_active: true
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [data]);

  const handleSave = async (field: string, value: string, type: 'page' | 'stage' | 'pillar' = 'page', id?: number) => {
    if (!data) return;
    
    try {
      if (type === 'page') {
        // Update page fields
        const updateData = { page: { [field]: value } };
        await cmsService.updateServicesPageContent(updateData);
        
        setData(prev => prev ? {
          ...prev,
          page: { ...prev.page, [field]: value }
        } : null);
        console.log('✅ Saved page field:', field, value);
      } else if (type === 'stage' && id) {
        // Update stage fields
        const updateData = { [field]: value };
        await cmsService.updateServiceStage(id, updateData);
        
        setData(prev => prev ? {
          ...prev,
          stages: prev.stages.map(stage => 
            stage.id === id ? { ...stage, [field]: value } : stage
          )
        } : null);
        console.log('✅ Saved stage field:', field, value);
      } else if (type === 'pillar' && id) {
        // Update pillar fields
        const updateData = { [field]: value };
        await cmsService.updateServicePillar(id, updateData);
        
        setData(prev => prev ? {
          ...prev,
          pillars: prev.pillars.map(pillar => 
            pillar.id === id ? { ...pillar, [field]: value } : pillar
          )
        } : null);
        console.log('✅ Saved pillar field:', field, value);
      }
    } catch (error) {
      console.error('❌ Error saving:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center">
        <div className="text-white text-xl">Error loading content</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
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

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section 
        ref={el => { sectionsRef.current[0] = el; }}
        className="pt-32 pb-16 px-6 relative min-h-[80vh] flex items-center"
      >
        <div className="absolute inset-0" />
        <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-30 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <EditableText
            content={data.page.hero_title}
            onSave={(newText) => handleSave('hero_title', newText)}
            tag="h1"
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
            placeholder="Enter title..."
          />
          <EditableText
            content={data.page.hero_subtitle}
            onSave={(newText) => handleSave('hero_subtitle', newText)}
            tag="p"
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            placeholder="Enter description..."
            multiline
          />
        </div>
      </section>

      {/* Process Stages */}
      <section 
        ref={el => { sectionsRef.current[1] = el; }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:grid-rows-2">
            {data.stages.slice(0, 4).map((stage, index) => (
              <div key={stage.id} className="bg-slate-700 rounded-2xl p-8 text-white flex flex-col">
                <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <EditableText
                  content={stage.title}
                  onSave={(newText) => handleSave('title', newText, 'stage', stage.id)}
                  tag="h2"
                  className="text-xl font-bold mb-4"
                  placeholder="Enter stage title..."
                />
                <EditableText
                  content={stage.subtitle}
                  onSave={(newText) => handleSave('subtitle', newText, 'stage', stage.id)}
                  tag="h3"
                  className="text-lg font-semibold mb-4"
                  placeholder="Enter subtitle..."
                />
                <EditableText
                  content={stage.description}
                  onSave={(newText) => handleSave('description', newText, 'stage', stage.id)}
                  tag="p"
                  className="text-gray-300 text-sm mb-6"
                  placeholder="Enter description..."
                  multiline
                />
                <div className="text-gray-300 text-sm mb-8 flex-grow">
                  <EditableText
                    content={stage.focus_content}
                    onSave={(newText) => handleSave('focus_content', newText, 'stage', stage.id)}
                    tag="div"
                    className="whitespace-pre-line"
                    placeholder="Enter focus content..."
                    multiline
                  />
                </div>
                <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors mt-auto cursor-pointer">
                  <EditableText content={stage.button_text} onSave={(newText) => handleSave('button_text', newText, 'stage', stage.id)} tag="span" className="" placeholder="Enter button text..." />
                </button>
              </div>
            ))}
          </div>

          {/* Stage 5 - Grow (Full Width) */}
          {data.stages[4] && (
            <div className="bg-slate-700 rounded-2xl p-8 text-white max-w-[600px] mx-auto">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <EditableText
                content={data.stages[4].title}
                onSave={(newText) => handleSave('title', newText, 'stage', data.stages[4].id)}
                tag="h2"
                className="text-xl font-bold mb-4"
                placeholder="Enter stage title..."
              />
              <EditableText
                content={data.stages[4].subtitle}
                onSave={(newText) => handleSave('subtitle', newText, 'stage', data.stages[4].id)}
                tag="h3"
                className="text-lg font-semibold mb-4"
                placeholder="Enter subtitle..."
              />
              <EditableText
                content={data.stages[4].description}
                onSave={(newText) => handleSave('description', newText, 'stage', data.stages[4].id)}
                tag="p"
                className="text-gray-300 text-sm mb-6"
                placeholder="Enter description..."
                multiline
              />
              <div className="text-gray-300 text-sm mb-8">
                <EditableText
                  content={data.stages[4].focus_content}
                  onSave={(newText) => handleSave('focus_content', newText, 'stage', data.stages[4].id)}
                  tag="div"
                  className="whitespace-pre-line"
                  placeholder="Enter focus content..."
                  multiline
                />
              </div>
              <button className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                <EditableText content={data.stages[4].button_text} onSave={(newText) => handleSave('button_text', newText, 'stage', data.stages[4].id)} tag="span" className="" placeholder="Enter button text..." />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* The Three Pillars */}
      <section 
        ref={el => { sectionsRef.current[2] = el; }}
        className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-emerald-800 min-h-[80vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <EditableText
              content={data.page.pillars_title}
              onSave={(newText) => handleSave('pillars_title', newText)}
              tag="h2"
              className="text-4xl font-bold text-white"
              placeholder="Enter title..."
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.pillars.map((pillar) => (
              <div key={pillar.id} className="bg-black rounded-2xl px-8 py-12 text-white flex flex-col min-h-[300px]">
                <EditableText
                  content={pillar.title}
                  onSave={(newText) => handleSave('title', newText, 'pillar', pillar.id)}
                  tag="h3"
                  className="text-3xl font-bold mb-8 text-center"
                  placeholder="Enter title..."
                />
                <EditableText
                  content={pillar.description}
                  onSave={(newText) => handleSave('description', newText, 'pillar', pillar.id)}
                  tag="p"
                  className="text-gray-300 text-xl mb-8 text-center flex-grow"
                  placeholder="Enter description..."
                  multiline
                />
                <button className="w-full bg-gradient-primary text-[#204460] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity mt-8 cursor-pointer">
                  <EditableText content={pillar.button_text} onSave={(newText) => handleSave('button_text', newText, 'pillar', pillar.id)} tag="span" className="" placeholder="Enter button text..." />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business GP Section */}
      <section 
        ref={el => { sectionsRef.current[3] = el; }}
        className="py-20 px-6 bg-background star relative min-h-[80vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                content={data.page.business_gp_title}
                onSave={(newText) => handleSave('business_gp_title', newText)}
                tag="h2"
                className="text-4xl font-bold text-white mb-6"
                placeholder="Enter title..."
              />
              <EditableText
                content={data.page.business_gp_subtitle}
                onSave={(newText) => handleSave('business_gp_subtitle', newText)}
                tag="h3"
                className="text-4xl font-bold mb-8 text-white"
                placeholder="Enter subtitle..."
              />
              <EditableText
                content={data.page.business_gp_description}
                onSave={(newText) => handleSave('business_gp_description', newText)}
                tag="p"
                className="text-gray-300 text-xl mb-8"
                placeholder="Enter description..."
                multiline
              />
              <button className="bg-gradient-primary text-[#204460] px-12 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors">
                <EditableText content={data.page.business_gp_button_text} onSave={(newText) => handleSave('business_gp_button_text', newText)} tag="span" className="" placeholder="Enter button text..." />
              </button>
            </div>
            <div>
              <img 
                src={data.page.business_gp_image}
                alt="Business handshake" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}