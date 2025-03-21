# Candidate Search App

The **Candidate Search App** is a React-based application that allows users to browse GitHub profiles, save potential candidates, and manage a list of saved candidates. The app uses the GitHub API to fetch user data and provides an intuitive interface for interacting with candidate profiles.

## Features

- Fetches GitHub user profiles using the GitHub API.
- Displays detailed candidate information, including name, location, email, company, and bio.
- Allows users to:
  - Save candidates to a "Potential Candidates" list.
  - Remove candidates from the saved list.
- Responsive design for a seamless user experience.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: Fast development environment and build tool.
- **GitHub API**: For fetching candidate data.
- **React Icons**: For intuitive and visually appealing icons.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/candidate-search-app.git
   cd candidate-search-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory and add your GitHub API token:
   ```
   VITE_GITHUB_TOKEN=your_github_api_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:5173`.

## Usage

1. **Candidate Search**:
   - Browse through GitHub profiles.
   - Save candidates by clicking the green `+` button.
   - Skip candidates by clicking the red `-` button.

2. **Potential Candidates**:
   - View saved candidates.
   - Remove candidates from the list by clicking the red `-` button.

## Project Structure

```
src/
├── components/
│   └── Nav.tsx          # Navigation bar
├── interfaces/
│   └── Candidate.interface.tsx # TypeScript interface for candidates
├── pages/
│   ├── CandidateSearch.tsx # Main page for browsing candidates
│   └── SavedCandidates.tsx # Page for managing saved candidates
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite environment types
```

## API Integration

The app uses the [GitHub REST API](https://docs.github.com/en/rest) to fetch user data. Ensure you have a valid GitHub API token with the necessary permissions to avoid rate limits.

## Future Enhancements

- Add pagination for browsing more candidates.
- Implement search functionality to filter candidates by name or location.
- Add a loading spinner for better user experience during API calls.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
