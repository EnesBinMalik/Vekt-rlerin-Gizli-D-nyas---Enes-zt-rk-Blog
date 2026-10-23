import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Job, JobApplication } from '../types/job';
import { fetchJobs, fetchJobById } from '../services/api';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface JobContextType {
  // Navigation & View
  activePage: 'jobs' | 'favorites' | 'applied' | 'about';
  setActivePage: (page: 'jobs' | 'favorites' | 'applied' | 'about') => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  openJobDetail: (job: Job) => void;
  openJobById: (id: number | string) => Promise<void>;

  // Job Listing Data
  jobs: Job[];
  loading: boolean;
  error: string | null;
  isLiveApi: boolean;
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  changePage: (page: number) => void;
  refreshJobs: () => void;

  // Favorites
  favorites: Job[];
  addToFavorites: (job: Job) => boolean;
  removeFromFavorites: (jobId: number | string) => void;
  isFavorite: (jobId: number | string) => boolean;
  clearFavorites: () => void;

  // Applications
  appliedJobs: JobApplication[];
  applyToJob: (data: {
    job: Job;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    portfolioUrl?: string;
    coverLetter?: string;
    resumeFileName?: string;
  }) => void;
  isApplied: (jobId: number | string) => boolean;

  // Toast Notifications
  toasts: ToastState[];
  removeToast: (id: number) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Application Modal state
  applyingForJob: Job | null;
  setApplyingForJob: (job: Job | null) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'kodwork_favorites_v1';
const APPLICATIONS_STORAGE_KEY = 'kodwork_applied_jobs_v1';

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // UI States
  const [activePage, setActivePage] = useState<'jobs' | 'favorites' | 'applied' | 'about'>('jobs');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyingForJob, setApplyingForJob] = useState<Job | null>(null);

  // Listing States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiveApi, setIsLiveApi] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not write favorites to localStorage:', e);
    }
  }, [favorites]);

  // Applied jobs state with localStorage persistence
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(appliedJobs));
    } catch (e) {
      console.warn('Could not write applied jobs to localStorage:', e);
    }
  }, [appliedJobs]);

  // Load jobs from API
  const loadJobs = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchJobs({
        page,
        category: selectedCategory,
        level: selectedLevel,
        location: selectedLocation,
        search: searchQuery
      });

      setJobs(res.jobs);
      setCurrentPage(res.page);
      setTotalPages(res.pageCount);
      setTotalJobs(res.total);
      setIsLiveApi(res.isLiveApi);

      if (res.errorMessage && !res.isLiveApi) {
        setError(res.errorMessage);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'İş ilanları yüklenirken bir hata oluştu.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedLevel, selectedLocation, searchQuery]);

  // Trigger search on filter changes with debounce for search query
  useEffect(() => {
    const timer = setTimeout(() => {
      loadJobs(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedLevel, selectedLocation, loadJobs]);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    loadJobs(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refreshJobs = () => {
    loadJobs(currentPage);
    showToast('İş ilanları listesi güncellendi.', 'info');
  };

  // Open single job detail view
  const openJobDetail = (job: Job) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openJobById = async (id: number | string) => {
    // Check in loaded jobs first
    const existing = jobs.find(j => String(j.id) === String(id));
    if (existing) {
      openJobDetail(existing);
      return;
    }
    setLoading(true);
    const fetched = await fetchJobById(id);
    setLoading(false);
    if (fetched) {
      openJobDetail(fetched);
    } else {
      showToast('İş detayı bulunamadı.', 'warning');
    }
  };

  // Add to favorites - STRICT CHECK to prevent duplicate entries
  const addToFavorites = (job: Job): boolean => {
    const alreadyExists = favorites.some(fav => String(fav.id) === String(job.id));
    if (alreadyExists) {
      showToast(`"${job.name}" zaten favorilerinizde ekli!`, 'warning');
      return false;
    }

    setFavorites(prev => [job, ...prev]);
    showToast(`"${job.name}" favorilere eklendi.`, 'success');
    return true;
  };

  // Remove from favorites
  const removeFromFavorites = (jobId: number | string) => {
    const target = favorites.find(f => String(f.id) === String(jobId));
    setFavorites(prev => prev.filter(fav => String(fav.id) !== String(jobId)));
    showToast(`"${target ? target.name : 'İş ilanı'}" favorilerden kaldırıldı.`, 'info');
  };

  const isFavorite = (jobId: number | string): boolean => {
    return favorites.some(fav => String(fav.id) === String(jobId));
  };

  const clearFavorites = () => {
    if (favorites.length === 0) return;
    setFavorites([]);
    showToast('Tüm favoriler temizlendi.', 'info');
  };

  // Job application
  const applyToJob = ({
    job,
    applicantName,
    applicantEmail,
    applicantPhone,
    portfolioUrl,
    coverLetter,
    resumeFileName
  }: {
    job: Job;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    portfolioUrl?: string;
    coverLetter?: string;
    resumeFileName?: string;
  }) => {
    const newApp: JobApplication = {
      id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      jobId: job.id,
      jobTitle: job.name,
      companyName: job.company?.name || 'Şirket',
      applicantName,
      applicantEmail,
      applicantPhone,
      portfolioUrl,
      coverLetter,
      resumeFileName: resumeFileName || 'Özgeçmiş_Enes_Öztürk.pdf',
      appliedAt: new Date().toISOString(),
      status: 'İletildi'
    };

    setAppliedJobs(prev => [newApp, ...prev.filter(a => String(a.jobId) !== String(job.id))]);
    setApplyingForJob(null);
    showToast(`"${job.name}" pozisyonuna başvurunuz başarıyla iletildi!`, 'success');
  };

  const isApplied = (jobId: number | string): boolean => {
    return appliedJobs.some(app => String(app.jobId) === String(jobId));
  };

  return (
    <JobContext.Provider
      value={{
        activePage,
        setActivePage,
        isDrawerOpen,
        setIsDrawerOpen,
        selectedJob,
        setSelectedJob,
        openJobDetail,
        openJobById,
        jobs,
        loading,
        error,
        isLiveApi,
        currentPage,
        totalPages,
        totalJobs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLevel,
        setSelectedLevel,
        selectedLocation,
        setSelectedLocation,
        changePage,
        refreshJobs,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
        appliedJobs,
        applyToJob,
        isApplied,
        toasts,
        removeToast,
        showToast,
        applyingForJob,
        setApplyingForJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
