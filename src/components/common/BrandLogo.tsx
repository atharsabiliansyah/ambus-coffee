import React, { useState } from 'react';

/**
 * DEFAULT_LOGO_SRC
 * Anda dapat mengganti nilai path atau URL ini dengan file gambar Anda sendiri (misalnya: '/ambus-logo.png', '/logo.png', atau URL gambar online).
 */
export const DEFAULT_LOGO_SRC = '/ambus-logo.svg';

interface BrandLogoProps {
  src?: string;
  variant?: 'full' | 'icon' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  src = DEFAULT_LOGO_SRC,
  variant = 'full',
  size = 'md',
  className = '',
  showTagline = false,
  showText = true
}) => {
  const [imgError, setImgError] = useState(false);

  // Size helper mapping for the <img> element
  const imageSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size];

  const textSizes = {
    sm: { title: 'text-lg', badge: 'text-[9px]', sub: 'text-[9px]' },
    md: { title: 'text-2xl', badge: 'text-[10px]', sub: 'text-[10px]' },
    lg: { title: 'text-3xl', badge: 'text-xs', sub: 'text-xs' },
    xl: { title: 'text-4xl', badge: 'text-xs', sub: 'text-sm' }
  }[size];

  // If icon-only variant is requested
  if (variant === 'icon' || !showText) {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${imageSizeClasses} ${className}`}>
        <img
          src={src}
          alt="Ambus Coffee Logo"
          className="w-full h-full object-contain rounded-xl drop-shadow-xs transition-transform duration-300 hover:scale-105"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Gambar Logo Icon Badge */}
      <div className={`relative shrink-0 ${imageSizeClasses} p-1 rounded-xl bg-[#FFFDF9] border border-[#E8DACB] shadow-xs flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
        <img
          src={src}
          alt="Ambus Coffee Logo"
          className="w-full h-full object-contain"
          onError={() => {
            setImgError(true);
          }}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif ${textSizes.title} font-extrabold tracking-tight text-[#2D2118]`}>
            Ambus
          </span>
          <span className="uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-[#433024] text-[#FFFDF8] text-[9px] font-bold shadow-xs">
            Coffee
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8C5E3C] font-semibold">
            Specialty Roastery
          </span>
          <span className="text-[#D8C7B5] text-[9px]">•</span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#857161] font-medium hidden xs:inline">
            Est. 2024
          </span>
        </div>

        {showTagline && (
          <p className="text-[9px] text-[#9A8778] mt-0.5 tracking-tight font-medium">
            Balanced Strike • Senopati
          </p>
        )}
      </div>
    </div>
  );
};
