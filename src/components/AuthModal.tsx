import React, { useState } from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; school?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState<'11' | '12'>('12');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: 'Nguyễn Văn An (Sĩ tử 2026)',
        email: 'hocsinh.lichsu2026@gmail.com',
        school: 'THPT Chuyên Hà Nội - Amsterdam',
      };
      localStorage.setItem('dam_me_lich_su_user', JSON.stringify(mockUser));
      setIsLoading(false);
      onLoginSuccess(mockUser);
      onClose();
    }, 700);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const user = {
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@thpt.edu.vn`,
      school: school.trim() || `Trường THPT Khối ${grade}`,
    };
    localStorage.setItem('dam_me_lich_su_user', JSON.stringify(user));
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeUp">
      <div 
        className="relative w-full max-w-md bg-[#FDFBF7] border-2 border-[#D4A373] rounded-2xl shadow-2xl overflow-hidden text-left"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#582F0E] text-[#FAEDCD] px-6 py-4 flex items-center justify-between border-b border-[#D4A373]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4A373]" />
            <span className="font-cinzel text-base font-bold">
              XÁC THỰC LUYỆN THI TRẮC NGHIỆM
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#FAEDCD] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-5">
          <div className="text-sm text-[#1E293B]/80 leading-relaxed">
            Theo quy định hệ thống, học sinh đăng nhập tài khoản để <strong>lưu kết quả bài thi</strong>, nhận bảng giải thích chi tiết và theo dõi biểu đồ tiến bộ điểm số.
          </div>

          {/* 1-Touch Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-stone-50 border-2 border-stone-200 hover:border-[#780000] text-stone-800 font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isLoading ? 'Đang xác thực Google...' : 'Đăng nhập 1 chạm qua Google'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#D4A373]/30"></div>
            <span className="text-xs font-mono text-stone-400 uppercase">Hoặc Nhập Nhanh Sĩ Tử</span>
            <div className="h-px flex-1 bg-[#D4A373]/30"></div>
          </div>

          {/* Quick Registration Form */}
          <form onSubmit={handleSubmitForm} className="space-y-3.5">
            <div>
              <label htmlFor="student-name" className="block text-xs font-bold text-[#582F0E] uppercase mb-1">
                Họ và Tên Học Sinh <span className="text-[#780000]">*</span>
              </label>
              <input
                id="student-name"
                name="studentName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Trần Quốc Tuấn"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#D4A373]/60 focus:border-[#780000] text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="student-school" className="block text-xs font-bold text-[#582F0E] uppercase mb-1">
                  Trường THPT
                </label>
                <input
                  id="student-school"
                  name="studentSchool"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Ví dụ: THPT Lê Hồng Phong"
                  className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#D4A373]/60 focus:border-[#780000] text-sm outline-none"
                />
              </div>

              <div>
                <label htmlFor="student-grade" className="block text-xs font-bold text-[#582F0E] uppercase mb-1">
                  Khối Lớp
                </label>
                <select
                  id="student-grade"
                  name="studentGrade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as '11' | '12')}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4A373]/60 focus:border-[#780000] text-sm outline-none"
                >
                  <option value="12">Lớp 12 (Ôn thi TN)</option>
                  <option value="11">Lớp 11 (Cơ bản)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="student-email" className="block text-xs font-bold text-[#582F0E] uppercase mb-1">
                Email nhận bảng điểm (Tùy chọn)
              </label>
              <input
                id="student-email"
                name="studentEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#D4A373]/60 focus:border-[#780000] text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-[#780000] hover:bg-[#5E0000] text-white font-bold text-sm rounded-xl transition-all shadow cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Bắt Đầu Làm Bài Ngay</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
