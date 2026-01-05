'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditableText from '../../../components/cms/EditableText';
import { CMSService } from '../../../../lib/cms-api';

gsap.registerPlugin(ScrollTrigger);

interface PolicyItem {
  id: number;
  number: string;
  description: string;
  order: number;
  is_active: boolean;
}

interface LegalPolicyData {
  page: {
    id: number;
    hero_title: string;
    hero_description: string;
    meta_title?: string;
    meta_description?: string;
    is_active: boolean;
  };
  items: PolicyItem[];
}

export default function LegacyPolicy() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [data, setData] = useState<LegalPolicyData | null>(null);
  const [loading, setLoading] = useState(true);
  const cmsService = new CMSService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching Legal & Policy data from backend...');
        const response = await cmsService.getLegalPolicyPageContent();
        console.log('✅ Legal & Policy API Response:', response);
        setData(response);
      } catch (error) {
        console.error('❌ Error fetching Legal & Policy data:', error);
        // Fallback to default data if API fails
        setData({
          page: {
            id: 1,
            hero_title: "Legacy & Policy",
            hero_description: "Lorem ipsm jgdu mplexity. From regulatory and sustainability frameworks to biotechnology and compliance consulting, our experts guide clients through evolving legal, scientific, and operational standards. Our approach combines deep technical insight with strategic foresight — ensuring every initiative is compliant, sustainable, and built for growth.",
            is_active: true
          },
          items: [
            {
              id: 1,
              number: "01",
              description: "Lorem ipsm jgdu mplexity. From regulatory and sustainability frameworks to biotechnology and compliance consulting, our experts guide clients through evolving legal, scientific, and operational standards. Our approach combines deep technical insight with strategic foresight — ensuring every initiative is compliant, sustainable, and built for growth.",
              order: 1,
              is_active: true
            },
            {
              id: 2,
              number: "02",
              description: "Lorem ipsm jgdu mplexity. From regulatory and sustainability frameworks to biotechnology and compliance consulting, our experts guide clients through evolving legal, scientific, and operational standards. Our approach combines deep technical insight with strategic foresight — ensuring every initiative is compliant, sustainable, and built for growth.",
              order: 2,
              is_active: true
            },
            {
              id: 3,
              number: "03",
              description: "Lorem ipsm jgdu mplexity. From regulatory and sustainability frameworks to biotechnology and compliance consulting, our experts guide clients through evolving legal, scientific, and operational standards. Our approach combines deep technical insight with strategic foresight — ensuring every initiative is compliant, sustainable, and built for growth.",
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
    if (!data) return;
    
    const title = titleRef.current;
    if (title) {
      const text = title.textContent;
      title.innerHTML = text!.split('').map((char, i) =>
        `<span style="display:inline-block;opacity:0">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      gsap.to(title.children, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.03,
        ease: "power2.out"
      });
    }

    gsap.fromTo(descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, rotateX: 15 },
      {
        opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (item) {
        const number = item.querySelector('.policy-number');
        const text = item.querySelector('.policy-text');

        gsap.fromTo(number,
          { opacity: 0, scale: 0, rotate: -180 },
          {
            opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)",
            scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );

        if (text) {
          const words = text.textContent!.split(' ');
          text.innerHTML = words.map(word => `<span style="display:inline-block;opacity:0">${word}&nbsp;</span>`).join('');

          gsap.to(text.children, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
          });
        }
      }
    });
  }, [data]);

  const handleSave = async (field: string, value: string, type: 'page' | 'item' = 'page', itemId?: number) => {
    if (!data) return;
    
    try {
      if (type === 'page') {
        const updateData = { page: { [field]: value } };
        
        await cmsService.updateLegalPolicyPageContent(updateData);
        setData({ ...data, page: { ...data.page, [field]: value } });
      } else if (type === 'item' && itemId) {
        const updateData = { [field]: value };
        
        await cmsService.updatePolicyItem(itemId, updateData);
        setData({
          ...data,
          items: data.items.map(item => 
            item.id === itemId ? { ...item, [field]: value } : item
          )
        });
      }
      console.log('✅ Saved:', field, value);
    } catch (error) {
      console.error('❌ Error saving:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-foreground star flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-foreground star flex items-center justify-center">
        <div className="text-white text-xl">Error loading content</div>
      </div>
    );
  }



  return (
    <div className="min-h-screen text-foreground star">
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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <EditableText
            content={data.page.hero_title}
            onSave={(newText) => handleSave('hero_title', newText)}
            tag="h1"
            className="text-5xl font-bold mb-8 text-white"
            placeholder="Enter title..."
          />
          <EditableText
            content={data.page.hero_description}
            onSave={(newText) => handleSave('hero_description', newText)}
            tag="p"
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            placeholder="Enter description..."
            multiline
          />
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div ref={cardRef} className="bg-card p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl ">
            <Image
              src="/bgSvg.svg"
              alt="background"
              width={1500}
              height={1500}
              className="absolute top-1/2 left-1/2 scale-200 -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-50"
            />

            <div className="bg-card rounded-2xl p-4 relative">
              {data.items.map((item, index) => (
                <div key={item.id} ref={el => { itemsRef.current[index] = el; }} className={`flex gap-6 ${index < data.items.length - 1 ? 'mb-12' : 'pb-8'}`}>
                  <div className="policy-number text-6xl font-bold text-primary shrink-0">
                    <EditableText
                      content={item.number}
                      onSave={(newText) => handleSave('number', newText, 'item', item.id)}
                      tag="span"
                      className=""
                      placeholder={`0${index + 1}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <EditableText
                      content={item.description}
                      onSave={(newText) => handleSave('description', newText, 'item', item.id)}
                      tag="p"
                      className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere"
                      placeholder="Enter policy text..."
                      multiline
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
