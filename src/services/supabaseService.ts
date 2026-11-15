import type { CurriculumResource } from '../data/curriculumData';
import type { StudentFeedback } from '../data/feedbackData';

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://jqzqehokvyjxnwnzklrp.supabase.co';
const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  'sb_publishable_N7-tSDbiw1e0V5nBc1IzXQ_NiaLhzsm';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function getHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: SUPABASE_ANON_KEY || '',
    Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

// =========================================================
// 1. CURRICULUM RESOURCES CLOUD SYNC
// =========================================================
export async function fetchCloudResources(): Promise<CurriculumResource[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/curriculum_resources?select=*&order=inserted_at.desc`,
      { headers: getHeaders() }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return rows.map((row: Record<string, unknown>) => ({
      id: row.id as string,
      title: row.title as string,
      grade: row.grade as CurriculumResource['grade'],
      category: row.category as CurriculumResource['category'],
      period: row.period as string,
      periodFacet: (row.period_facet as string) || undefined,
      description: row.description as string,
      format: row.format as CurriculumResource['format'],
      fileSize: row.file_size as string,
      downloadsCount: Number(row.downloads_count || 0),
      author: (row.author as string) || 'Thầy Nguyễn Vương Gia',
      createdAt: row.created_at as string,
      hasAnswerKey: Boolean(row.has_answer_key),
      highlights: (row.highlights as string[]) || [],
      fullContentPreview: (row.full_content_preview as CurriculumResource['fullContentPreview']) || undefined,
    }));
  } catch (err) {
    console.warn('Supabase fetchCloudResources failed, using localStorage:', err);
    return null;
  }
}

export async function insertCloudResource(resource: CurriculumResource): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/curriculum_resources`, {
      method: 'POST',
      headers: getHeaders({ Prefer: 'return=minimal' }),
      body: JSON.stringify({
        id: resource.id,
        title: resource.title,
        grade: resource.grade,
        category: resource.category,
        period: resource.period,
        period_facet: resource.periodFacet || null,
        description: resource.description,
        format: resource.format,
        file_size: resource.fileSize,
        downloads_count: resource.downloadsCount || 0,
        author: resource.author,
        created_at: resource.createdAt,
        has_answer_key: resource.hasAnswerKey,
        highlights: resource.highlights,
        full_content_preview: resource.fullContentPreview || null,
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Supabase insertCloudResource failed:', err);
    return false;
  }
}

export async function deleteCloudResource(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/curriculum_resources?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
        headers: getHeaders(),
      }
    );
    return res.ok;
  } catch (err) {
    console.warn('Supabase deleteCloudResource failed:', err);
    return false;
  }
}

// =========================================================
// 2. STUDENT FEEDBACK CLOUD SYNC
// =========================================================
export async function fetchCloudFeedback(): Promise<StudentFeedback[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/student_feedback?select=*&order=inserted_at.desc`,
      { headers: getHeaders() }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return rows.map((row: Record<string, unknown>) => ({
      id: row.id as string,
      studentName: (row.student_name as string) || undefined,
      studentEmail: (row.student_email as string) || undefined,
      resourceId: (row.resource_id as string) || undefined,
      resourceTitle: row.resource_title as string,
      issueType: (row.issue_type as StudentFeedback['issueType']) || 'khac',
      description: row.description as string,
      createdAt: row.created_at as string,
      status: (row.status as 'pending' | 'resolved') || 'pending',
      resolvedAt: (row.resolved_at as string) || undefined,
    }));
  } catch (err) {
    console.warn('Supabase fetchCloudFeedback failed, using localStorage:', err);
    return null;
  }
}

export async function insertCloudFeedback(fb: StudentFeedback): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/student_feedback`, {
      method: 'POST',
      headers: getHeaders({ Prefer: 'return=minimal' }),
      body: JSON.stringify({
        id: fb.id,
        student_name: fb.studentName || null,
        student_email: fb.studentEmail || null,
        resource_id: fb.resourceId || null,
        resource_title: fb.resourceTitle,
        issue_type: fb.issueType,
        description: fb.description,
        created_at: fb.createdAt,
        status: fb.status,
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Supabase insertCloudFeedback failed:', err);
    return false;
  }
}

export async function resolveCloudFeedback(id: string, resolvedAt: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/student_feedback?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: getHeaders({ Prefer: 'return=minimal' }),
        body: JSON.stringify({
          status: 'resolved',
          resolved_at: resolvedAt,
        }),
      }
    );
    return res.ok;
  } catch (err) {
    console.warn('Supabase resolveCloudFeedback failed:', err);
    return false;
  }
}
