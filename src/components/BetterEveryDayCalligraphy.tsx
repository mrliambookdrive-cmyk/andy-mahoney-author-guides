import React from 'react';

interface BetterEveryDayCalligraphyProps {
  className?: string;
}

export const BetterEveryDayCalligraphy: React.FC<BetterEveryDayCalligraphyProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center select-none transform -rotate-2 hover:rotate-0 transition-transform duration-300 ${className}`}
      style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
      aria-label="Better Every Day"
    >
      {/* Hand-written Cursive Typography (Vector Sharp, Zero Blur) */}
      <span className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#145484] tracking-wide leading-[0.9] drop-shadow-xs">
        Better
      </span>
      <span className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#145484] tracking-wide leading-[0.9] mt-0.5 sm:mt-1 drop-shadow-xs">
        Every Day
      </span>

      {/* Dynamic Hand-drawn Brush Underline (Vector SVG) */}
      <svg
        viewBox="0 0 140 16"
        fill="none"
        className="w-28 sm:w-32 lg:w-36 h-auto text-[#145484] mt-1 -rotate-1"
        aria-hidden="true"
      >
        <path
          d="M4 8C32 5 72 4.5 136 7C105 5.5 50 5.2 16 11C52 9.5 92 8.5 132 10"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
