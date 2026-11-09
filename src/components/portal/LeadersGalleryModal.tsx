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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-fadeSlideUp">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF8F1] border-2 border-[#0A1418] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 mb-6 broadsheet-double-b">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#9C3B32] uppercase">
            <span>HỒ SƠ DANH NHÂN LỊCH SỬ</span>
            <span>•</span>
            <span>LƯU TRỮ QUỐC GIA</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[rgba(16,37,43,0.3)] hover:border-[#0A1418] hover:bg-[#9C3B32] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[#0A1418]"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5:7 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column (5 Cols): Portrait */}
          <div className="md:col-span-5 space-y-4">
            <div className="archival-newspaper-frame border border-[rgba(16,37,43,0.25)] bg-[#F3EFE5]">
              <img
                src={leader.imageUrl}
                alt={leader.name}
                className="w-full aspect-3/4 object-cover object-top grayscale"
              />
              <div className="p-2 text-center text-xs font-mono text-[#687477]">
                <span>NIÊN ĐẠI: </span>
                <span className="font-bold text-[#9C3B32]">{leader.lifespan}</span>
              </div>
            </div>

            <div className="p-4 bg-[#F3EFE5] border border-[rgba(16,37,43,0.16)] text-xs font-mono space-y-1.5">
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
            <div className="relative pl-5 py-2 border-l-3 border-[#9C3B32] bg-[#F3EFE5] pr-3">
              <Quote className="w-5 h-5 text-[#9C3B32]/30 absolute -top-2 left-1.5" />
              <p className="font-serif italic text-sm sm:text-base text-[#0A1418] leading-relaxed">
                {leader.quote}
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
            <div className="pt-4 hairline-t flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
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
