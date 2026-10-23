export interface Company {
  id?: number;
  short_name?: string;
  name: string;
}

export interface Category {
  name: string;
}

export interface Level {
  name: string;
  short_name?: string;
}

export interface Location {
  name: string;
}

export interface JobRefs {
  landing_page?: string;
}

export interface Job {
  id: number | string;
  name: string;
  type?: string;
  publication_date: string;
  short_name?: string;
  model_type?: string;
  contents: string; // HTML formatted job description
  categories: Category[];
  levels: Level[];
  tags?: string[];
  locations: Location[];
  company: Company;
  refs?: JobRefs;
  salary_range?: string;
}

export interface TheMuseApiResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  total: number;
  took?: number;
  timed_out?: boolean;
  results: Job[];
}

export interface JobFilter {
  search: string;
  category: string;
  level: string;
  location: string;
}

export interface JobApplication {
  id: string;
  jobId: number | string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  portfolioUrl?: string;
  coverLetter?: string;
  resumeFileName?: string;
  appliedAt: string;
  status: 'İnceleniyor' | 'İletildi' | 'Kabul Edildi';
}
