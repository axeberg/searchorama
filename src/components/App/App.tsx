import { Route, Routes, useRouteError } from 'react-router-dom';

import Layout from '../Layout/Layout';
import MovieDetail from '../Movies/MovieDetail';
import Movies from '../Movies/Movies';
import SearchResult from '../Search/SearchResult';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Movies title="This is the title" endpoint="/movie/popular" />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResult />} />
      </Route>
    </Routes>
  );
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
