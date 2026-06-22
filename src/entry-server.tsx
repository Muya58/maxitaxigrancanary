import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import Router from './Router';

export function render(url: string = '/') {
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider>
        <Router url={url} />
      </HelmetProvider>
    </React.StrictMode>
  );

  return { html };
}
