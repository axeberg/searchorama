import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import App from './components/App/App';
import combineProviders from './components/CombineProviders/CombineProviders';
import SearchProvider from './components/Search/SearchProvider';

import './index.css';
import Nav from './components/Navigation/Nav';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

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
