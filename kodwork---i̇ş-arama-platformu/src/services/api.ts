import { Job, TheMuseApiResponse } from '../types/job';
import { fallbackJobs } from '../data/mockJobs';

const THE_MUSE_API_BASE = 'https://www.themuse.com/api/public/jobs';

export interface FetchJobsParams {
  page?: number;
  category?: string;
  level?: string;
  location?: string;
  search?: string;
}

export interface FetchJobsResult {
  jobs: Job[];
  page: number;
  pageCount: number;
  total: number;
  isLiveApi: boolean;
  errorMessage?: string;
}

export async function fetchJobs(params: FetchJobsParams = {}): Promise<FetchJobsResult> {
  const page = params.page || 1;
  const queryParams = new URLSearchParams();
  queryParams.append('page', String(page));

  if (params.category && params.category !== 'all') {
    queryParams.append('category', params.category);
  }
  if (params.level && params.level !== 'all') {
    queryParams.append('level', params.level);
  }
  if (params.location && params.location !== 'all') {
    queryParams.append('location', params.location);
  }

  const url = `${THE_MUSE_API_BASE}?${queryParams.toString()}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`The Muse API yanıt vermedi (Durum Kodu: ${response.status})`);
    }

    const data: TheMuseApiResponse = await response.json();
    
    // In case the API returns empty results, or results need text filtering
    let filteredResults = data.results || [];
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      filteredResults = filteredResults.filter(job => 
        job.name.toLowerCase().includes(q) ||
        job.company?.name.toLowerCase().includes(q) ||
        job.categories?.some(c => c.name.toLowerCase().includes(q)) ||
        job.locations?.some(l => l.name.toLowerCase().includes(q))
      );
    }

    // Combine with curated tech jobs on page 1 so user always gets the best of both worlds
    let finalJobs = filteredResults;
    if (page === 1) {
      // Prepend or merge curated local jobs if not already present
      const existingIds = new Set(filteredResults.map(j => String(j.id)));
      const extraToAdd = fallbackJobs.filter(fj => !existingIds.has(String(fj.id)));
      finalJobs = [...extraToAdd, ...filteredResults];
    }

    return {
      jobs: finalJobs,
      page: data.page || page,
      pageCount: data.page_count || 10,
      total: data.total || finalJobs.length,
      isLiveApi: true
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'The Muse API bağlantısı kurulamadı';
    console.warn('The Muse API fetch failed, falling back to curated data:', message);

    // Apply filtering to fallback jobs
    let filtered = [...fallbackJobs];

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(j => 
        j.categories.some(c => c.name.toLowerCase().includes(params.category!.toLowerCase()))
      );
    }

    if (params.level && params.level !== 'all') {
      filtered = filtered.filter(j => 
        j.levels.some(l => l.name.toLowerCase().includes(params.level!.toLowerCase()))
      );
    }

    if (params.location && params.location !== 'all') {
      filtered = filtered.filter(j => 
        j.locations.some(l => l.name.toLowerCase().includes(params.location!.toLowerCase()))
      );
    }

    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(j => 
        j.name.toLowerCase().includes(q) ||
        j.company?.name.toLowerCase().includes(q) ||
        j.locations?.some(l => l.name.toLowerCase().includes(q))
      );
    }

    return {
      jobs: filtered,
      page: 1,
      pageCount: 1,
      total: filtered.length,
      isLiveApi: false,
      errorMessage: message
    };
  }
}

export async function fetchJobById(id: number | string): Promise<Job | null> {
  // First check if it's in our curated dataset
  const localJob = fallbackJobs.find(j => String(j.id) === String(id));
  if (localJob) return localJob;

  try {
    const response = await fetch(`${THE_MUSE_API_BASE}/${id}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) return null;
    const data: Job = await response.json();
    return data;
  } catch {
    return null;
  }
}
