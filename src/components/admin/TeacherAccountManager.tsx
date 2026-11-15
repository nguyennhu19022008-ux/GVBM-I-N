import React, { useState } from 'react';
import {
  UserPlus,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Send,
  Users,
  ShieldCheck,
  User,
} from 'lucide-react';
import type { TeacherProfileEntry } from '../../services/teacherAuthService';
import {
  DEFAULT_TEACHER_EMAIL,
  getTeacherDirectory,
  registerAdditionalTeacher,
  sendPasswordResetLink,
} from '../../services/teacherAuthService';

interface TeacherAccountManagerProps {
  currentTeacherEmail: string;
}

export const TeacherAccountManager: React.FC<TeacherAccountManagerProps> = ({
  currentTeacherEmail,
}) => {
  const [directory, setDirectory] = useState<TeacherProfileEntry[]>(() => getTeacherDirectory());

  // Reset current teacher password via email
  const [resetEmailInput, setResetEmailInput] = useState<string>(
    currentTeacherEmail || DEFAULT_TEACHER_EMAIL
  );
  const [isSendingReset, setIsSendingReset] = useState<boolean>(false);
  const [resetStatus, setResetStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Add new teacher form
  const [newTeacherName, setNewTeacherName] = useState<string>('');
  const [newTeacherEmail, setNewTeacherEmail] = useState<string>('');
  const [newTeacherPassword, setNewTeacherPassword] = useState<string>('');
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [isCreatingTeacher, setIsCreatingTeacher] = useState<boolean>(false);
  const [createStatus, setCreateStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  const handleSendResetLink = async (targetEmail: string) => {
    setResetStatus(null);
    setIsSendingReset(true);
    const res = await sendPasswordResetLink(targetEmail);
    setIsSendingReset(false);

    if (res.ok) {
      setResetStatus({
        type: 'ok',
        text:
          res.message ||
          `Đã gửi link đổi mật khẩu tới ${targetEmail}. Vui lòng kiểm tra hộp thư (kể cả Spam) và bấm vào link!`,
      });
    } else {
      setResetStatus({
        type: 'err',
        text: res.error || 'Không thể gửi email đổi mật khẩu.',
      });
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateStatus(null);
    setIsCreatingTeacher(true);

    const res = await registerAdditionalTeacher({
      email: newTeacherEmail,
      password: newTeacherPassword,
      fullName: newTeacherName,
      addedByEmail: currentTeacherEmail || DEFAULT_TEACHER_EMAIL,
    });
    setIsCreatingTeacher(false);

    if (!res.ok) {
      setCreateStatus({
        type: 'err',
        text: res.error || 'Không thể thêm tài khoản giáo viên.',
      });
      return;
    }

    setDirectory(getTeacherDirectory());
    setNewTeacherName('');
    setNewTeacherEmail('');
    setNewTeacherPassword('');
    setCreateStatus({
      type: 'ok',
      text: res.message || 'Đã thêm giáo viên mới thành công!',
    });
  };

  return (
    <div className="py-6 border-y border-[rgba(16,37,43,0.16)] text-left space-y-10">
      {/* SECTION 1: GỬI LINK ĐỔI MẬT KHẨU QUA EMAIL */}
      <div className="space-y-4 pb-8 border-b border-[rgba(16,37,43,0.16)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#9C3B32]" />
            <div>
              <h4 className="font-playfair text-xl font-bold text-[#0A1418]">
                Đổi Mật Khẩu Tài Khoản Qua Email
              </h4>
              <p className="text-xs font-mono text-[#687477]">
                ĐANG ĐĂNG NHẬP: <strong className="text-[#0A1418]">{currentTeacherEmail || DEFAULT_TEACHER_EMAIL}</strong>
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-sans text-[#0A1418]/80 max-w-3xl leading-relaxed">
          Bấm nút bên dưới để hệ thống gửi một đường dẫn đổi mật khẩu bảo mật về hộp thư Gmail của bạn. Khi bấm vào link trong email, trang web sẽ mở ngay cửa sổ nhập mật khẩu mới.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
          <input
            type="email"
            value={resetEmailInput}
            onChange={(e) => setResetEmailInput(e.target.value)}
            placeholder="Nhập email cần nhận link đổi mật khẩu..."
            className="flex-1 px-3.5 py-2.5 bg-white border border-[rgba(16,37,43,0.28)] focus:border-[#9C3B32] text-sm font-sans outline-none text-[#0A1418]"
          />
          <button
            type="button"
            disabled={isSendingReset || !resetEmailInput.trim()}
            onClick={() => handleSendResetLink(resetEmailInput)}
            className="px-5 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] disabled:opacity-60 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-[#E5C985]" />
            <span>{isSendingReset ? 'Đang Gửi...' : 'Gửi Link Đổi Mật Khẩu Qua Mail'}</span>
          </button>
        </div>

        {resetStatus && (
          <div
            className={`p-3 border text-xs font-sans flex items-start gap-2 max-w-2xl ${
              resetStatus.type === 'ok'
                ? 'bg-[#1B4931]/10 border-[#1B4931]/30 text-[#1B4931]'
                : 'bg-red-50 border-red-200 text-[#9C3B32]'
            }`}
          >
            {resetStatus.type === 'ok' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{resetStatus.text}</span>
          </div>
        )}
      </div>

      {/* SECTION 2: THÊM GIÁO VIÊN MỚI BẰNG EMAIL & MẬT KHẨU */}
      <div className="space-y-5 pb-8 border-b border-[rgba(16,37,43,0.16)]">
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-[#1B4931]" />
          <div>
            <h4 className="font-playfair text-xl font-bold text-[#0A1418]">
              Thêm Giáo Viên Mới (Cấp Quyền Đăng Bài)
            </h4>
            <p className="text-xs font-mono text-[#687477]">
              NHẬP EMAIL & MẬT KHẨU ĐỂ GIÁO VIÊN ĐỒNG NGHIỆP ĐĂNG NHẬP VÀ ĐĂNG HỌC LIỆU VÀO WEBSITE
            </p>
          </div>
        </div>

        <form onSubmit={handleAddTeacher} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
          <div>
            <label
              htmlFor="add-teacher-name"
              className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#687477]" />
              <span>Họ Tên Giáo Viên:</span>
            </label>
            <input
              id="add-teacher-name"
              type="text"
              value={newTeacherName}
              onChange={(e) => setNewTeacherName(e.target.value)}
              placeholder="VD: Cô Nguyễn Thị Lan"
              className="w-full px-3.5 py-2.5 bg-white border border-[rgba(16,37,43,0.28)] focus:border-[#1B4931] text-sm font-sans outline-none text-[#0A1418]"
            />
          </div>

          <div>
            <label
              htmlFor="add-teacher-email"
              className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#9C3B32]" />
              <span>
                Email Giáo Viên: <span className="text-[#9C3B32]">*</span>
              </span>
            </label>
            <input
              id="add-teacher-email"
              type="email"
              required
              value={newTeacherEmail}
              onChange={(e) => setNewTeacherEmail(e.target.value)}
              placeholder="giaovien@gmail.com"
              className="w-full px-3.5 py-2.5 bg-white border border-[rgba(16,37,43,0.28)] focus:border-[#1B4931] text-sm font-sans outline-none text-[#0A1418]"
            />
          </div>

          <div>
            <label
              htmlFor="add-teacher-pass"
              className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5 flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#9C3B32]" />
              <span>
                Mật Khẩu (≥ 6 ký tự): <span className="text-[#9C3B32]">*</span>
              </span>
            </label>
            <div className="relative">
              <input
                id="add-teacher-pass"
                type={showNewPass ? 'text' : 'password'}
                required
                minLength={6}
                value={newTeacherPassword}
                onChange={(e) => setNewTeacherPassword(e.target.value)}
                placeholder="Nhập mật khẩu khởi tạo..."
                className="w-full px-3.5 py-2.5 pr-10 bg-white border border-[rgba(16,37,43,0.28)] focus:border-[#1B4931] text-sm font-mono outline-none text-[#0A1418]"
              />
              <button
                type="button"
                onClick={() => setShowNewPass((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687477] hover:text-[#0A1418] cursor-pointer"
                aria-label={showNewPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <span className="text-xs font-sans text-[#687477]">
              Tài khoản được lưu trực tiếp lên Supabase Auth để giáo viên mới đăng nhập và đăng bài tập/đề thi từ mọi thiết bị.
            </span>
            <button
              type="submit"
              disabled={isCreatingTeacher}
              className="px-5 py-2.5 bg-[#1B4931] hover:bg-[#143725] disabled:opacity-60 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isCreatingTeacher ? 'Đang Tạo Tài Khoản...' : 'Thêm Giáo Viên Mới'}</span>
            </button>
          </div>
        </form>

        {createStatus && (
          <div
            className={`p-3 border text-xs font-sans flex items-start gap-2 max-w-5xl leading-relaxed ${
              createStatus.type === 'ok'
                ? 'bg-[#1B4931]/10 border-[#1B4931]/30 text-[#1B4931]'
                : 'bg-red-50 border-red-200 text-[#9C3B32]'
            }`}
          >
            {createStatus.type === 'ok' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{createStatus.text}</span>
          </div>
        )}
      </div>

      {/* SECTION 3: DANH SÁCH GIÁO VIÊN ĐÃ CẤP QUYỀN */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#0A1418]" />
          <h4 className="font-playfair text-xl font-bold text-[#0A1418]">
            Danh Sách Giáo Viên Cộng Tác ({directory.length})
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#F3EFE5] border-b border-[rgba(16,37,43,0.16)] font-mono text-[#687477] uppercase text-[11px]">
                <th className="py-2.5 px-3">Giáo Viên</th>
                <th className="py-2.5 px-3">Email Đăng Nhập</th>
                <th className="py-2.5 px-3">Trạng Thái</th>
                <th className="py-2.5 px-3">Ngày Cấp</th>
                <th className="py-2.5 px-3 text-right">Hỗ Trợ Đổi Pass</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(16,37,43,0.1)]">
              {directory.map((teacher) => (
                <tr key={teacher.email} className="hover:bg-[#F3EFE5]/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#0A1418]">{teacher.fullName}</td>
                  <td className="py-2.5 px-3 font-mono text-[#0A1418]">{teacher.email}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                        teacher.status === 'active'
                          ? 'bg-[#1B4931]/15 text-[#1B4931]'
                          : 'bg-[#B47818]/15 text-[#B47818]'
                      }`}
                    >
                      {teacher.status === 'active' ? 'Đã kích hoạt' : 'Chờ xác nhận Mail'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[#687477]">{teacher.addedAt}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleSendResetLink(teacher.email)}
                      className="px-2.5 py-1 border border-[#0A1418]/25 hover:border-[#9C3B32] hover:bg-[#9C3B32] hover:text-white text-[11px] font-mono font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Gửi link đổi pass</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
