import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { MovieListResult, TmdbApiError } from '../../services/tmdb.service';
import { QueryStatus } from '@tanstack/react-query';
import { Placeholder, Poster } from '../Poster/Poster';
import { Button } from '@/components/ui/button';

interface MovieListProps {
  page: number;
  setPage: (page: number) => void;
  showPreviousButton: boolean;
  showNextButton: boolean;
  status: QueryStatus;
  movies?: MovieListResult[];
  error?: TmdbApiError | string | undefined;
}

const MovieList = ({
  movies,
  page,
  setPage,
  showPreviousButton,
  showNextButton,
  status,
}: MovieListProps) => {
  if (movies) {
    return (
      <React.Fragment>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
          {movies.map((movie) => (
            <RouterLink
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="relative w-full overflow-hidden rounded-md opacity-100 transform scale-100 transition-all duration-200 ease-in-out hover:opacity-80 active:scale-[0.975]"
              style={{ height: movie.poster_path ? 'auto' : '100%' }}
            >
              <div className="flex h-full w-full justify-center">
                {movie.poster_path ? (
                  <Poster
                    path={movie.poster_path}
                    imageType="poster"
                    alt={movie.title}
                    sizes="(max-width: 30em) 50vw, (max-width: 48em) 25vw, 20vw"
                    movieId={movie.id}
                  />
                ) : (
                  <React.Fragment>
                    <Placeholder imageType="poster" />
                    <div className="absolute w-full text-center self-center p-2 font-bold text-white">
                      {movie.title}
                    </div>
                  </React.Fragment>
                )}
              </div>
            </RouterLink>
          ))}
        </div>
        {(showPreviousButton || showNextButton) && (
          <div className="mt-6 flex justify-center flex-row gap-3">
            {showPreviousButton && (
              <Button
                variant="ghost"
                disabled={status === 'pending'}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
            )}
            {showNextButton && (
              <Button
                variant="ghost"
                disabled={status === 'pending'}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }

  if (status === 'pending') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <Placeholder key={i} imageType="poster" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <p>Error!</p>;
  }

  return null;
};

export default MovieList;
