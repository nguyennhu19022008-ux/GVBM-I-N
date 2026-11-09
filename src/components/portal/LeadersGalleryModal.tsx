import React from 'react';
import { X, Award, CheckCircle2, Quote } from 'lucide-react';
import type { LeaderProfile } from '../../data/storiesData';

interface LeadersGalleryModalProps {
  leader: LeaderProfile | null;
  onClose: () => void;
}

export const LeadersGalleryModal: React.FC<LeadersGalleryModalProps> = ({ leader, onClose }) => {
  if (!leader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeSlideUp">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF8F1] rounded-2xl shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#9C3B32] uppercase">
            <span>HỒ SƠ DANH NHÂN LỊCH SỬ</span>
            <span>•</span>
            <span>LƯU TRỮ QUỐC GIA</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F3EFE5] hover:bg-[#9C3B32] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[#0A1418] shadow-xs"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5:7 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column (5 Cols): Standout Portrait */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-xl overflow-hidden image-standout bg-[#F3EFE5] shadow-lg">
              <img
                src={leader.imageUrl}
                alt={leader.name}
                className="w-full aspect-3/4 object-cover object-top grayscale contrast-110"
              />
              <div className="p-3 text-center text-xs font-mono text-[#687477] bg-[#F3EFE5]">
                <span>NIÊN ĐẠI: </span>
                <span className="font-bold text-[#9C3B32]">{leader.lifespan}</span>
              </div>
            </div>

            <div className="p-4 bg-[#F3EFE5]/70 rounded-xl text-xs font-mono space-y-1.5 shadow-2xs">
              <span className="block text-[#9C3B32] font-bold uppercase">MỐC SON LỊCH SỬ GẮN LIỀN:</span>
              <p className="text-[#0A1418] font-sans font-medium">{leader.historicalMilestone}</p>
            </div>
          </div>

          {/* Right Column (7 Cols): Info, Quote & Contributions */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#9C3B32] uppercase tracking-wider block mb-1">
                LÃNH TỤ DÂN TỘC VIỆT NAM
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#0A1418] tracking-tight">
                {leader.name}
              </h3>
              <p className="text-sm font-serif italic text-[#687477] mt-1">
                {leader.role}
              </p>
            </div>

            {/* Quote */}
            <div className="relative p-4 rounded-xl bg-[#F3EFE5]/80 space-y-1 shadow-2xs">
              <Quote className="w-5 h-5 text-[#9C3B32]/30 mb-1" />
              <p className="font-serif italic text-sm sm:text-base text-[#0A1418] leading-relaxed">
                "{leader.quote}"
              </p>
            </div>

            {/* Key Contributions */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1418] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C69A47]" />
                <span>Những Cống Hiến Lịch Sử Vĩ Đại:</span>
              </h4>
              <div className="space-y-2.5">
                {leader.contributions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0A1418]">
                    <CheckCircle2 className="w-4 h-4 text-[#486D5D] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer close button */}
            <div className="pt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer rounded-xl shadow-sm"
              >
                Đóng Hồ Sơ
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
