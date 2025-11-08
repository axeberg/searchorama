import { Option, encodeURLParamString } from '../utils/encodeURLParamString';

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Language {
  iso_639_1: string;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResult {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  video: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface TmdbApiResponsePaginated<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface TmdbApiError {
  status_message: string;
  success: boolean;
  status_code: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3';
const API_ACCESS_TOKEN =
  import.meta.env.VITE_TMDB_ACCESS_KEY || '';

export const fetchTmdb = async <T>(
  path: string,
  options: Option[] = [],
): Promise<T> => {
  const queryString = encodeURLParamString(options);

  const response: Response = await fetch(
    `${API_BASE_URL}${path}?${queryString}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );

  try {
    const jsonResponse: T = await response.json();

    if (response.ok) {
      return jsonResponse;
    }

    if (
      jsonResponse &&
      'status_code' in jsonResponse &&
      'status_message' in jsonResponse
    ) {
    }

    throw new Error(
      `Something unexpected went wrong: ${response.status} ${response.statusText}`,
    );
  } catch (ex) {
    throw new Error(`Error while parsing response body`);
  }
};

export const fetchTmdbPaginated = <T>(
  path: string,
  page: number,
  options: Option[] = [],
) => {
  return fetchTmdb<TmdbApiResponsePaginated<T>>(path, [
    ...options,
    { key: 'page', value: page },
  ]);
};

export const searchMovies = (
  query: string,
  page: number,
): Promise<TmdbApiResponsePaginated<MovieListResult[]>> => {
  return fetchTmdbPaginated<MovieListResult[]>('/search/movie', page, [
    { key: 'query', value: query },
  ]);
};

export const movie = (id: number): Promise<Movie> => {
  return fetchTmdb<Movie>(`/movie/${id}`);
};

export const movies = (
  path: string,
  page: number = 1,
): Promise<TmdbApiResponsePaginated<MovieListResult[]>> => {
  return fetchTmdbPaginated(path, page);
};
