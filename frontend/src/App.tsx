import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CandidateForm } from './components/CandidateForm';
import { CandidateDashboard } from './components/CandidateDashboard';
import { CandidateFormData } from './types/candidate';
import { candidateService } from './services/candidateService';
import './App.css';

const CandidateFormPage: React.FC = () => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (data: CandidateFormData) => {
    try {
      await candidateService.createCandidate(data);
      setMessage({
        type: 'success',
        text: 'Candidate added successfully!',
      });
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to add candidate',
      });
    }
  };

  return (
    <div className="form-page">
      <div className="page-header">
        <Link to="/" className="back-button">← Back to Dashboard</Link>
        <h1>Add New Candidate</h1>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
          <button
            className="close-button"
            onClick={() => setMessage(null)}
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}

      <CandidateForm onSubmit={handleSubmit} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>LTI - Candidate Management</h1>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/" element={<CandidateDashboard />} />
            <Route path="/candidates/new" element={<CandidateFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
