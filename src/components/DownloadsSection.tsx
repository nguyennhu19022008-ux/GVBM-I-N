import React, { useState, useMemo } from 'react';
import { Download, CheckCircle, Search, Sparkles, Eye, Check } from 'lucide-react';
import { DOWNLOAD_RESOURCES, RESOURCE_CATEGORIES } from '../data/downloadsData';
import type { ResourceItem } from '../data/downloadsData';

interface DownloadsSectionProps {
  onGoToQuiz?: (quizId?: string) => void;
}

export const DownloadsSection: React.FC<DownloadsSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<'all' | '11' | '12'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<ResourceItem | null>(null);

  const filteredResources = useMemo(() => {
    return DOWNLOAD_RESOURCES.filter((res) => {
      const matchCat = selectedCategory === 'all' || res.category === selectedCategory;
      const matchGrade = selectedGrade === 'all' || res.gradeLevel === 'all' || res.gradeLevel === selectedGrade;
      const matchSearch =
        searchQuery.trim() === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchGrade && matchSearch;
    });
  }, [selectedCategory, selectedGrade, searchQuery]);

  const handleDownload = (item: ResourceItem) => {
    setDownloadingId(item.id);
    
    setTimeout(() => {
      const content = `# ĐAM MÊ LỊCH SỬ - TÀI LIỆU HỌC TẬP\n\nTên tài liệu: ${item.title}\nĐịnh dạng: ${item.fileFormat}\nDung lượng: ${item.fileSize}\nBan Chuyên Môn: ${item.author}\nThời gian: ${item.updatedAt}\n\nNội dung chính:\n${item.highlights.map(h => `- ${h}`).join('\n')}\n\nChúc các em học sinh Khối 11 & Khối 12 ôn thi Lịch sử đạt điểm tối đa!`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${item.id}-${item.fileFormat.toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadingId(null);
      setDownloadSuccessToast(`Đã bắt đầu tải về: ${item.title}`);
      setTimeout(() => setDownloadSuccessToast(null), 4000);
    }, 700);
  };

  return (
    <section id="downloads-section" className="py-16 lg:py-24 bg-[#FAF3E0] hairline-b text-left">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 hairline-b">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-[#780000]">
              <Download className="w-4 h-4" />
              <span>CHƯƠNG III • KHO TÀI NGUYÊN SỐ MỞ 100% CÔNG KHAI</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[#4A2508] tracking-tight">
              Kho Giáo Án Số, Slide & Đề Cương
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#18120E]/80 max-w-2xl font-sans">
              Mở tự do cho toàn thể giáo viên và học sinh Khối 11 & 12. Tải trực tiếp trọn bộ slide bài giảng PowerPoint (.pptx), đề cương ôn tập Word (.docx) và sơ đồ tư duy PDF chuẩn ma trận đề thi 2026.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tài liệu, slide, đề cương..."
              className="w-full pl-10 pr-4 py-3 rounded-sm bg-white border border-[#D4A373]/60 focus:border-[#780000] text-sm outline-none font-sans"
            />
            <Search className="w-4 h-4 text-[#4A2508]/60 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Filter Tabs: Category & Grade */}
        <div className="my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 hairline-b">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#4A2508] text-[#FAF3E0] border-[#4A2508] font-bold shadow-xs'
                    : 'bg-white text-[#4A2508]/80 border-[#D4A373]/40 hover:bg-[#F2E4C6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-sm border border-[#D4A373]/50 text-xs font-mono self-start sm:self-auto">
            <span className="px-2 text-stone-500 font-bold">Khối:</span>
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                selectedGrade === 'all' ? 'bg-[#780000] text-white font-bold' : 'text-stone-700 hover:text-black'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedGrade('12')}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                selectedGrade === '12' ? 'bg-[#780000] text-white font-bold' : 'text-stone-700 hover:text-black'
              }`}
            >
              Lớp 12
            </button>
            <button
              onClick={() => setSelectedGrade('11')}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                selectedGrade === '11' ? 'bg-[#780000] text-white font-bold' : 'text-stone-700 hover:text-black'
              }`}
            >
              Lớp 11
            </button>
          </div>
        </div>

        {/* Download Feedback Toast */}
        {downloadSuccessToast && (
          <div className="mb-6 p-4 rounded-sm bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm flex items-center gap-3 animate-fadeUp">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{downloadSuccessToast}</span>
          </div>
        )}

        {/* 16:9 Asymmetrical Bento & Open Ledger Grid (5 Cols Master : 7 Cols Ledger) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Columns: Featured Master Bundle (Bento Anchor Card) */}
          <div className="lg:col-span-5 bg-[#4A2508] text-[#FAF3E0] p-6 sm:p-8 lg:p-10 rounded-sm shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="px-2.5 py-1 bg-[#780000] text-white font-bold tracking-wider uppercase">
                  BỘ TÀI NGUYÊN TIÊU ĐIỂM 2026
                </span>
                <span className="text-[#D4A373]">ĐỀ XUẤT ÔN TẬP</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
                Cẩm Nang Trọn Bộ Đề Cương & Sơ Đồ Tư Duy 7 Thời Kỳ Lịch Sử
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#FAF3E0]/85 font-sans leading-relaxed">
                Gói tài liệu cốt lõi tổng hợp 120 trang đề cương trọng tâm, hệ thống bảng niên biểu 1858–2000 và bản đồ tư duy vector in ấn rõ nét, bám sát cấu trúc phân hóa câu hỏi 8 - 9 - 10 điểm của Bộ GD&ĐT.
              </p>

              <div className="mt-6 space-y-2.5 pt-4 border-t border-[#D4A373]/30 text-xs sm:text-sm text-[#FAF3E0]/90">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4A373] shrink-0" />
                  <span>Chuẩn định dạng Slide PowerPoint, Word (.docx) & PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4A373] shrink-0" />
                  <span>Tích hợp mẹo loại trừ đáp án nhiễu & từ khóa bẫy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4A373] shrink-0" />
                  <span>Cập nhật mới nhất tháng 03/2026</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D4A373]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#D4A373]">
                Dung lượng: 81.2 MB • ZIP Trọn Gói
              </span>

              <button
                onClick={() => handleDownload(DOWNLOAD_RESOURCES[2])}
                className="w-full sm:w-auto px-6 py-3 bg-[#780000] hover:bg-[#580000] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition-all shadow cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Tải Trọn Gói Master (.ZIP)</span>
              </button>
            </div>
          </div>

          {/* Right 7 Columns: Open Archival Ledger List (Cardless Separated by Hairline Rules) */}
          <div className="lg:col-span-7 divide-y divide-[#4A2508]/15 bg-white border border-[#D4A373]/50 rounded-sm shadow-xs">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 hover:bg-[#F2E4C6]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left group"
              >
                <div className="space-y-1.5 flex-1 pr-2">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className={`px-2 py-0.5 rounded-2xs font-bold uppercase ${
                      item.fileFormat === 'PPTX' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      item.fileFormat === 'DOCX' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                      'bg-red-100 text-red-900 border border-red-300'
                    }`}>
                      {item.fileFormat}
                    </span>

                    <span className="text-stone-500 font-medium">
                      {item.fileSize} • {item.downloadsCount.toLocaleString()} lượt tải
                    </span>

                    <span className="text-stone-400">• Lớp {item.gradeLevel === 'all' ? '11 & 12' : item.gradeLevel}</span>
                  </div>

                  <h4 className="font-playfair text-base sm:text-lg font-bold text-[#4A2508] group-hover:text-[#780000] transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#18120E]/75 line-clamp-2 font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="p-2 border border-[#4A2508]/30 hover:border-[#4A2508] text-[#4A2508] hover:bg-white rounded-sm text-xs transition-colors cursor-pointer"
                    title="Xem trước đề mục"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDownload(item)}
                    disabled={downloadingId === item.id}
                    className="px-4 py-2 rounded-sm bg-[#4A2508] hover:bg-[#780000] text-[#FAF3E0] hover:text-white font-medium text-xs transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingId === item.id ? 'Đang tải...' : 'Tải Về'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Quick Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF3E0] border-2 border-[#D4A373] max-w-lg w-full p-6 sm:p-7 rounded-sm shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between hairline-b pb-3">
              <span className="font-mono text-xs font-bold text-[#780000] uppercase">
                XEM TRƯỚC HỒ SƠ TÀI LIỆU
              </span>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-stone-500 hover:text-black font-mono text-sm cursor-pointer"
              >
                ✕ ĐÓNG
              </button>
            </div>

            <h4 className="font-playfair text-xl font-bold text-[#4A2508]">
              {previewItem.title}
            </h4>

            <p className="text-sm text-[#18120E]/80">
              {previewItem.description}
            </p>

            <div className="p-4 bg-white border border-[#D4A373]/40 rounded-sm space-y-2">
              <span className="font-mono text-xs font-bold uppercase text-[#4A2508] block">
                CÁC ĐỀ MỤC TRỌNG TÂM TRONG TỆP:
              </span>
              <ul className="space-y-1.5 text-xs text-[#18120E]">
                {previewItem.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#780000] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs text-stone-500">
                Định dạng: {previewItem.fileFormat} • {previewItem.fileSize}
              </span>
              <button
                onClick={() => {
                  handleDownload(previewItem);
                  setPreviewItem(null);
                }}
                className="px-5 py-2 bg-[#780000] hover:bg-[#580000] text-white text-xs font-bold rounded-sm shadow cursor-pointer"
              >
                Tải Xuống Ngay
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
