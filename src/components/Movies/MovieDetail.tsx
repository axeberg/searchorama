import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { movie } from '../../services/tmdb.service';
import Loading from '../Loading/Loading';
import { Placeholder, Poster } from '../Poster/Poster';

export default function MovieDetail() {
  let params = useParams();
  const movieId = Number.parseInt(params.movieId!);

  const { status, data } = useQuery(['movie', movieId], () => movie(movieId));

  if (status === 'success' && data) {
    return (
      <div className="relative">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div
            className="relative grid md:grid-cols-[1fr_2fr] grid-rows-[min-content] gap-x-4 md:gap-x-6 gap-y-4 items-end overflow-hidden z-10"
            style={{
              gridTemplateAreas: window.innerWidth >= 768
                ? "'poster title' 'poster meta' 'poster overview'"
                : "'poster title' 'meta meta' 'overview overview'"
            }}
          >
            <div className="overflow-hidden rounded-md" style={{ gridArea: 'poster' }}>
              {data.poster_path ? (
                <Poster path={data.poster_path} imageType="poster" />
              ) : (
                <Placeholder imageType="poster" />
              )}
            </div>
            <div className="flex flex-col" style={{ gridArea: 'title' }}>
              <h1 className="text-5xl font-bold">
                {data.title}
              </h1>
              {data.tagline && (
                <p className="italic mt-4">{data.tagline}</p>
              )}
            </div>
            <div className="grid gap-2" style={{ gridArea: 'meta' }}>
              <div className="flex flex-row gap-4">
                <time title="Release year">
                  {new Date(data.release_date).getFullYear()}
                </time>
                {data.runtime > 0 && (
                  <span title="Runtime">{`${Math.floor(
                    data.runtime / 60,
                  )} h ${data.runtime % 60} min`}</span>
                )}
              </div>
              {data.genres.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  {data.genres.map((genre) => (
                    <Badge key={genre.id} variant="plain">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <p style={{ gridArea: 'overview' }}>{data.overview}</p>
          </div>
        </div>
        {data.backdrop_path && (
          <div className="absolute overflow-hidden max-h-full top-0 right-0 left-0 after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0"></div>
        )}
      </div>
    );
  }

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <p>Error!</p>;
  }

  return null;
}
