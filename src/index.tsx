import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Theme, ThemeProvider } from 'theme-ui';

import baseTheme from '@theme-ui/preset-dark';
import { alpha } from '@theme-ui/color';
import { merge } from '@theme-ui/core';

import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import App from './components/App/App';
import combineProviders from './components/CombineProviders/CombineProviders';
import SearchProvider from './components/Search/SearchProvider';

import './index.css';
import Nav from './components/Navigation/Nav';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const colors = {
  white: 'rgba(255, 255, 255, 0.9)',
  text: 'rgba(255, 255, 255, 0.9)',
  background: '#000',
  primary: '#4392f1',
  secondary: '#a59bde',
  muted: '#222',
};

const theme: Theme = merge(baseTheme, {
  colors,
  fonts: {
    body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    heading: 'inherit',
    monospace: 'monospace',
  },
  radii: [0, 4, 999999],
  text: {
    heading: {
      fontSize: 5,
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    truncated: {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  shadows: {
    outline: `0 0 0 2px ${colors.primary} inset`,
  },
  buttons: {
    base: {
      fontWeight: 'bold',
      borderRadius: 1,
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background-color 0.2s ease, color 0.2s ease',
    },
    primary: {
      variant: 'buttons.base',
      color: 'primary',
    },
    secondary: {
      variant: 'buttons.base',
      color: 'secondary',
    },
    ghost: {
      variant: 'buttons.base',
      color: 'text',
      backgroundColor: 'transparent',
      ':hover, :focus': {
        backgroundColor: 'muted',
      },
    },
    menu: {
      variant: 'buttons.base',
    },
    close: {
      variant: 'buttons.base',
    },
  },
  badges: {
    plain: {
      color: alpha('text', 0.75),
      backgroundColor: alpha('text', 0.15),
      borderRadius: 1,
      textTransform: 'uppercase',
    },
  },
  forms: {
    input: {
      borderRadius: 2,
      px: 3,
      borderColor: 'muted',
    },
  },
  sizes: {
    container: 1200,
  },
  layout: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      p: [3, 4],
    },
  },
  links: {
    nav: {
      fontWeight: 'normal',
      px: 3,
      py: 2,
    },
    logo: {
      color: 'text',
      textDecoration: 'none',
      fontSize: 3,
      fontWeight: 'bold',
      ':hover, :focus': {
        color: 'primary',
      },
    },
  },
  styles: {
    a: {
      color: 'text',
      textDecoration: 'underline',
      ':hover,:focus': {
        color: 'text',
      },
    },
  },
});

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3600, // 1 hour in seconds
    },
  },
};

const queryClient = new QueryClient(queryConfig);

const GlobalProviders = combineProviders([
  [ThemeProvider, { theme: theme }],
  [QueryClientProvider, { client: queryClient }],
  [QueryParamProvider, { adapter: ReactRouter6Adapter }],
  SearchProvider,
]);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProviders>
        <Nav />
        <App />
      </GlobalProviders>
    </BrowserRouter>
  </React.StrictMode>,
);
