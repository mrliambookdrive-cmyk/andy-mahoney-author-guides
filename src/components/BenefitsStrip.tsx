import React from 'react';
import { Feather, Brain, Heart, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    {
      id: 'practical',
      title: 'Practical Guidance',
      description: 'Real-world advice you can apply today.',
      icon: Feather,
    },
    {
      id: 'habits',
      title: 'Build Better Habits',
      description: 'Small changes make big differences.',
      icon: Brain,
    },
    {
      id: 'purpose',
      title: 'Find Your Purpose',
      description: 'Live with intention and confidence.',
      icon: Heart,
    },
    {
      id: 'future',
      title: 'A Brighter Future',
      description: "Because it's never too late to start.",
      icon: BookOpen,
    },
  ];

  return (
    <section id="why-read" className="bg-[#FAFBFD] py-16 sm:py-20 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#1D6399] mb-2.5">
            WHY READ ANDY MAHONEY
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1E31] tracking-tight">
            More Than Just Books
          </h2>
        </div>

        {/* 4 Feature Columns with Dividers */}
        <div className="grid grid-cols-4 divide-x divide-stone-200/80 max-w-6xl mx-auto items-stretch">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`py-6 sm:py-2 px-0.5 flex flex-col items-center text-center group transition-transform duration-200 hover:-translate-y-1`}
              >
                {/* Soft Blue Circle Badge */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#EBF3FA] flex items-center justify-center text-[#125688] mb-2 sm:mb-4 group-hover:bg-[#125688] group-hover:text-white transition-colors duration-300 shadow-2xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-[10px] sm:text-base text-[#0E1E31] mb-0.5 sm:mb-1.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[8px] sm:text-xs text-stone-600 leading-relaxed max-w-[210px] mx-auto hidden sm:block">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
