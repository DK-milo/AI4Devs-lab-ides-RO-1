import React, { useState } from 'react';
import { CandidateFormData, EducationFormData, WorkExperienceFormData, DocumentFormData } from '../types/candidate';
import './CandidateForm.css';

interface CandidateFormProps {
  onSubmit: (data: CandidateFormData) => void;
  initialData?: Partial<CandidateFormData>;
}

const initialEducation: EducationFormData = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
};

const initialWorkExperience: WorkExperienceFormData = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
};

export const CandidateForm: React.FC<CandidateFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<CandidateFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    education: initialData?.education || [initialEducation],
    workExperience: initialData?.workExperience || [initialWorkExperience],
    documents: initialData?.documents || [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CandidateFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CandidateFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEducationChange = (index: number, field: keyof EducationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperienceFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newDocuments: DocumentFormData[] = Array.from(e.target.files).map(file => ({
        type: 'CV',
        file,
      }));
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newDocuments],
      }));
    }
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, initialEducation],
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, initialWorkExperience],
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const removeWorkExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="candidate-form">
      <div className="form-section">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="education-entry">
            <div className="entry-header">
              <h3>Education Entry {index + 1}</h3>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="remove-button"
                  aria-label="Remove education entry"
                >
                  ×
                </button>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={`institution-${index}`}>Institution *</label>
              <input
                type="text"
                id={`institution-${index}`}
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`degree-${index}`}>Degree *</label>
              <input
                type="text"
                id={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`field-${index}`}>Field of Study *</label>
              <input
                type="text"
                id={`field-${index}`}
                value={edu.field}
                onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`startDate-${index}`}>Start Date *</label>
                <input
                  type="date"
                  id={`startDate-${index}`}
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`endDate-${index}`}>End Date</label>
                <input
                  type="date"
                  id={`endDate-${index}`}
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`description-${index}`}>Description</label>
              <textarea
                id={`description-${index}`}
                value={edu.description}
                onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEducation} className="add-button">
          Add Education
        </button>
      </div>

      <div className="form-section">
        <h2>Work Experience</h2>
        {formData.workExperience.map((exp, index) => (
          <div key={index} className="work-experience-entry">
            <div className="entry-header">
              <h3>Work Experience Entry {index + 1}</h3>
              {formData.workExperience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  className="remove-button"
                  aria-label="Remove work experience entry"
                >
                  ×
                </button>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={`company-${index}`}>Company *</label>
              <input
                type="text"
                id={`company-${index}`}
                value={exp.company}
                onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`position-${index}`}>Position *</label>
              <input
                type="text"
                id={`position-${index}`}
                value={exp.position}
                onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`workStartDate-${index}`}>Start Date *</label>
                <input
                  type="date"
                  id={`workStartDate-${index}`}
                  value={exp.startDate}
                  onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`workEndDate-${index}`}>End Date</label>
                <input
                  type="date"
                  id={`workEndDate-${index}`}
                  value={exp.endDate}
                  onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`workDescription-${index}`}>Description</label>
              <textarea
                id={`workDescription-${index}`}
                value={exp.description}
                onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addWorkExperience} className="add-button">
          Add Work Experience
        </button>
      </div>

      <div className="form-section">
        <h2>Documents</h2>
        <div className="form-group">
          <label htmlFor="documents">Upload CV and Documents</label>
          <input
            type="file"
            id="documents"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleDocumentChange}
          />
          <p className="help-text">Accepted formats: PDF, DOC, DOCX</p>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          {initialData ? 'Update Candidate' : 'Add Candidate'}
        </button>
      </div>
    </form>
  );
}; 