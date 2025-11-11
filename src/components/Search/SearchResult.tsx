import useSearch from '../../hooks/useSearch';
import { TmdbApiError } from '../../services/tmdb.service';
import MovieList from '../Movies/MovieList';

export default function SearchResult() {
  const { results, query, page, setPage, totalPages, status, error } =
    useSearch();

  return (
    <div className="container mx-auto max-w-screen-xl px-4 flex-1">
      <h1 className="text-5xl font-bold mb-8">
        Results for "{query}"
      </h1>
      <MovieList
        movies={results}
        page={page}
        setPage={setPage}
        showPreviousButton={page > 1}
        showNextButton={totalPages !== undefined && page < totalPages}
        status={status}
        error={(error as TmdbApiError)?.status_message}
      />
    </div>
  );
}
