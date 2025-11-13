import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';
import {
  type MovieListResult,
  movies,
  type TmdbApiError,
  type TmdbApiResponsePaginated,
} from '../../services/tmdb.service';
import MovieList from './MovieList';

interface MoviesProps {
  title: string;
  endpoint: string;
}

const Movies = ({ title, endpoint }: MoviesProps) => {
  const [pageParam, setPageParam] = useQueryParam('page', NumberParam);
  const page = pageParam ?? 1;
  const setPage = useCallback(
    (page: number) => {
      setPageParam(page);
    },
    [setPageParam],
  );
  const { status, data, error } = useQuery<
    TmdbApiResponsePaginated<MovieListResult[]>,
    TmdbApiError
  >({
    queryKey: ['movies', endpoint, page],
    queryFn: () => movies(endpoint, page),
  });

  return (
    <div className="container mx-auto max-w-screen-xl px-4 flex-1">
      <h1 className="text-5xl font-bold mb-8">{title}</h1>
      <MovieList
        movies={data?.results}
        page={page}
        setPage={setPage}
        showPreviousButton={page > 1}
        showNextButton={data?.total_pages !== undefined && page < data.total_pages}
        status={status}
        error={error?.status_message}
      />
    </div>
  );
};

export default Movies;
