# Searchorama

A movie search application built with React, TypeScript, and Tailwind CSS, powered by the TMDB API.

## Features

- Browse popular movies
- Search movies by title
- View detailed movie information
- Smooth view transitions
- Modern UI with Tailwind CSS and shadcn/ui
- Responsive design
- Fast development with Vite

## Tech Stack

- **Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: TanStack Query (React Query) v5
- **Routing**: React Router v7
- **Testing**: Vitest + React Testing Library
- **Linting/Formatting**: Biome
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/axeberg/searchorama.git
   cd searchorama
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your TMDB API credentials:
   ```
   VITE_TMDB_ACCESS_KEY=your_api_key_here
   VITE_API_BASE_URL=https://api.themoviedb.org/3
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### Development

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Testing

```bash
npm test            # Run tests in watch mode
npm run test:run    # Run tests once
npm run test:ui     # Open Vitest UI
npm run coverage    # Generate coverage report
```

### Code Quality

```bash
npm run lint        # Check for linting issues
npm run lint:fix    # Fix linting issues
npm run format      # Check formatting
npm run format:fix  # Fix formatting issues
npm run check       # Run lint + format checks
npm run check:fix   # Fix all issues (lint + format)
npm run typecheck   # Run TypeScript type checking
```

## Development Workflow

### Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to run pre-commit checks automatically:

- Runs Biome to lint and format staged files
- Ensures code quality before commits

### CI/CD

GitHub Actions workflow runs on every push and pull request:

1. Type checking
2. Linting and formatting checks
3. Test suite
4. Production build verification
5. Coverage reporting

## Project Structure

```
searchorama/
├── .github/
│   └── workflows/      # GitHub Actions CI/CD
├── .husky/            # Git hooks
├── src/
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries
│   ├── services/      # API services
│   ├── test/          # Test setup
│   └── utils/         # Utility functions
├── biome.json         # Biome configuration
├── vite.config.ts     # Vite configuration
├── vitest.config.ts   # Vitest configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## API

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

To get an API key:
1. Create an account at [TMDB](https://www.themoviedb.org/)
2. Go to Settings > API
3. Request an API key
4. Add it to your `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run check && npm test:run`)
5. Commit your changes (pre-commit hooks will run automatically)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
