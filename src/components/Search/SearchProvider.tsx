import { type QueryStatus, useQuery } from '@tanstack/react-query';
import { createContext, type ReactNode, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import {
  type MovieListResult,
  searchMovies,
  type TmdbApiError,
  type TmdbApiResponsePaginated,
} from '../../services/tmdb.service';

export interface InitalContextState {
  results?: MovieListResult[];
  query: string;
  setQuery: (query: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
  status: QueryStatus;
  error?: TmdbApiError | string;
}

const initialState: InitalContextState = {
  results: undefined,
  query: '',
  setQuery: () => {},
  page: 1,
  setPage: () => {},
  totalPages: undefined,
  status: 'pending',
  error: undefined,
};

export const SearchContext = createContext(initialState);

interface ProviderProps {
  children?: ReactNode;
}

const SearchProvider = ({ children }: ProviderProps) => {
  const { pathname } = useLocation();
  const [queryParams, setQueryParams] = useQueryParams({
    query: StringParam,
    page: NumberParam,
  });

  const isSearchRoute = pathname === '/search';

  // Assign defaults
  const query = queryParams.query ?? '';
  const page = queryParams.page ?? 1;

  // Set the values
  const setQuery = useCallback(
    (query: string) => {
      setQueryParams({ query });
    },
    [setQueryParams],
  );

  const setPage = useCallback(
    (page: number) => {
      setQueryParams({ page });
    },
    [setQueryParams],
  );

  const { status, data, error } = useQuery<
    TmdbApiResponsePaginated<MovieListResult[]>,
    TmdbApiError | undefined
  >({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: isSearchRoute && query.length > 0,
  });

  return (
    <SearchContext.Provider
      value={{
        results: data?.results,
        query,
        setQuery,
        page,
        setPage,
        totalPages: data?.total_pages,
        status,
        error: error?.status_message ?? undefined,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
