import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav style={{ padding: '1rem', justifyContent: 'left' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', gap: '1rem', margin: 1, padding: 0, justifyContent: 'center' }}>
        <li>
          <Link to="/" style={{color: 'white'}}>Home</Link>
        </li>
        <li>
          <Link to="/SavedCandidates" style={{color: 'white'}}>Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

// style={{ listStyleType: 'none', display: 'flex', gap: '1rem', margin: 1, padding: 0 }}
// style={{ padding: '1rem', backgroundColor: '#f0f0f0'}}