import { Candidate, Education, WorkExperience, Document, CandidateStatus, DocType } from '@prisma/client';

export type CandidateCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: EducationCreateInput[];
  workExperience?: WorkExperienceCreateInput[];
  documents?: DocumentCreateInput[];
};

export type EducationCreateInput = {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
};

export type WorkExperienceCreateInput = {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
};

export type DocumentCreateInput = {
  type: DocType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
};

export type CandidateResponse = Candidate & {
  education: Education[];
  workExperience: WorkExperience[];
  documents: Document[];
};

export type CandidateUpdateInput = Partial<CandidateCreateInput> & {
  status?: CandidateStatus;
}; 