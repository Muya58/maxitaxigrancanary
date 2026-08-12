import React from 'react';
import App from './App';
import DestinationPage from './pages/DestinationPage';
import EnDestinationPage from './pages/EnDestinationPage';
import { getDestinationByPath } from './data/destinations';

interface Props {
  url?: string;
}

export default function Router({ url }: Props) {
  const pathname = url ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const cleanPath = pathname.replace(/\/$/, '');

  if (cleanPath.startsWith('/en/transfer-')) {
    const esPath = cleanPath.replace('/en', '');
    const destination = getDestinationByPath(esPath);
    if (destination) return <EnDestinationPage destination={destination} />;
  }

  const destination = getDestinationByPath(cleanPath);
  return destination ? <DestinationPage destination={destination} /> : <App />;
}
