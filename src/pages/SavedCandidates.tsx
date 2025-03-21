import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { IoRemoveCircle } from 'react-icons/io5';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage
  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  function removeCandidate(id: number): void {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  }
  return (
    <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {savedCandidates.map((candidate) => (
            <div
              key={candidate.id}
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '1rem',
                borderRadius: '10px',
                textAlign: 'left',
                maxWidth: '300px',
                width: '100%',
              }}
            >
              <img
                src={candidate.profilePictureUrl || 'https://via.placeholder.com/150'}
                alt={`${candidate.name}'s avatar`}
                style={{
                  borderRadius: '10px',
                  width: '100%',
                  height: 'auto',
                  marginBottom: '1rem',
                }}
              />
              <h2>{candidate.name}</h2>
              <p>
                <strong>Location:</strong> {candidate.location}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${candidate.email}`} style={{ color: 'cyan' }}>
                  {candidate.email}
                </a>
              </p>
              <p>
                <strong>Company:</strong> {candidate.company}
              </p>
              <p>
                <strong>Bio:</strong> {candidate.bio || 'No bio available'}
              </p>
              <div style={{ justifyContent: 'center', display: 'flex'}}>
              <IoRemoveCircle
              onClick={() => removeCandidate(candidate.id)}
              style={{
                color: 'red',
                border: 'none',
                borderRadius: '50%',
                width: '75px',
                height: '75px',
                cursor: 'pointer',
                justifyContent: 'center',
              }}>
                </IoRemoveCircle>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No candidates have been saved yet</h2>
      )}
    </div>
  );
};

export default SavedCandidates;