import React, { useState } from 'react';
import { Image } from 'theme-ui';

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
      <Image
        src={`https://image.tmdb.org/t/p/w500/${path}`}
        sizes={sizes}
        className={className}
        alt={alt}
        onLoad={() => setIsLoadingImage(false)}
        sx={{
          visibility: isLoadingImage ? 'hidden' : 'visible',
          opacity: isLoadingImage ? 0 : 1,
          height: isLoadingImage ? 0 : 'auto',
          width: isLoadingImage ? 0 : 'auto',
        }}
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
