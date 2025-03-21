import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Fetch candidates when the component loads
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Fetch the list of users
        const response = await fetch('https://api.github.com/users', {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // Use the token from .env
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const users = await response.json();

        // Fetch detailed profiles for each user
        const detailedCandidates = await Promise.all(
          users.map(async (user: any) => {
            const userResponse = await fetch(`https://api.github.com/users/${user.login}`, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
              },
            });

            if (!userResponse.ok) {
              throw new Error(`Error fetching user ${user.login}: ${userResponse.status}`);
            }

            const userDetails = await userResponse.json();

            // Map the API response to match the Candidate interface
            return {
              id: userDetails.id,
              name: userDetails.name || userDetails.login,
              email: userDetails.email || 'Not available',
              location: userDetails.location || 'Unknown',
              company: userDetails.company || 'Not available',
              bio: userDetails.bio || 'No bio available',
              profilePictureUrl: userDetails.avatar_url,
            };
          })
        );

        setCandidates(detailedCandidates);
        setCurrentCandidate(detailedCandidates[0] || null);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  // Save the current candidate
  const saveCandidate = () => {
    if (currentCandidate) {
      const updatedSavedCandidates = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      showNextCandidate();
    }
  };

  // Skip the current candidate
  const skipCandidate = () => {
    showNextCandidate();
  };

  // Show the next candidate
  const showNextCandidate = () => {
    const nextCandidates = candidates.slice(1);
    setCandidates(nextCandidates);
    setCurrentCandidate(nextCandidates[0] || null);
  };

  return (
    <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '1rem',
            borderRadius: '10px',
            display: 'inline-block',
            textAlign: 'left',
            maxWidth: '400px',
            position: 'relative',
          }}
        >
          <img
            src={currentCandidate.profilePictureUrl || 'https://via.placeholder.com/150'}
            alt={`${currentCandidate.name}'s avatar`}
            style={{
              borderRadius: '10px',
              width: '100%',
              height: 'auto',
              marginBottom: '1rem',
            }}
          />
          <h2>{currentCandidate.name}</h2>
          <p>
            <strong>Location:</strong> {currentCandidate.location}
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${currentCandidate.email}`} style={{ color: 'cyan' }}>
              {currentCandidate.email}
            </a>
          </p>
          <p>
            <strong>Company:</strong> {currentCandidate.company}
          </p>
          <p>
            <strong>Bio:</strong> {currentCandidate.bio || 'No bio available'}
          </p>
          <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  }}
>
  <IoRemoveCircle
    onClick={skipCandidate}
    style={{
      color: 'red',
      border: 'none',
      borderRadius: '50%',
      width: '75px',
      height: '75px',
      cursor: 'pointer',
    }}
  >
  </IoRemoveCircle>
  <IoAddCircle
    onClick={saveCandidate}
    style={{
      color: 'green',
      border: 'none',
      borderRadius: '50%',
      width: '75px',
      height: '75px',
      cursor: 'pointer',
    }}
  >
  </IoAddCircle>
</div>
        </div>
      ) : (
<h2>No more candidates available</h2>
      )}
    </div>
  );
};

export default CandidateSearch;
