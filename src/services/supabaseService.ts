import type { CurriculumResource } from '../data/curriculumData';
import type { StudentFeedback } from '../data/feedbackData';

export const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://jqzqehokvyjxnwnzklrp.supabase.co';
export const SUPABASE_ANON_KEY =
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

// 8-second fetch timeout wrapper
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// =========================================================
// OFFLINE MUTATION QUEUE & AUTO-SYNC
// =========================================================
export const SYNC_QUEUE_KEY = 'dam_me_lich_su_sync_queue';

export interface SyncQueueItem {
  id: string;
  action: 'insert_resource' | 'update_resource' | 'delete_resource' | 'insert_feedback' | 'resolve_feedback';
  payload: any;
  timestamp: number;
}

export function getSyncQueue(): SyncQueueItem[] {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function enqueueSyncAction(action: SyncQueueItem['action'], payload: any): void {
  try {
    const queue = getSyncQueue();
    queue.push({
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      action,
      payload,
      timestamp: Date.now(),
    });
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.warn('Cannot write to sync queue:', e);
  }
}

export function removeSyncQueueItem(id: string): void {
  try {
    const queue = getSyncQueue().filter((item) => item.id !== id);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.warn('Cannot update sync queue:', e);
  }
}

export async function flushSyncQueue(): Promise<void> {
  if (!isSupabaseConfigured || typeof window === 'undefined' || !navigator.onLine) return;
  const queue = getSyncQueue();
  if (queue.length === 0) return;

  for (const item of queue) {
    try {
      let ok = false;
      if (item.action === 'insert_resource') {
        ok = await rawInsertCloudResource(item.payload);
      } else if (item.action === 'update_resource') {
        ok = await rawUpdateCloudResource(item.payload);
      } else if (item.action === 'delete_resource') {
        const targetId = typeof item.payload === 'object' && item.payload ? item.payload.id : item.payload;
        ok = await rawDeleteCloudResource(targetId);
      } else if (item.action === 'insert_feedback') {
        ok = await rawInsertCloudFeedback(item.payload);
      } else if (item.action === 'resolve_feedback') {
        ok = await rawResolveCloudFeedback(item.payload.id, item.payload.resolvedAt, item.payload.teacherReply);
      }

      if (ok) {
        removeSyncQueueItem(item.id);
      }
    } catch (err) {
      console.warn('Error flushing sync item:', item, err);
    }
  }
}

// Trigger queue sync on network reconnection
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    void flushSyncQueue();
  });
}

// =========================================================
// 1. CURRICULUM RESOURCES CLOUD SYNC
// =========================================================
export async function fetchCloudResources(): Promise<CurriculumResource[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const res = await fetchWithTimeout(
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
      author: (row.author as string) || 'GVBM Bùi Thị Điền',
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

async function rawInsertCloudResource(resource: CurriculumResource): Promise<boolean> {
  const res = await fetchWithTimeout(`${SUPABASE_URL}/rest/v1/curriculum_resources`, {
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
}

export async function insertCloudResource(resource: CurriculumResource): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const ok = await rawInsertCloudResource(resource);
    if (!ok) {
      enqueueSyncAction('insert_resource', resource);
    }
    return ok;
  } catch (err) {
    console.warn('Supabase insertCloudResource failed, queued for retry:', err);
    enqueueSyncAction('insert_resource', resource);
    return false;
  }
}

async function rawUpdateCloudResource(resource: CurriculumResource): Promise<boolean> {
  const res = await fetchWithTimeout(
    `${SUPABASE_URL}/rest/v1/curriculum_resources?id=eq.${encodeURIComponent(resource.id)}`,
    {
      method: 'PATCH',
      headers: getHeaders({ Prefer: 'return=minimal' }),
      body: JSON.stringify({
        title: resource.title,
        grade: resource.grade,
        category: resource.category,
        period: resource.period,
        period_facet: resource.periodFacet || null,
        description: resource.description,
        format: resource.format,
        file_size: resource.fileSize,
        author: resource.author,
        has_answer_key: resource.hasAnswerKey,
        highlights: resource.highlights,
        full_content_preview: resource.fullContentPreview || null,
      }),
    }
  );
  return res.ok;
}

export async function updateCloudResource(resource: CurriculumResource): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const ok = await rawUpdateCloudResource(resource);
    if (!ok) {
      enqueueSyncAction('update_resource', resource);
    }
    return ok;
  } catch (err) {
    console.warn('Supabase updateCloudResource failed, queued for retry:', err);
    enqueueSyncAction('update_resource', resource);
    return false;
  }
}

async function rawDeleteCloudResource(id: string): Promise<boolean> {
  const res = await fetchWithTimeout(
    `${SUPABASE_URL}/rest/v1/curriculum_resources?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: getHeaders(),
    }
  );
  return res.ok;
}

export async function deleteCloudResource(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const ok = await rawDeleteCloudResource(id);
    if (!ok) {
      enqueueSyncAction('delete_resource', { id });
    }
    return ok;
  } catch (err) {
    console.warn('Supabase deleteCloudResource failed, queued for retry:', err);
    enqueueSyncAction('delete_resource', { id });
    return false;
  }
}

// =========================================================
// 2. STUDENT FEEDBACK CLOUD SYNC
// =========================================================
export async function fetchCloudFeedback(): Promise<StudentFeedback[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const res = await fetchWithTimeout(
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
      teacherReply: (row.teacher_reply as string) || undefined,
    }));
  } catch (err) {
    console.warn('Supabase fetchCloudFeedback failed, using localStorage:', err);
    return null;
  }
}

async function rawInsertCloudFeedback(fb: StudentFeedback): Promise<boolean> {
  const res = await fetchWithTimeout(`${SUPABASE_URL}/rest/v1/student_feedback`, {
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
      teacher_reply: fb.teacherReply || null,
    }),
  });
  return res.ok;
}

export async function insertCloudFeedback(fb: StudentFeedback): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const ok = await rawInsertCloudFeedback(fb);
    if (!ok) {
      enqueueSyncAction('insert_feedback', fb);
    }
    return ok;
  } catch (err) {
    console.warn('Supabase insertCloudFeedback failed, queued for retry:', err);
    enqueueSyncAction('insert_feedback', fb);
    return false;
  }
}

async function rawResolveCloudFeedback(id: string, resolvedAt: string, teacherReply?: string): Promise<boolean> {
  const res = await fetchWithTimeout(
    `${SUPABASE_URL}/rest/v1/student_feedback?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: getHeaders({ Prefer: 'return=minimal' }),
      body: JSON.stringify({
        status: 'resolved',
        resolved_at: resolvedAt,
        teacher_reply: teacherReply || null,
      }),
    }
  );
  return res.ok;
}

export async function resolveCloudFeedback(id: string, resolvedAt: string, teacherReply?: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const ok = await rawResolveCloudFeedback(id, resolvedAt, teacherReply);
    if (!ok) {
      enqueueSyncAction('resolve_feedback', { id, resolvedAt, teacherReply });
    }
    return ok;
  } catch (err) {
    console.warn('Supabase resolveCloudFeedback failed, queued for retry:', err);
    enqueueSyncAction('resolve_feedback', { id, resolvedAt, teacherReply });
    return false;
  }
}
