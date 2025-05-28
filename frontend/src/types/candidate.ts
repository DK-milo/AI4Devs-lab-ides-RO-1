export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'HIRED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  education: Education[];
  workExperience: WorkExperience[];
  documents: Document[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Document {
  id: number;
  type: 'CV' | 'COVER_LETTER' | 'CERTIFICATE' | 'OTHER';
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education: EducationFormData[];
  workExperience: WorkExperienceFormData[];
  documents: DocumentFormData[];
}

export interface EducationFormData {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface WorkExperienceFormData {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface DocumentFormData {
  type: 'CV' | 'COVER_LETTER' | 'CERTIFICATE' | 'OTHER';
  file: File;
} 