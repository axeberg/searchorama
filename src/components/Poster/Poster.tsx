import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export type ImageType = 'poster' | 'backdrop';

interface PosterProps {
  imageType: ImageType;
  path: string;
  className?: string;
  alt?: string;
  sizes?: string;
}

export const Poster = ({
  path,
  imageType,
  className,
  alt,
  sizes,
}: PosterProps) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  return (
    <React.Fragment>
      <img
        src={`https://image.tmdb.org/t/p/w500/${path}`}
        sizes={sizes}
        className={cn(className, {
          'invisible opacity-0 h-0 w-0': isLoadingImage,
          'visible opacity-100 h-auto w-auto': !isLoadingImage,
        })}
        alt={alt}
        onLoad={() => setIsLoadingImage(false)}
      />
      {isLoadingImage && <Placeholder imageType={imageType} isLoading />}
    </React.Fragment>
  );
};

interface PlaceholderProps {
  imageType: ImageType;
  isLoading?: boolean;
}

export const Placeholder = ({ imageType, isLoading }: PlaceholderProps) => {
  return <>Loading</>;
};
