import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export type ImageType = 'poster' | 'backdrop';

interface PosterProps {
  imageType: ImageType;
  path: string;
  className?: string;
  alt?: string;
  sizes?: string;
  movieId?: number;
}

export const Poster = ({
  path,
  imageType,
  className,
  alt,
  sizes,
  movieId,
}: PosterProps) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const aspectRatio = imageType === 'poster' ? 2 / 3 : 16 / 9;

  return (
    <div
      className={cn(
        'relative w-full bg-muted rounded-md overflow-hidden',
        className,
      )}
      style={{
        aspectRatio: aspectRatio.toString(),
      }}
    >
      {isLoadingImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      <img
        src={`https://image.tmdb.org/t/p/w500/${path}`}
        sizes={sizes}
        alt={alt}
        onLoad={() => setIsLoadingImage(false)}
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-200"
        style={{
          opacity: isLoadingImage ? 0 : 1,
          viewTransitionName: movieId ? `poster-${movieId}` : undefined,
        }}
      />
    </div>
  );
};

interface PlaceholderProps {
  imageType: ImageType;
  isLoading?: boolean;
}

export const Placeholder = ({ imageType, isLoading }: PlaceholderProps) => {
  const aspectRatio = imageType === 'poster' ? 2 / 3 : 16 / 9;

  return (
    <div
      className="flex items-center justify-center w-full bg-muted rounded-md"
      style={{
        aspectRatio: aspectRatio.toString(),
      }}
    >
      {isLoading && <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}
    </div>
  );
};
