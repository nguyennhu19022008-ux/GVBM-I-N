import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './supabaseService';

export const DEFAULT_TEACHER_EMAIL = 'buithidien491982@gmail.com';
export const TEACHER_DIRECTORY_STORAGE_KEY = 'dam_me_lich_su_teacher_directory';
export const TEACHER_EMAIL_STORAGE_KEY = 'dam_me_lich_su_teacher_email';

export const supabaseAuthClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface TeacherProfileEntry {
  email: string;
  fullName: string;
  addedAt: string;
  addedBy?: string;
  status: 'active' | 'pending_email_confirm';
}

export interface AuthActionResult {
  ok: boolean;
  email?: string;
  fullName?: string;
  message?: string;
  error?: string;
  requiresEmailConfirm?: boolean;
}

function normalizeAuthErrorMessage(rawMessage?: string): string {
  const msg = (rawMessage || '').toLowerCase();
  if (msg.includes('invalid login credentials')) {
    return 'Email hoặc mật khẩu chưa chính xác. Vui lòng kiểm tra lại!';
  }
  if (msg.includes('email not confirmed')) {
    return 'Tài khoản này chưa xác nhận email. Vui lòng mở hộp thư (kể cả mục Spam) và bấm vào link xác nhận!';
  }
  if (msg.includes('user already registered') || msg.includes('already been registered')) {
    return 'Email giáo viên này đã tồn tại trên hệ thống!';
  }
  if (msg.includes('password should be at least') || msg.includes('weak_password')) {
    return 'Mật khẩu phải có ít nhất 6 ký tự!';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests') || msg.includes('429')) {
    return 'Hệ thống gửi email đang tạm giới hạn tần suất (SMTP). Vui lòng đợi ít phút rồi thử lại!';
  }
  if (msg.includes('invalid format') || msg.includes('unable to validate email')) {
    return 'Địa chỉ email không đúng định dạng!';
  }
  return rawMessage || 'Đã xảy ra lỗi kết nối xác thực. Vui lòng thử lại!';
}

export function getTeacherDirectory(): TeacherProfileEntry[] {
  const defaultEntry: TeacherProfileEntry = {
    email: DEFAULT_TEACHER_EMAIL,
    fullName: 'GVBM Bùi Thị Điền (Quản trị chính)',
    addedAt: 'Mặc định hệ thống',
    status: 'active',
  };

  try {
    const raw = localStorage.getItem(TEACHER_DIRECTORY_STORAGE_KEY);
    if (!raw) return [defaultEntry];
    const parsed: TeacherProfileEntry[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return [defaultEntry];
    const hasDefault = parsed.some((t) => t.email.toLowerCase() === DEFAULT_TEACHER_EMAIL);
    return hasDefault ? parsed : [defaultEntry, ...parsed];
  } catch {
    return [defaultEntry];
  }
}

export function saveTeacherDirectoryEntry(entry: TeacherProfileEntry): TeacherProfileEntry[] {
  const current = getTeacherDirectory();
  const cleanEmail = entry.email.trim().toLowerCase();
  const existingIdx = current.findIndex((t) => t.email.toLowerCase() === cleanEmail);
  const next = [...current];
  if (existingIdx >= 0) {
    next[existingIdx] = { ...next[existingIdx], ...entry, email: cleanEmail };
  } else {
    next.push({ ...entry, email: cleanEmail });
  }
  try {
    localStorage.setItem(TEACHER_DIRECTORY_STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.warn('Cannot save teacher directory:', err);
  }
  return next;
}

export async function signInTeacherWithEmail(email: string, password: string): Promise<AuthActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'Chưa cấu hình kết nối Supabase Cloud.' };
  }
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !password) {
    return { ok: false, error: 'Vui lòng nhập đầy đủ Email và Mật khẩu!' };
  }

  try {
    const { data, error } = await supabaseAuthClient.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error || !data.user) {
      return { ok: false, error: normalizeAuthErrorMessage(error?.message) };
    }

    const userEmail = data.user.email || cleanEmail;
    const fullName =
      (data.user.user_metadata?.full_name as string | undefined) ||
      (userEmail === DEFAULT_TEACHER_EMAIL ? 'GVBM Bùi Thị Điền' : userEmail.split('@')[0]);

    try {
      sessionStorage.setItem('dam_me_lich_su_admin_auth', 'true');
      sessionStorage.setItem(TEACHER_EMAIL_STORAGE_KEY, userEmail);
      saveTeacherDirectoryEntry({
        email: userEmail,
        fullName,
        addedAt: new Date().toLocaleDateString('vi-VN'),
        status: 'active',
      });
    } catch {
      // Ignore storage failures
    }

    return { ok: true, email: userEmail, fullName };
  } catch (err) {
    return { ok: false, error: normalizeAuthErrorMessage((err as Error)?.message) };
  }
}

export async function sendPasswordResetLink(email: string): Promise<AuthActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'Chưa cấu hình kết nối Supabase Cloud.' };
  }
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) {
    return { ok: false, error: 'Vui lòng nhập địa chỉ Email cần đổi mật khẩu!' };
  }

  try {
    const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
    const { error } = await supabaseAuthClient.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo,
    });

    if (error) {
      return { ok: false, error: normalizeAuthErrorMessage(error.message) };
    }

    return {
      ok: true,
      email: cleanEmail,
      message: `Đã gửi liên kết đổi mật khẩu tới hộp thư ${cleanEmail}. Vui lòng mở email (kiểm tra cả mục Spam) và bấm vào link để đặt mật khẩu mới!`,
    };
  } catch (err) {
    return { ok: false, error: normalizeAuthErrorMessage((err as Error)?.message) };
  }
}

export async function updateTeacherPassword(newPassword: string): Promise<AuthActionResult> {
  if (!newPassword || newPassword.length < 6) {
    return { ok: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự!' };
  }

  try {
    const { data, error } = await supabaseAuthClient.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { ok: false, error: normalizeAuthErrorMessage(error.message) };
    }

    return {
      ok: true,
      email: data.user?.email,
      message: 'Đổi mật khẩu thành công! Mật khẩu mới đã có hiệu lực ngay lập tức.',
    };
  } catch (err) {
    return { ok: false, error: normalizeAuthErrorMessage((err as Error)?.message) };
  }
}

/**
 * Thêm tài khoản Giáo viên mới bằng client cô lập (persistSession: false)
 * để KHÔNG ghi đè phiên đăng nhập của giáo viên hiện tại.
 */
export async function registerAdditionalTeacher(params: {
  email: string;
  password: string;
  fullName?: string;
  addedByEmail?: string;
}): Promise<AuthActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'Chưa cấu hình kết nối Supabase Cloud.' };
  }

  const cleanEmail = params.email.trim().toLowerCase();
  const cleanName = (params.fullName || '').trim() || `Giáo viên (${cleanEmail.split('@')[0]})`;
  if (!cleanEmail) {
    return { ok: false, error: 'Vui lòng nhập Email của giáo viên cần thêm!' };
  }
  if (!params.password || params.password.length < 6) {
    return { ok: false, error: 'Mật khẩu khởi tạo phải có ít nhất 6 ký tự!' };
  }

  try {
    const isolatedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
    const { data, error } = await isolatedClient.auth.signUp({
      email: cleanEmail,
      password: params.password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          role: 'teacher',
          full_name: cleanName,
          invited_by: params.addedByEmail || DEFAULT_TEACHER_EMAIL,
        },
      },
    });

    if (error) {
      return { ok: false, error: normalizeAuthErrorMessage(error.message) };
    }

    if (!data.user) {
      return { ok: false, error: 'Không thể khởi tạo tài khoản giáo viên. Vui lòng thử lại!' };
    }

    // Supabase returns empty identities if email already exists when confirmation is enabled
    if (Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return { ok: false, error: 'Email giáo viên này đã được đăng ký trước đó!' };
    }

    const requiresConfirm = !data.session;
    saveTeacherDirectoryEntry({
      email: cleanEmail,
      fullName: cleanName,
      addedAt: new Date().toLocaleDateString('vi-VN'),
      addedBy: params.addedByEmail || DEFAULT_TEACHER_EMAIL,
      status: requiresConfirm ? 'pending_email_confirm' : 'active',
    });

    return {
      ok: true,
      email: cleanEmail,
      fullName: cleanName,
      requiresEmailConfirm: requiresConfirm,
      message: requiresConfirm
        ? `Đã thêm tài khoản ${cleanEmail} trên hệ thống và gửi email kích hoạt. Giáo viên mới vui lòng bấm link xác nhận trong hộp thư (hoặc Spam) 1 lần để bắt đầu đăng nhập & thêm bài!`
        : `Đã thêm và kích hoạt ngay tài khoản ${cleanEmail}! Giáo viên mới có thể đăng nhập bằng Email + Mật khẩu để đăng bài ngay lập tức.`,
    };
  } catch (err) {
    return { ok: false, error: normalizeAuthErrorMessage((err as Error)?.message) };
  }
}

export async function signOutTeacher(): Promise<void> {
  try {
    sessionStorage.removeItem('dam_me_lich_su_admin_auth');
    sessionStorage.removeItem(TEACHER_EMAIL_STORAGE_KEY);
    await supabaseAuthClient.auth.signOut();
  } catch (err) {
    console.warn('Error signing out teacher:', err);
  }
}
