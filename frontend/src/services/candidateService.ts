import { Candidate, CandidateFormData } from '../types/candidate';

const API_URL = 'http://localhost:3010/api';

export const candidateService = {
  async createCandidate(data: CandidateFormData): Promise<Candidate> {
    const formData = new FormData();
    
    // Append basic info
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'documents' && key !== 'education' && key !== 'workExperience') {
        formData.append(key, value);
      }
    });

    // Append education and work experience as JSON
    if (data.education.length > 0) {
      formData.append('education', JSON.stringify(data.education));
    }
    if (data.workExperience.length > 0) {
      formData.append('workExperience', JSON.stringify(data.workExperience));
    }

    // Append documents
    data.documents.forEach((doc, index) => {
      formData.append(`documents[${index}][type]`, doc.type);
      formData.append(`documents[${index}][file]`, doc.file);
    });

    const response = await fetch(`${API_URL}/candidates`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create candidate');
    }

    return response.json();
  },

  async getCandidates(): Promise<Candidate[]> {
    const response = await fetch(`${API_URL}/candidates`);
    if (!response.ok) {
      throw new Error('Failed to fetch candidates');
    }
    const data = await response.json();
    return data.data;
  },

  async getCandidateById(id: number): Promise<Candidate> {
    const response = await fetch(`${API_URL}/candidates/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch candidate');
    }
    const data = await response.json();
    return data.data;
  },

  async updateCandidate(id: number, data: Partial<CandidateFormData>): Promise<Candidate> {
    const response = await fetch(`${API_URL}/candidates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update candidate');
    }

    return response.json();
  },

  async deleteCandidate(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/candidates/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete candidate');
    }
  },
}; 