'use client';

import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditableText from '../../../components/cms/EditableText';
import { CMSService } from '../../../../lib/cms-api';

gsap.registerPlugin(ScrollTrigger);

interface ContactPageData {
  id: number;
  hero_title: string;
  contact_info_title: string;
  contact_info_subtitle: string;
  phone_number: string;
  email_address: string;
  address: string;
  first_name_label: string;
  last_name_label: string;
  email_label: string;
  phone_label: string;
  subject_label: string;
  message_label: string;
  first_name_placeholder: string;
  last_name_placeholder: string;
  email_placeholder: string;
  phone_placeholder: string;
  message_placeholder: string;
  subject_option_1: string;
  subject_option_2: string;
  subject_option_3: string;
  subject_option_4: string;
  submit_button_text: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

export default function Contact() {
  const titleRef = useRef(null);
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);
  const contactItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const cmsService = new CMSService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching Contact page data from backend...');
        const response = await cmsService.getContactPageContent();
        console.log('✅ Contact API Response:', response);
        setData(response);
      } catch (error) {
        console.error('❌ Error fetching Contact data:', error);
        // Fallback to default data if API fails
        setData({
          id: 1,
          hero_title: "Contact Us",
          contact_info_title: "Contact Information",
          contact_info_subtitle: "Say something to start a live chat!",
          phone_number: "+012 3456 789",
          email_address: "demo@gmail.com",
          address: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
          first_name_label: "First Name",
          last_name_label: "Last Name",
          email_label: "Email",
          phone_label: "Phone Number",
          subject_label: "Select Subject?",
          message_label: "Message",
          first_name_placeholder: "John",
          last_name_placeholder: "Doe",
          email_placeholder: "your@email.com",
          phone_placeholder: "+1 012 3456 789",
          message_placeholder: "Write your message...",
          subject_option_1: "General Inquiry",
          subject_option_2: "General Inquiry",
          subject_option_3: "General Inquiry",
          subject_option_4: "General Inquiry",
          submit_button_text: "Send Message",
          is_active: true
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
      gsap.fromTo(title,
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }

    gsap.fromTo(infoCardRef.current,
      { opacity: 0, x: -100, rotateY: -15 },
      {
        opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: infoCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      }
    );

    gsap.fromTo(formCardRef.current,
      { opacity: 0, x: 100, rotateY: 15 },
      {
        opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: formCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      }
    );

    contactItemsRef.current.forEach((item, i) => {
      if (item) {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, delay: 0.3 + i * 0.15, ease: "back.out(1.7)",
            scrollTrigger: { trigger: infoCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
          }
        );
      }
    });

    formFieldsRef.current.forEach((field, i) => {
      if (field) {
        gsap.fromTo(field,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, delay: 0.2 + i * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: formCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
          }
        );
      }
    });
  }, [data]);

  const handleSave = async (field: string, value: string) => {
    if (!data) return;
    
    try {
      const updatedData = { ...data, [field]: value };
      const updateData = { [field]: value };
      
      await cmsService.updateContactPageContent(updateData);
      setData(updatedData);
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
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <EditableText
            content={data.hero_title}
            onSave={(newText) => handleSave('hero_title', newText)}
            tag="h1"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white"
            placeholder="Enter title..."
          />
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-card p-3 sm:p-4 rounded-2xl">
          {/* Contact Information Card - Left */}
          <div ref={infoCardRef} className="bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
            <EditableText
              content={data.contact_info_title}
              onSave={(newText) => handleSave('contact_info_title', newText)}
              tag="h2"
              className="text-2xl sm:text-3xl font-bold mb-3"
              placeholder="Enter title..."
            />
            <EditableText
              content={data.contact_info_subtitle}
              onSave={(newText) => handleSave('contact_info_subtitle', newText)}
              tag="p"
              className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base"
              placeholder="Enter subtitle..."
            />

            {/* Phone */}
            <div ref={el => { contactItemsRef.current[0] = el; }} className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <EditableText
                content={data.phone_number}
                onSave={(newText) => handleSave('phone_number', newText)}
                tag="p"
                className="text-base sm:text-lg"
                placeholder="Enter phone number..."
              />
            </div>

            {/* Email */}
            <div ref={el => { contactItemsRef.current[1] = el; }} className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <EditableText
                content={data.email_address}
                onSave={(newText) => handleSave('email_address', newText)}
                tag="p"
                className="text-base sm:text-lg"
                placeholder="Enter email..."
              />
            </div>

            {/* Address */}
            <div ref={el => { contactItemsRef.current[2] = el; }} className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <EditableText
                content={data.address}
                onSave={(newText) => handleSave('address', newText)}
                tag="p"
                className="text-base sm:text-lg"
                placeholder="Enter address..."
                multiline
              />
            </div>
          </div>

          {/* Contact Form - Right */}
          <div ref={formCardRef} className="bg-card/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border-white/10">
            <form className="space-y-4 sm:space-y-6">
              {/* First Name and Last Name Row */}
              <div ref={el => { formFieldsRef.current[0] = el; }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <EditableText
                    content={data.first_name_label}
                    onSave={(newText) => handleSave('first_name_label', newText)}
                    tag="label"
                    className="block text-gray-300 text-sm mb-2"
                    placeholder="Enter label..."
                  />
                  <input
                    type="text"
                    id="firstName"
                    placeholder={data.first_name_placeholder}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
                <div>
                  <EditableText
                    content={data.last_name_label}
                    onSave={(newText) => handleSave('last_name_label', newText)}
                    tag="label"
                    className="block text-gray-300 text-sm mb-2"
                    placeholder="Enter label..."
                  />
                  <input
                    type="text"
                    id="lastName"
                    placeholder={data.last_name_placeholder}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div ref={el => { formFieldsRef.current[1] = el; }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <EditableText
                    content={data.email_label}
                    onSave={(newText) => handleSave('email_label', newText)}
                    tag="label"
                    className="block text-gray-300 text-sm mb-2"
                    placeholder="Enter label..."
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder={data.email_placeholder}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
                <div>
                  <EditableText
                    content={data.phone_label}
                    onSave={(newText) => handleSave('phone_label', newText)}
                    tag="label"
                    className="block text-gray-300 text-sm mb-2"
                    placeholder="Enter label..."
                  />
                  <input
                    type="tel"
                    id="phone"
                    placeholder={data.phone_placeholder}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
              </div>

              {/* Select Subject */}
              <div ref={el => { formFieldsRef.current[2] = el; }}>
                <EditableText
                  content={data.subject_label}
                  onSave={(newText) => handleSave('subject_label', newText)}
                  tag="label"
                  className="block text-gray-300 text-sm mb-4"
                  placeholder="Enter label..."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    data.subject_option_1,
                    data.subject_option_2,
                    data.subject_option_3,
                    data.subject_option_4,
                  ].map((subject, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="subject"
                        className="w-4 h-4 accent-primary"
                      />
                      <EditableText
                        content={subject}
                        onSave={(newText) => handleSave(`subject_option_${idx + 1}`, newText)}
                        tag="span"
                        className="text-gray-300 text-sm"
                        placeholder="Enter subject..."
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div ref={el => { formFieldsRef.current[3] = el; }}>
                <EditableText
                  content={data.message_label}
                  onSave={(newText) => handleSave('message_label', newText)}
                  tag="label"
                  className="block text-gray-300 text-sm mb-2"
                  placeholder="Enter label..."
                />
                <textarea
                  id="message"
                  placeholder={data.message_placeholder}
                  rows={1}
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div ref={el => { formFieldsRef.current[4] = el; }} className="pt-4 flex justify-center sm:justify-end">
                <div className="relative inline-block">
                  <button
                    type="submit"
                    className="bg-gradient-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
                  >
                    <EditableText
                      content={data.submit_button_text}
                      onSave={(newText) => handleSave('submit_button_text', newText)}
                      tag="span"
                      className=""
                      placeholder="Enter button text..."
                    />
                  </button>
                  {/* Lucide-style send icon positioned overlapping the button */}
                  <Send className="absolute right-20 sm:right-28 -bottom-6 sm:-bottom-8 w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}