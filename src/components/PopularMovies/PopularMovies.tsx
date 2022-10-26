import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Tmdb, { Movie } from '../../services/tmdb.service';

const tmdb = new Tmdb(
  process.env.REACT_APP_TMDB_ACCESS_KEY || 'access-token-needed',
);

export default function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const { results } = await tmdb.popularMovies();
      setPopularMovies(results);
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
      <ol>
        {popularMovies &&
          popularMovies?.map((movie: Movie) => {
            return (
              <li>
                <Link to={`/movie/${String(movie.id)}`}>{movie.title}</Link>
              </li>
            );
          })}
      </ol>
    </>
  );
}
