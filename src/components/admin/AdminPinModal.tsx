import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onSuccess,
  onCancel,
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 19022008 (or 123456 as backup)
    if (pin.trim() === '19022008' || pin.trim() === '123456') {
      setError('');
      onSuccess();
    } else {
      setError('Mã PIN không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeSlideUp">
      <div 
        className="relative w-full max-w-md bg-[#FAF8F1] border-2 border-[#0A1418] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-2 mb-6 pb-4 broadsheet-double-b">
          <div className="w-12 h-12 rounded-none bg-[#0A1418] text-[#E5C985] flex items-center justify-center mx-auto mb-2 shadow">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-playfair text-2xl font-black text-[#0A1418]">
            Khu Vực Quản Trị Sư Phạm
          </h3>
          <p className="text-xs font-mono text-[#687477]">
            DÀNH RIÊNG CHO GIÁO VIÊN & QUẢN TRỊ VIÊN HỆ THỐNG
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-pin-input" className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#9C3B32]" />
              <span>Nhập Mã PIN Giáo Viên:</span>
            </label>
            <input
              id="admin-pin-input"
              name="adminPin"
              type="password"
              autoFocus
              required
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              placeholder="Nhập mã PIN bảo mật..."
              className="w-full px-4 py-3 bg-white border border-[rgba(16,37,43,0.3)] focus:border-[#9C3B32] text-center font-mono text-lg tracking-widest outline-none text-[#0A1418]"
            />
            <p className="text-[11px] font-mono text-[#687477] mt-1.5 text-center">
              (Gợi ý mã mặc định hệ thống: <span className="font-bold text-[#9C3B32]">19022008</span>)
            </p>
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
              onClick={onCancel}
              className="px-4 py-2 text-xs font-mono uppercase text-[#687477] hover:text-[#0A1418] cursor-pointer"
            >
              Quay Về Trang Chủ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#9C3B32] hover:bg-[#7e2e26] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Xác Thực & Vào Bàn Quản Trị</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
