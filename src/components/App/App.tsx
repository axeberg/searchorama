import { createBrowserRouter, Navigate, RouterProvider, useRouteError } from 'react-router-dom';
import Layout from '../Layout/Layout';

import PopularMovies from '../PopularMovies/PopularMovies';
import SearchResult from '../Search/SearchResult';

import '../../index.css';
import MovieDetail from '../MovieDetail/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: '/',
        element: <PopularMovies />,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: '/movie/:movieId',
        element: <MovieDetail />,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: '/search',
        element: <Navigate to="/" />,
      },
      {
        path: '/search/:query',
        element: <SearchResult />,
        errorElement: <RootErrorBoundary />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export function Fallback() {
  return <>Loading…</>;
}

export function RootErrorBoundary() {
  let error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>
        Click here to reload the app
      </button>
    </div>
  );
}
