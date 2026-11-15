-- =========================================================================
-- SUPABASE DATABASE SCHEMA FOR "ĐAM MÊ LỊCH SỬ"
-- Run this SQL once in Supabase Dashboard -> SQL Editor
-- =========================================================================

-- 1. Bảng lưu trữ học liệu & đề thi do Giáo viên đăng tải
CREATE TABLE IF NOT EXISTS public.curriculum_resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  grade TEXT NOT NULL CHECK (grade IN ('10', '11', '12')),
  category TEXT NOT NULL CHECK (category IN ('homework', 'exam', 'slide', 'quiz')),
  period TEXT NOT NULL,
  period_facet TEXT,
  description TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('DOCX', 'PDF', 'PPTX', 'QUIZ')),
  file_size TEXT NOT NULL,
  downloads_count INTEGER DEFAULT 0,
  author TEXT NOT NULL DEFAULT 'Thầy Nguyễn Vương Gia',
  created_at TEXT NOT NULL,
  has_answer_key BOOLEAN DEFAULT true,
  highlights JSONB DEFAULT '[]'::jsonb,
  full_content_preview JSONB,
  inserted_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Bảng lưu trữ phản hồi / báo lỗi từ Học sinh gửi về Bàn Quản Trị
CREATE TABLE IF NOT EXISTS public.student_feedback (
  id TEXT PRIMARY KEY,
  student_name TEXT,
  student_email TEXT,
  resource_id TEXT,
  resource_title TEXT NOT NULL,
  issue_type TEXT NOT NULL DEFAULT 'khac',
  description TEXT NOT NULL,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  resolved_at TEXT,
  inserted_at TIMESTAMPTZ DEFAULT now()
);

-- Bật Row Level Security (RLS) và mở quyền đọc/ghi công khai cho ứng dụng tĩnh
ALTER TABLE public.curriculum_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read resources" ON public.curriculum_resources;
CREATE POLICY "Allow public read resources" ON public.curriculum_resources FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert resources" ON public.curriculum_resources;
CREATE POLICY "Allow public insert resources" ON public.curriculum_resources FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete resources" ON public.curriculum_resources;
CREATE POLICY "Allow public delete resources" ON public.curriculum_resources FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read feedback" ON public.student_feedback;
CREATE POLICY "Allow public read feedback" ON public.student_feedback FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert feedback" ON public.student_feedback;
CREATE POLICY "Allow public insert feedback" ON public.student_feedback FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update feedback" ON public.student_feedback;
CREATE POLICY "Allow public update feedback" ON public.student_feedback FOR UPDATE USING (true);
