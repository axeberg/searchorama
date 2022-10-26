import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders start', () => {
  render(<App />);
  const header = screen.getByText(/Searchorama/i);
  expect(header).toBeInTheDocument();
});
