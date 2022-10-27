import { Container, Text } from 'theme-ui';
import useSearch from '../../hooks/useSearch';
import { TmdbApiError } from '../../services/tmdb.service';
import MovieList from '../Movies/MovieList';

export default function SearchResult() {
  const { results, query, page, setPage, totalPages, status, error } =
    useSearch();

  return (
    <Container sx={{ flex: 1 }}>
      <Text as="h1" variant="heading" mb="4">
        Results for "{query}"
      </Text>
      <MovieList
        movies={results}
        page={page}
        setPage={setPage}
        showPreviousButton={page > 1}
        showNextButton={totalPages !== undefined && page < totalPages}
        status={status}
        error={(error as TmdbApiError)?.status_message}
      />
    </Container>
  );
}
