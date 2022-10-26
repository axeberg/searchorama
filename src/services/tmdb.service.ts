export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

interface Search<Movie> {
  page: number;
  results: Movie[];
}

interface SearchOptions {
  query: string;
  page?: number;
}

interface MovieSearchOptions extends SearchOptions {
  year?: number;
  primary_release_year?: number;
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface TmdbApiResponse<T> extends HttpResponse<T> {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_BASE_SEARCH = '/search';
const API_BASE_MOVIE = '/movie';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export default class Tmdb {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async get<T>(path: string): Promise<TmdbApiResponse<T>> {
    const response: HttpResponse<T> = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    try {
      response.parsedBody = await response.json();
    } catch (ex) {
      throw new Error(`Error while parsing response body`);
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.parsedBody as TmdbApiResponse<T>;
  }

  async movies(
    options: MovieSearchOptions,
  ): Promise<TmdbApiResponse<Search<Movie>>> {
    const params = new URLSearchParams(Object.entries(options));
    return await this.get<Search<Movie>>(`${API_BASE_SEARCH}/movie?${params}`);
  }

  async movie(id: number): Promise<TmdbApiResponse<Movie>> {
    return await this.get<Movie>(`${API_BASE_MOVIE}/movie/${id}`);
  }

  async popularMovies(options?: {
    page?: number;
  }): Promise<TmdbApiResponse<Movie>> {
    const params = options ?? new URLSearchParams(options);
    return await this.get<Movie>(`${API_BASE_MOVIE}/popular?${params}`);
  }
}
