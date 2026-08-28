import React from 'react';
import { TEAM_MEMBERS } from '../../data/mockData';
import { Award, Coffee, Instagram, Sparkles, Heart } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team-section" className="space-y-10 pt-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2118]">
          Orang-Orang di Balik <span className="text-[#8C5E3C]">Cangkir Anda</span>
        </h2>
        <p className="text-sm text-[#756457]">
          Setiap cangkir kopi Ambus adalah dedikasi bersama dari Q-Grader bersertifikat, juara barista nasional, roaster berlisensi, dan pastry chef berbakat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] hover:border-[#8C5E3C] p-5 flex flex-col justify-between space-y-4 group transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <div className="space-y-4">
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF7F2]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                {member.instagram && (
                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11px] text-[#7A5236] font-semibold border border-[#E5D7C5] flex items-center gap-1 shadow-xs">
                    <Instagram className="w-3 h-3" />
                    <span>{member.instagram}</span>
                  </span>
                )}
              </div>

              {/* Bio & Credential */}
              <div className="space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider text-[#8C5E3C] font-semibold">
                  {member.role}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                  {member.name}
                </h3>
                <p className="text-[11px] text-[#8C5E3C] font-medium">
                  {member.credential}
                </p>
                <p className="text-xs text-[#857161] leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>
            </div>

            {/* Member Favorite Brew */}
            <div className="pt-3 border-t border-[#EFE8DE] space-y-1 bg-[#FAF7F2] p-2.5 rounded-xl">
              <div className="text-[10px] uppercase text-[#857161] flex items-center gap-1 font-semibold tracking-wide">
                <Coffee className="w-3 h-3 text-[#8C5E3C]" />
                <span>Racikan Favorit:</span>
              </div>
              <p className="text-xs font-semibold text-[#2D2118]">
                {member.favoriteBrew}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
