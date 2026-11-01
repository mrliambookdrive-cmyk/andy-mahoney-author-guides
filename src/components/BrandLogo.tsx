import React from 'react';
import { BRAND_ICON_PATH, BRAND_ICON_VIEWBOX } from './brandIconPath';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Precision Vector Book Icon (No raster image) */}
      <div
        className={`w-10 h-7 sm:w-11 sm:h-7.5 shrink-0 flex items-center justify-center ${
          isDark ? 'text-white' : 'text-[#125688]'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox={BRAND_ICON_VIEWBOX}
          fill="currentColor"
          className="w-full h-full object-contain"
        >
          <path d={BRAND_ICON_PATH} />
        </svg>
      </div>

      {/* Pure Typography (Crisp, High-DPI Vector Text) */}
      <div className="flex flex-col justify-center text-left">
        <span
          className={`font-serif text-lg sm:text-[21px] font-bold tracking-tight leading-none ${
            isDark ? 'text-white' : 'text-[#0E1E31]'
          }`}
        >
          Andy Mahoney
        </span>
        {showTagline && (
          <span
            className={`text-[10.5px] sm:text-[11.5px] font-medium tracking-tight leading-tight mt-1 ${
              isDark ? 'text-stone-300' : 'text-[#1D6399]'
            }`}
          >
            Books That Build a Better You
          </span>
        )}
      </div>
    </div>
  );
};
