import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { HelmetProvider } from 'react-helmet-async';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
