import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import {
  DEFAULT_TEACHER_EMAIL,
  signInTeacherWithEmail,
  sendPasswordResetLink,
  updateTeacherPassword,
} from '../../services/teacherAuthService';

export type AuthModalMode = 'email_login' | 'forgot_password' | 'recovery' | 'pin_login';

interface AdminPinModalProps {
  isOpen: boolean;
  initialMode?: AuthModalMode;
  onSuccess: (teacherInfo?: { email?: string; fullName?: string }) => void;
  onCancel: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  initialMode = 'email_login',
  onSuccess,
  onCancel,
}) => {
  const [mode, setMode] = useState<AuthModalMode>(initialMode);

  // Email & Password Login (never pre-fill teacher email so students do not see it)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Password Recovery (After clicking email reset link)
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  // Offline PIN fallback
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setEmail('');
      setPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setPin('');
      setShowPassword(false);
      setShowNewPassword(false);
      setShowPin(false);
      setError('');
      setSuccessMsg('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const switchMode = (nextMode: AuthModalMode) => {
    setMode(nextMode);
    setError('');
    setSuccessMsg('');
  };

  const handleEmailLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    const res = await signInTeacherWithEmail(email, password);
    setIsSubmitting(false);

    if (!res.ok) {
      setError(res.error || 'Đăng nhập không thành công.');
      return;
    }

    setPassword('');
    onSuccess({ email: res.email, fullName: res.fullName });
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    const res = await sendPasswordResetLink(email);
    setIsSubmitting(false);

    if (!res.ok) {
      setError(res.error || 'Không thể gửi email đổi mật khẩu.');
      return;
    }

    setSuccessMsg(
      res.message ||
        `Đã gửi link đổi mật khẩu tới ${email}. Vui lòng mở hộp thư và bấm vào đường link để đặt lại mật khẩu!`
    );
  };

  const handleRecoveryUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Hai lần nhập mật khẩu mới chưa trùng khớp!');
      return;
    }

    setIsSubmitting(true);
    const res = await updateTeacherPassword(newPassword);
    setIsSubmitting(false);

    if (!res.ok) {
      setError(res.error || 'Không thể cập nhật mật khẩu mới.');
      return;
    }

    setNewPassword('');
    setConfirmNewPassword('');
    setSuccessMsg('Đã cập nhật mật khẩu mới thành công! Đang mở Bàn Quản Trị...');
    setTimeout(() => {
      onSuccess({ email: res.email || DEFAULT_TEACHER_EMAIL });
    }, 1000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '19022008') {
      setError('');
      setPin('');
      onSuccess({ email: DEFAULT_TEACHER_EMAIL, fullName: 'Giáo viên (Mã PIN dự phòng)' });
    } else {
      setError('Mã PIN không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeSlideUp"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-md bg-[#FAF8F1] border-2 border-[#0A1418] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-6 pb-4 broadsheet-double-b">
          <div className="w-12 h-12 rounded-none bg-[#0A1418] text-[#E5C985] flex items-center justify-center mx-auto mb-2 shadow">
            {mode === 'recovery' ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <h3 className="font-playfair text-2xl font-black text-[#0A1418]">
            {mode === 'forgot_password'
              ? 'Khôi Phục / Đổi Mật Khẩu'
              : mode === 'recovery'
              ? 'Đặt Mật Khẩu Giáo Viên Mới'
              : 'Đăng Nhập Giáo Viên'}
          </h3>
          <p className="text-xs font-mono text-[#687477]">
            {mode === 'forgot_password'
              ? 'GỬI LIÊN KẾT ĐỔI MẬT KHẨU AN TOÀN QUA EMAIL'
              : mode === 'recovery'
              ? 'XÁC THỰC TỪ LIÊN KẾT EMAIL THÀNH CÔNG'
              : 'KHU VỰC QUẢN TRỊ SƯ PHẠM & ĐĂNG BÀI GIẢNG'}
          </p>
        </div>

        {/* MODE 1: EMAIL + PASSWORD LOGIN */}
        {mode === 'email_login' && (
          <form onSubmit={handleEmailLoginSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="teacher-login-email"
                className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span>Email Giáo Viên:</span>
              </label>
              <input
                id="teacher-login-email"
                name="teacherEmail"
                type="email"
                autoComplete="off"
                autoFocus
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập email giáo viên..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#0A1418]/30 focus:border-[#9C3B32] font-sans text-sm outline-none text-[#0A1418]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="teacher-login-password"
                  className="text-xs font-mono font-bold text-[#0A1418] uppercase flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#9C3B32]" />
                  <span>Mật Khẩu:</span>
                </label>
                <button
                  type="button"
                  onClick={() => switchMode('forgot_password')}
                  className="text-[11px] font-mono text-[#9C3B32] hover:underline font-semibold cursor-pointer"
                >
                  Đổi / Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <input
                  id="teacher-login-password"
                  name="teacherPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập mật khẩu giáo viên..."
                  className="w-full px-3.5 py-2.5 pr-11 bg-white border border-[#0A1418]/30 focus:border-[#9C3B32] font-mono text-sm outline-none text-[#0A1418]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#687477] hover:text-[#0A1418] cursor-pointer"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-[#9C3B32] text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#9C3B32] mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3 hairline-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-3.5 py-2 text-xs font-mono uppercase text-[#687477] hover:text-[#0A1418] cursor-pointer"
              >
                Trang Chủ
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#9C3B32] hover:bg-[#7e2e26] disabled:opacity-60 text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{isSubmitting ? 'Đang Xác Thực...' : 'Đăng Nhập Bàn Quản Trị'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-3 border-t border-[#0A1418]/10 text-center">
              <button
                type="button"
                onClick={() => switchMode('pin_login')}
                className="text-[11px] font-mono text-[#687477] hover:text-[#0A1418] underline cursor-pointer"
              >
                Mất mạng? Chuyển sang xác thực bằng Mã PIN dự phòng
              </button>
            </div>
          </form>
        )}

        {/* MODE 2: FORGOT / SEND PASSWORD RESET LINK VIA EMAIL */}
        {mode === 'forgot_password' && (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <p className="text-xs font-sans text-[#0A1418]/80 leading-relaxed bg-[#F3EFE5] p-3 border border-[#0A1418]/15">
              Nhập địa chỉ Email tài khoản giáo viên của bạn. Hệ thống sẽ gửi một liên kết đổi mật khẩu an toàn trực tiếp vào hộp thư Gmail.
            </p>

            <div>
              <label
                htmlFor="teacher-reset-email"
                className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span>Email Nhận Link Đổi Mật Khẩu:</span>
              </label>
              <input
                id="teacher-reset-email"
                name="resetEmail"
                type="email"
                autoComplete="off"
                autoFocus
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập email giáo viên để nhận link..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#0A1418]/30 focus:border-[#9C3B32] font-sans text-sm outline-none text-[#0A1418]"
              />
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-[#9C3B32] text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#9C3B32] mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-[#1B4931]/10 border border-[#1B4931]/30 text-[#1B4931] text-xs font-sans flex items-start gap-2 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1B4931] mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3 hairline-t">
              <button
                type="button"
                onClick={() => switchMode('email_login')}
                className="px-3 py-2 text-xs font-mono uppercase text-[#687477] hover:text-[#0A1418] cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay Lại</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] disabled:opacity-60 text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{isSubmitting ? 'Đang Gửi Mail...' : 'Gửi Link Qua Email'}</span>
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* MODE 3: UPDATE PASSWORD AFTER CLICKING RECOVERY LINK */}
        {mode === 'recovery' && (
          <form onSubmit={handleRecoveryUpdateSubmit} className="space-y-4">
            <p className="text-xs font-sans text-[#1B4931] leading-relaxed bg-[#1B4931]/10 p-3 border border-[#1B4931]/25">
              Liên kết khôi phục mật khẩu từ Email hợp lệ. Vui lòng nhập mật khẩu mới (tối thiểu 6 ký tự) để hoàn tất cập nhật.
            </p>

            <div>
              <label
                htmlFor="teacher-new-password"
                className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5"
              >
                Mật Khẩu Mới:
              </label>
              <div className="relative">
                <input
                  id="teacher-new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ít nhất 6 ký tự..."
                  className="w-full px-3.5 py-2.5 pr-11 bg-white border border-[#0A1418]/30 focus:border-[#9C3B32] font-mono text-sm outline-none text-[#0A1418]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#687477] hover:text-[#0A1418] cursor-pointer"
                  aria-label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="teacher-confirm-password"
                className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5"
              >
                Xác Nhận Mật Khẩu Mới:
              </label>
              <input
                id="teacher-confirm-password"
                type={showNewPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập lại mật khẩu mới..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#0A1418]/30 focus:border-[#9C3B32] font-mono text-sm outline-none text-[#0A1418]"
              />
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-[#9C3B32] text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#9C3B32] mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-[#1B4931]/10 border border-[#1B4931]/30 text-[#1B4931] text-xs font-sans flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1B4931] mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3 hairline-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-3.5 py-2 text-xs font-mono uppercase text-[#687477] hover:text-[#0A1418] cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#1B4931] hover:bg-[#143725] disabled:opacity-60 text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{isSubmitting ? 'Đang Lưu...' : 'Lưu Mật Khẩu Mới'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* MODE 4: OFFLINE PIN FALLBACK */}
        {mode === 'pin_login' && (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pin-input"
                className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5 flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span>Nhập Mã PIN Giáo Viên (Dự Phòng):</span>
              </label>
              <div className="relative">
                <input
                  id="admin-pin-input"
                  name="adminPin"
                  type={showPin ? 'text' : 'password'}
                  autoFocus
                  required
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập mã PIN bảo mật..."
                  className="w-full px-4 py-3 pr-11 bg-white border border-[#0A1418]/30 focus:border-[#9C3B32] text-center font-mono text-lg tracking-widest outline-none text-[#0A1418]"
                />
                <button
                  type="button"
                  onClick={() => setShowPin((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#687477] hover:text-[#0A1418] cursor-pointer"
                  title={showPin ? 'Ẩn mã PIN' : 'Hiện mã PIN'}
                  aria-label={showPin ? 'Ẩn mã PIN' : 'Hiện mã PIN'}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-[#9C3B32] text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#9C3B32]" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3 hairline-t">
              <button
                type="button"
                onClick={() => switchMode('email_login')}
                className="px-3.5 py-2 text-xs font-mono uppercase text-[#687477] hover:text-[#0A1418] cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Dùng Email & Pass</span>
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#9C3B32] hover:bg-[#7e2e26] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Xác Thực Mã PIN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
