import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { Text, Container } from '@shadcn/ui';
import { useQueryParam, NumberParam } from 'use-query-params';
import {
  MovieListResult,
  movies,
  TmdbApiError,
  TmdbApiResponsePaginated,
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
  >(['movies', endpoint, page], () => movies(endpoint, page));

  return (
    <Container sx={{ flex: 1 }}>
      <Text as="h1" variant="heading" mb="4">
        {title}
      </Text>
      <MovieList
        movies={data?.results}
        page={page}
        setPage={setPage}
        showPreviousButton={page > 1}
        showNextButton={
          data?.total_pages !== undefined && page < data.total_pages
        }
        status={status}
        error={error?.status_message}
      />
    </Container>
  );
};

export default Movies;
