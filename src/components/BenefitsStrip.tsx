import React from 'react';
import { Compass, BookOpen, BarChart3, Sprout } from 'lucide-react';

export const BenefitsStrip: React.FC = () => {
  const steps = [
    { id: 'purpose', title: 'PURPOSE AFTER WORK', desc: 'Find what truly matters in this new chapter.', icon: Compass, color: '#FFC107' },
    { id: 'practical', title: 'PRACTICAL GUIDANCE', desc: 'Actionable ideas you can apply today.', icon: BookOpen, color: '#00BFA5' },
    { id: 'strategies', title: 'REAL-LIFE STRATEGIES', desc: 'Built on experience and practical wisdom.', icon: BarChart3, color: '#F44336' },
    { id: 'meaningful', title: 'A MORE MEANINGFUL LIFE', desc: 'Live with intention, structure and joy.', icon: Sprout, color: '#66BB6A' },
  ];

  return (
    <section className="bg-[#FAF7F2] py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Central Infographic Hub */}
        <div className="relative flex flex-col items-center">
          <div className="w-64 h-64 bg-white rounded-full shadow-xl flex flex-col items-center justify-center mb-16 z-10">
            <h2 className="text-2xl font-bold text-gray-800">INFOGRAPHICS</h2>
            <p className="text-gray-500">ELEMENTS</p>
            <div className="flex gap-2 mt-4">
              {['yellow', 'cyan', 'pink', 'green'].map(c => (
                <div key={c} className={`w-3 h-3 rounded-full bg-${c}-400`} style={{ backgroundColor: c === 'yellow' ? '#FFC107' : c === 'cyan' ? '#00BFA5' : c === 'pink' ? '#F44336' : '#66BB6A' }} />
              ))}
            </div>
          </div>

          {/* Curved Connector Line */}
          <svg className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-32 hidden md:block z-0" viewBox="0 0 600 128">
            <path d="M 50 100 Q 300 0 550 100" fill="none" stroke="#E0E0E0" strokeWidth="4" />
            <circle cx="50" cy="100" r="8" fill="#FFC107" />
            <circle cx="216" cy="35" r="8" fill="#00BFA5" />
            <circle cx="383" cy="35" r="8" fill="#F44336" />
            <circle cx="550" cy="100" r="8" fill="#66BB6A" />
          </svg>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 w-full">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-6" style={{ borderColor: step.color }}>
                    <Icon className="w-10 h-10" style={{ color: step.color }} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 max-w-xs">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
