import React from 'react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick
}) => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {subtitle}
          </p>
          <Button 
            variant="secondary"
            size="lg"
            onClick={onCtaClick}
            className="bg-white text-primary hover:bg-gray-100"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;