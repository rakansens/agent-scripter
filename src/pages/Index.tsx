import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { Rocket, Wand2, Zap, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Powered Generation",
      description: "Create stunning landing pages in minutes with our advanced AI technology.",
      icon: <Wand2 className="w-8 h-8" />
    },
    {
      title: "Lightning Fast",
      description: "Optimized performance ensures your landing page loads instantly.",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Customizable Templates",
      description: "Choose from a variety of professional templates and customize them to your needs.",
      icon: <Rocket className="w-8 h-8" />
    },
    {
      title: "Team Collaboration",
      description: "Work together with your team to create the perfect landing page.",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const faqs = [
    {
      question: "How does the AI generation work?",
      answer: "Our AI analyzes your requirements and generates a custom landing page based on best practices and your specific needs."
    },
    {
      question: "Can I customize the generated pages?",
      answer: "Yes! All generated pages are fully customizable. You can edit the content, styling, and layout to match your brand."
    },
    {
      question: "Do I need coding knowledge?",
      answer: "No coding knowledge required. Our intuitive interface makes it easy to create and edit landing pages."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <HeroSection
          title="Create Beautiful Landing Pages with AI"
          subtitle="Generate professional landing pages in minutes with our AI-powered platform"
          ctaText="Get Started Free"
          onCtaClick={() => navigate('/signup')}
        />
        
        <FeaturesSection
          title="Powerful Features"
          subtitle="Everything you need to create the perfect landing page"
          features={features}
        />
        
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our platform"
          faqs={faqs}
        />
        
        <CTASection
          title="Ready to Get Started?"
          subtitle="Join thousands of users creating amazing landing pages with our platform"
          ctaText="Start Creating Now"
          onCtaClick={() => navigate('/signup')}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;