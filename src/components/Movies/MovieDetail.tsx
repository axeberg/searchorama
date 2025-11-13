import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { movie, Movie } from '../../services/tmdb.service';
import { Placeholder, Poster } from '../Poster/Poster';
import { Loader2 } from 'lucide-react';

export default function MovieDetail() {
  let params = useParams();
  const movieId = Number.parseInt(params.movieId!);

  const { status, data } = useQuery<Movie>({
    queryKey: ['movie', movieId],
    queryFn: () => movie(movieId),
  });

  if (status === 'pending') {
    return (
      <div className="container mx-auto max-w-screen-xl px-4">
        <div
          className="grid md:grid-cols-[1fr_2fr] grid-rows-[min-content] gap-x-4 md:gap-x-6 gap-y-4 items-end"
          style={{
            gridTemplateAreas: "'poster title' 'poster meta' 'poster overview'",
          }}
        >
          <div style={{ gridArea: 'poster' }}>
            <Placeholder imageType="poster" />
          </div>
          <div style={{ gridArea: 'title' }}>
            <div className="h-12 w-4/5 bg-muted rounded mb-2 skeleton" />
            <div className="h-6 w-3/5 bg-muted rounded skeleton" />
          </div>
          <div className="grid gap-2" style={{ gridArea: 'meta' }}>
            <div className="h-6 w-1/2 bg-muted rounded skeleton" />
            <div className="h-8 w-2/3 bg-muted rounded skeleton" />
          </div>
          <div style={{ gridArea: 'overview' }}>
            <div className="h-4 w-full bg-muted rounded mb-2 skeleton" />
            <div className="h-4 w-11/12 bg-muted rounded mb-2 skeleton" />
            <div className="h-4 w-10/12 bg-muted rounded skeleton" />
          </div>
        </div>
      </div>
    );
  }

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
                <Poster path={data.poster_path} imageType="poster" movieId={movieId} />
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
              <div className="flex flex-row gap-4 items-center">
                <time title="Release year">
                  {new Date(data.release_date).getFullYear()}
                </time>
                {data.runtime > 0 && (
                  <span title="Runtime">{`${Math.floor(
                    data.runtime / 60,
                  )} h ${data.runtime % 60} min`}</span>
                )}
                {data.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <span title="Rating">⭐ {data.vote_average.toFixed(1)}</span>
                    <span className="opacity-70 text-sm">({data.vote_count} votes)</span>
                  </div>
                )}
              </div>
              {data.genres.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  {data.genres.map((genre) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}
              {(data.budget > 0 || data.revenue > 0) && (
                <div className="flex flex-col gap-1 mt-2">
                  {data.budget > 0 && (
                    <span className="text-sm opacity-80">
                      Budget: ${(data.budget / 1000000).toFixed(1)}M
                    </span>
                  )}
                  {data.revenue > 0 && (
                    <span className="text-sm opacity-80">
                      Revenue: ${(data.revenue / 1000000).toFixed(1)}M
                    </span>
                  )}
                </div>
              )}
              {data.production_companies.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm font-bold mb-1 block">Production Companies</span>
                  <div className="flex flex-wrap gap-2">
                    {data.production_companies.slice(0, 3).map((company) => (
                      <span key={company.id} className="text-sm opacity-80">
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p style={{ gridArea: 'overview' }}>{data.overview}</p>
          </div>
        </div>
        {data.backdrop_path && (
          <div className="absolute overflow-hidden max-h-full top-0 right-0 left-0 z-0">
            <img
              src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              alt=""
              className="w-full h-auto opacity-40 blur-2xl scale-110"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-black/30 via-black/90 to-black"></div>
          </div>
        )}
      </div>
    );
  }

  if (status === 'error') {
    return <p>Error!</p>;
  }

  return null;
}
