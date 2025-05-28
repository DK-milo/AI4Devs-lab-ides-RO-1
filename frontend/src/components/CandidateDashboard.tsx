import React, { useEffect, useState } from 'react';
import { Candidate } from '../types/candidate';
import { candidateService } from '../services/candidateService';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';

export const CandidateDashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await candidateService.getCandidates();
        setCandidates(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await candidateService.deleteCandidate(id);
        setCandidates(candidates.filter(c => c.id !== id));
      } catch (err) {
        setError('Failed to delete candidate');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading candidates...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Candidates</h1>
        <Link to="/candidates/new" className="add-candidate-button">
          Add New Candidate
        </Link>
      </div>

      {candidates.length === 0 ? (
        <div className="empty-state">
          <p>No candidates found</p>
          <Link to="/candidates/new" className="add-candidate-button">
            Add Your First Candidate
          </Link>
        </div>
      ) : (
        <div className="candidates-grid">
          {candidates.map(candidate => (
            <div key={candidate.id} className="candidate-card">
              <div className="candidate-info">
                <h3>{`${candidate.firstName} ${candidate.lastName}`}</h3>
                <p className="email">{candidate.email}</p>
                {candidate.phone && <p className="phone">{candidate.phone}</p>}
                <p className="status">{candidate.status}</p>
              </div>
              <div className="candidate-actions">
                <Link to={`/candidates/${candidate.id}`} className="view-button">
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(candidate.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 