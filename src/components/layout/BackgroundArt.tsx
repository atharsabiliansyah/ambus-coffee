import React from 'react';

export const BackgroundArt: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#432E20 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top Left Corner: Architectural Crop Marks & Organic Leaf Line Art */}
      <div className="absolute top-0 left-0 w-72 h-72 opacity-20 text-[#63432C]">
        {/* Corner Framing Lines */}
        <svg className="w-full h-full" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* L-Shape Corner Marks */}
          <path d="M20 60V20H60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 20L35 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          
          {/* Parallel Accent Lines */}
          <line x1="20" y1="80" x2="20" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="80" y1="20" x2="140" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

          {/* Coffee Leaf Botanical Doodle */}
          <path
            d="M30 160C45 130 80 110 120 115C130 116 145 110 155 95C160 88 175 60 160 40C140 30 110 45 95 65C85 80 50 110 30 160Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 160C70 135 110 100 160 40"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path d="M75 130C90 120 105 125 115 120" stroke="currentColor" strokeWidth="0.8" />
          <path d="M100 110C115 98 130 103 140 98" stroke="currentColor" strokeWidth="0.8" />
          <path d="M125 90C138 78 150 82 155 76" stroke="currentColor" strokeWidth="0.8" />

          {/* Handwritten-style coffee badge text */}
          <text x="32" y="52" fill="currentColor" fontSize="8" letterSpacing="0.25em" fontWeight="600" opacity="0.8">
            AMBUS // SPEC. 01
          </text>
        </svg>
      </div>

      {/* Top Right Corner: Steam swirl & Pour-Over Dripper Wireframe */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-20 text-[#63432C]">
        <svg className="w-full h-full" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Right Framing Lines */}
          <path d="M300 60V20H260" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M300 20L285 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="300" cy="20" r="3" fill="currentColor" />

          {/* V60 Cone / Origami Dripper Geometric Lines */}
          <polygon
            points="240,70 170,70 190,130 220,130"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Dripper Ridges */}
          <line x1="205" y1="70" x2="205" y2="130" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="185" y1="70" x2="198" y2="130" stroke="currentColor" strokeWidth="0.8" />
          <line x1="225" y1="70" x2="212" y2="130" stroke="currentColor" strokeWidth="0.8" />

          {/* Coffee Steam / Aroma Swirl Waves */}
          <path
            d="M205 60C200 45 210 35 205 20"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M195 55C190 42 198 32 192 18"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M215 58C210 48 220 38 216 25"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Concentric Coffee Ring Stain Graphic */}
          <circle cx="210" cy="210" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
          <circle cx="210" cy="210" r="45" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <circle cx="210" cy="210" r="3" fill="currentColor" opacity="0.5" />

          {/* Crosshair & Degrees */}
          <line x1="210" y1="135" x2="210" y2="160" stroke="currentColor" strokeWidth="1" />
          <line x1="210" y1="260" x2="210" y2="285" stroke="currentColor" strokeWidth="1" />
          <line x1="135" y1="210" x2="160" y2="210" stroke="currentColor" strokeWidth="1" />
          <line x1="260" y1="210" x2="285" y2="210" stroke="currentColor" strokeWidth="1" />

          <text x="215" y="48" fill="currentColor" fontSize="7" letterSpacing="0.2em" fontWeight="600" opacity="0.7">
            93.5°C EXTRACTION
          </text>
        </svg>
      </div>

      {/* Center Left Subtle Floating Bean Doodles */}
      <div className="absolute top-1/3 -left-6 w-48 h-96 opacity-15 text-[#63432C] hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 180 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coffee Bean 1 */}
          <g transform="translate(40, 50) rotate(-25)">
            <ellipse cx="25" cy="35" rx="18" ry="26" stroke="currentColor" strokeWidth="1.2" />
            <path d="M25 10C21 22 29 45 25 60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Coffee Bean 2 */}
          <g transform="translate(60, 180) rotate(35)">
            <ellipse cx="20" cy="28" rx="14" ry="20" stroke="currentColor" strokeWidth="1.2" />
            <path d="M20 9C17 18 23 37 20 47" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Connecting dashed trajectory */}
          <path d="M50 120C70 140 60 160 70 190" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Center Right Subtle Floating Line Art */}
      <div className="absolute top-1/2 -right-6 w-48 h-96 opacity-15 text-[#63432C] hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 180 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cupping Flavor Wheel Segment Graphic */}
          <path d="M120 80A70 70 0 0 0 60 140" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M140 70A90 90 0 0 0 50 160" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="120" cy="80" r="2.5" fill="currentColor" />
          <circle cx="60" cy="140" r="2.5" fill="currentColor" />

          {/* Coffee Bean 3 */}
          <g transform="translate(70, 210) rotate(-15)">
            <ellipse cx="22" cy="30" rx="15" ry="22" stroke="currentColor" strokeWidth="1.2" />
            <path d="M22 10C19 20 25 40 22 52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Bottom Left Corner: Artisan Stamp Seal & Geometric Crosshairs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-20 text-[#63432C]">
        <svg className="w-full h-full" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bottom Left Framing Lines */}
          <path d="M20 260V300H60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 300L35 285" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="20" cy="300" r="3" fill="currentColor" />

          {/* Vintage Roaster Stamp Badge */}
          <circle cx="110" cy="210" r="50" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 3" />
          <circle cx="110" cy="210" r="42" stroke="currentColor" strokeWidth="0.8" />
          <text x="110" y="200" fill="currentColor" fontSize="7" textAnchor="middle" letterSpacing="0.2em" fontWeight="700">
            AMBUS COFFEE
          </text>
          <text x="110" y="213" fill="currentColor" fontSize="6" textAnchor="middle" letterSpacing="0.15em">
            ★ ROASTERY ★
          </text>
          <text x="110" y="225" fill="currentColor" fontSize="5.5" textAnchor="middle" letterSpacing="0.1em">
            JAKARTA • 2024
          </text>

          {/* Aesthetic Calibration Axis */}
          <line x1="20" y1="200" x2="20" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="80" y1="300" x2="140" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Bottom Right Corner: Roastery Coordinates Line Art */}
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-20 text-[#63432C]">
        <svg className="w-full h-full" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bottom Right Framing Lines */}
          <path d="M300 260V300H260" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M300 300L285 285" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="300" cy="300" r="3" fill="currentColor" />

          {/* Topographic Elevation Curves */}
          <path
            d="M170 300C190 270 230 255 270 260C280 262 290 258 300 250"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M190 300C210 280 240 270 275 275C285 276 295 272 300 265"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 2"
          />
          <path
            d="M215 300C230 288 255 282 280 285C290 286 295 282 300 278"
            stroke="currentColor"
            strokeWidth="0.6"
          />

          <text x="290" y="235" fill="currentColor" fontSize="7" textAnchor="end" letterSpacing="0.15em" fontWeight="600" opacity="0.8">
            AMBUS COFFEE ROASTERY
          </text>
          <text x="290" y="246" fill="currentColor" fontSize="6" textAnchor="end" letterSpacing="0.1em" opacity="0.6">
            LAT 6°12'S • LON 106°49'E
          </text>
        </svg>
      </div>
    </div>
  );
};
