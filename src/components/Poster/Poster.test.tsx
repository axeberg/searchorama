import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Placeholder, Poster } from './Poster';

describe('Poster', () => {
  it('renders with loading state initially', () => {
    render(<Poster path="test.jpg" imageType="poster" alt="Test Movie" />);

    // Should show loading spinner
    expect(screen.getByRole('img')).toHaveStyle({ opacity: '0' });
  });

  it('renders poster image with correct src', () => {
    render(<Poster path="test.jpg" imageType="poster" alt="Test Movie" />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test.jpg');
    expect(img).toHaveAttribute('alt', 'Test Movie');
  });

  it('applies view transition name when movieId is provided', () => {
    render(<Poster path="test.jpg" imageType="poster" movieId={123} />);

    const img = screen.getByRole('img');
    expect(img).toHaveStyle({ viewTransitionName: 'poster-123' });
  });

  it('maintains aspect ratio for poster type', () => {
    const { container } = render(<Poster path="test.jpg" imageType="poster" />);

    const posterContainer = container.firstChild as HTMLElement;
    expect(posterContainer).toHaveStyle({ aspectRatio: '0.6666666666666666' });
  });

  it('maintains aspect ratio for backdrop type', () => {
    const { container } = render(<Poster path="test.jpg" imageType="backdrop" />);

    const posterContainer = container.firstChild as HTMLElement;
    expect(posterContainer).toHaveStyle({ aspectRatio: '1.7777777777777777' });
  });
});

describe('Placeholder', () => {
  it('renders with correct aspect ratio for poster', () => {
    const { container } = render(<Placeholder imageType="poster" />);

    expect(container.firstChild).toHaveStyle({ aspectRatio: '0.6666666666666666' });
  });

  it('renders with correct aspect ratio for backdrop', () => {
    const { container } = render(<Placeholder imageType="backdrop" />);

    expect(container.firstChild).toHaveStyle({ aspectRatio: '1.7777777777777777' });
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<Placeholder imageType="poster" isLoading />);

    // Loader2 renders an svg
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('does not show loading spinner when isLoading is false', () => {
    render(<Placeholder imageType="poster" isLoading={false} />);

    const svg = document.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });
});
