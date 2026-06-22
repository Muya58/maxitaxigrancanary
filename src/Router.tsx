import React from 'react';
import App from './App';
import DestinationPage from './pages/DestinationPage';
import { getDestinationByPath } from './data/destinations';

interface Props {
  url?: string;
}

export default function Router({ url }: Props) {
  const pathname = url ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const destination = getDestinationByPath(pathname);

  return destination ? <DestinationPage destination={destination} /> : <App />;
}
