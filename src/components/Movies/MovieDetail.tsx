import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Badge, Box, Container, Flex, Text } from 'theme-ui';
import { movie } from '../../services/tmdb.service';

export default function MovieDetail() {
  let params = useParams();
  const movieId = Number.parseInt(params.movieId!);

  const { status, data } = useQuery(['movie', movieId], () => movie(movieId));

  if (status === 'success' && data) {
    return (
      <Box sx={{ position: 'relative' }}>
        <Container>
          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gridTemplateRows: 'min-content',
              gridTemplateAreas: [
                "'poster title' 'meta meta' 'overview overview'",
                "'poster title' 'poster meta' 'poster overview'",
              ],
              columnGap: [3, 4],
              rowGap: 3,
              alignItems: 'end',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <Flex
              sx={{
                gridArea: 'poster',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              {data.poster_path ? <p>Poster here</p> : <p>Placeholder here</p>}
            </Flex>
            <Flex sx={{ gridArea: 'title', flexDirection: 'column' }}>
              <Text as="h1" variant="heading">
                {data.title}
              </Text>
              {data.tagline && (
                <Text sx={{ fontStyle: 'italic', mt: 3 }}>{data.tagline}</Text>
              )}
            </Flex>
            <Box sx={{ gridArea: 'meta', display: 'grid', gap: 2 }}>
              <Flex sx={{ flexDirection: 'row' }}>
                <Text as="time" title="Release year">
                  {new Date(data.release_date).getFullYear()}
                </Text>
                {data.runtime > 0 && (
                  <Text title="Runtime" ml="3">{`${Math.floor(
                    data.runtime / 60,
                  )} h ${data.runtime % 60} min`}</Text>
                )}
              </Flex>
              {data.genres.length > 0 && (
                <Flex sx={{ alignItems: 'center', flexWrap: 'wrap', m: -1 }}>
                  {data.genres.map((genre) => (
                    <Badge key={genre.id} m="1" variant="plain">
                      {genre.name}
                    </Badge>
                  ))}
                </Flex>
              )}
            </Box>
            <Text sx={{ gridArea: 'overview' }}>{data.overview}</Text>
          </Box>
        </Container>
        {data.backdrop_path && (
          <Box
            sx={{
              position: 'absolute',
              overflow: 'hidden',
              maxHeight: '100%',
              top: 0,
              right: 0,
              left: 0,
              ':after': {
                content: `""`,
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
            }}
          ></Box>
        )}
      </Box>
    );
  }

  if (status === 'loading') {
    return <p>Loading…</p>;
  }

  if (status === 'error') {
    return <p>Error!</p>;
  }

  return null;
}
