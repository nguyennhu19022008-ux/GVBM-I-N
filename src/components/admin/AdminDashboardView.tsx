import React, { useState } from 'react';
import { Shield, UploadCloud, ListChecks, Inbox, LogOut } from 'lucide-react';
import { DocumentPublisherForm } from './DocumentPublisherForm';
import { DocumentManagerTable } from './DocumentManagerTable';
import { FeedbackInboxTable } from './FeedbackInboxTable';
import type { CurriculumResource } from '../../data/curriculumData';
import type { StudentFeedback } from '../../data/feedbackData';

interface AdminDashboardViewProps {
  resources: CurriculumResource[];
  feedbackList: StudentFeedback[];
  onAddResource: (newRes: CurriculumResource) => void;
  onDeleteResource: (id: string) => void;
  onResolveFeedback: (id: string) => void;
  onLogout: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  resources,
  feedbackList,
  onAddResource,
  onDeleteResource,
  onResolveFeedback,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'publish' | 'manage' | 'inbox'>('publish');

  const pendingFeedbackCount = feedbackList.filter((f) => f.status === 'pending').length;

  return (
    <div className="w-full py-10 lg:py-14 px-6 md:px-12 xl:px-16 bg-[#F6F0E4] animate-fadeSlideUp">
      
      {/* Top Banner & Logout: Broadsheet Double Rule */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 broadsheet-double-b text-left">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1.5">
            <Shield className="w-4 h-4 text-[#8B0000]" />
            <span>KHU VỰC QUẢN TRỊ SƯ PHẠM</span>
            <span>•</span>
            <span>BẢO MẬT GIÁO VIÊN</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1615] tracking-tight">
            Bàn Điều Khiển & Phân Phối Học Liệu
          </h2>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 border border-[#1A1615] hover:bg-[#8B0000] hover:text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Khóa Bàn Quản Trị</span>
        </button>
      </div>

      {/* Overview 4 Quick Metrics: Open Broadsheet Ledger Band (Zero Card Boxes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1A1615]/20 border-y-2 border-[#1A1615] mb-8 text-left py-4">
        <div className="p-3 sm:p-4">
          <span className="block text-[11px] font-mono text-[#4A3E3D] uppercase font-bold">TỔNG TÀI LIỆU</span>
          <span className="block font-mono text-3xl sm:text-4xl font-black text-[#1A1615] mt-1">{resources.length}</span>
          <span className="text-[10px] font-mono text-green-800">Đang lưu trữ & mở tải</span>
        </div>

        <div className="p-3 sm:p-4">
          <span className="block text-[11px] font-mono text-[#4A3E3D] uppercase font-bold">BÀI TẬP VỀ NHÀ</span>
          <span className="block font-mono text-3xl sm:text-4xl font-black text-[#8B0000] mt-1">
            {resources.filter((r) => r.category === 'homework').length}
          </span>
          <span className="text-[10px] font-mono text-[#4A3E3D]">Khối 10, 11 và 12</span>
        </div>

        <div className="p-3 sm:p-4">
          <span className="block text-[11px] font-mono text-[#4A3E3D] uppercase font-bold">ĐỀ THI & ĐỀ CƯƠNG</span>
          <span className="block font-mono text-3xl sm:text-4xl font-black text-[#C59B27] mt-1">
            {resources.filter((r) => r.category === 'exam').length}
          </span>
          <span className="text-[10px] font-mono text-[#4A3E3D]">Kèm đáp án giải thích</span>
        </div>

        <div className="p-3 sm:p-4">
          <span className="block text-[11px] font-mono text-[#4A3E3D] uppercase font-bold">PHẢN HỒI CẦN SỬA</span>
          <span className={`block font-mono text-3xl sm:text-4xl font-black mt-1 ${pendingFeedbackCount > 0 ? 'text-[#8B0000]' : 'text-green-800'}`}>
            {pendingFeedbackCount}
          </span>
          <span className="text-[10px] font-mono text-[#4A3E3D]">Từ học sinh gửi về</span>
        </div>
      </div>

      {/* Admin Tab Switching Navigation: Open Broadsheet Tabs (No Card Boxes) */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-3 hairline-b text-left">
        <button
          onClick={() => setActiveTab('publish')}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === 'publish'
              ? 'border-[#8B0000] text-[#8B0000] bg-[#ECE3D0]/60'
              : 'border-transparent text-[#4A3E3D] hover:text-[#1A1615]'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>1. Đăng Tải Tài Liệu Mới</span>
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === 'manage'
              ? 'border-[#8B0000] text-[#8B0000] bg-[#ECE3D0]/60'
              : 'border-transparent text-[#4A3E3D] hover:text-[#1A1615]'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span>2. Quản Lý Danh Mục ({resources.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inbox')}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === 'inbox'
              ? 'border-[#8B0000] text-[#8B0000] bg-[#ECE3D0]/60'
              : 'border-transparent text-[#4A3E3D] hover:text-[#1A1615]'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>3. Hộp Thư Báo Lỗi ({feedbackList.length})</span>
          {pendingFeedbackCount > 0 && (
            <span className="px-1.5 py-0.2 bg-[#8B0000] text-white text-[10px] font-bold font-mono">
              {pendingFeedbackCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="text-left">
        {activeTab === 'publish' && (
          <DocumentPublisherForm onPublish={onAddResource} />
        )}

        {activeTab === 'manage' && (
          <DocumentManagerTable
            resources={resources}
            onDeleteResource={onDeleteResource}
          />
        )}

        {activeTab === 'inbox' && (
          <FeedbackInboxTable
            feedbackList={feedbackList}
            onResolveFeedback={onResolveFeedback}
          />
        )}
      </div>

    </div>
  );
};
