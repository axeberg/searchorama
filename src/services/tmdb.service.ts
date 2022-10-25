interface Movie {
  id: number;
  title: string;
}

interface Search<T> {
  page: number;
  results: T[];
}

interface SearchOptions {
  query: string;
  page?: number;
}

interface MovieSearchOptions extends SearchOptions {
  year?: number;
  primary_release_year?: number;
}

const API_BASE_SEARCH = '/search';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export default class Tmdb {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async query<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) as T;
  }

  async movies(options: MovieSearchOptions): Promise<Search<Movie>> {
    const params = new URLSearchParams(Object.entries(options));
    return await this.query<Search<Movie>>(
      `${API_BASE_SEARCH}/movie?${params}`,
    );
  }
}
