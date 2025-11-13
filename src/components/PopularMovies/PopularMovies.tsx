import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type MovieListResult, movies } from '../../services/tmdb.service';

export default function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState<MovieListResult[]>();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const { results } = await movies(`/movie/popular`, 1);
      setPopularMovies(results);
    };

    fetchPopularMovies();
  }, []);

  return (
    <ol>
      {popularMovies?.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movie/${String(movie.id)}`}>{movie.title}</Link>
          </li>
        );
      })}
    </ol>
  );
}
