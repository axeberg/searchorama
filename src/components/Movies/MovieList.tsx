import React from 'react';
import { Flex, Grid, Button, Link, Text } from '@shadcn/ui';
import { Link as RouterLink } from 'react-router-dom';

import { MovieListResult, TmdbApiError } from '../../services/tmdb.service';
import { QueryStatus } from '@tanstack/react-query';
import { Placeholder, Poster } from '../Poster/Poster';
import Loading from '../Loading/Loading';

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
  error,
}: MovieListProps) => {
  if (movies) {
    return (
      <React.Fragment>
        <Grid columns={[2, 4, 5]} gap="3" sx={{ alignItems: 'center' }}>
          {movies.map((movie) => (
            <Link
              as={RouterLink}
              // @ts-ignore
              to={`/movie/${movie.id}`}
              key={movie.id}
              sx={{
                position: 'relative',
                height: movie.poster_path ? 'unset' : '100%',
                width: '100%',
                overflow: 'hidden',
                borderRadius: 1,
                opacity: 1,
                transform: 'scale(1)',
                transition:
                  'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
                ':hover, :focus': {
                  opacity: 0.8,
                },
                ':active': {
                  transform: 'scale(0.975)',
                },
              }}
            >
              <Flex
                sx={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {movie.poster_path ? (
                  <Poster
                    path={movie.poster_path}
                    imageType="poster"
                    alt={movie.title}
                    sizes="(max-width: 30em) 50vw, (max-width: 48em) 25vw, 20vw"
                  />
                ) : (
                  <React.Fragment>
                    <Placeholder imageType="poster" />
                    <Text
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center',
                        alignSelf: 'center',
                        p: 2,
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {movie.title}
                    </Text>
                  </React.Fragment>
                )}
              </Flex>
            </Link>
          ))}
        </Grid>
        {(showPreviousButton || showNextButton) && (
          <Flex sx={{ mt: 3, justifyContent: 'center', flexDirection: 'row' }}>
            {showPreviousButton && (
              <Button
                mx="2"
                variant="ghost"
                disabled={status === 'loading'}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
            )}
            {showNextButton && (
              <Button
                mx="3"
                variant="ghost"
                disabled={status === 'loading'}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            )}
          </Flex>
        )}
      </React.Fragment>
    );
  }

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <p>Error!</p>;
  }

  return null;
};

export default MovieList;
