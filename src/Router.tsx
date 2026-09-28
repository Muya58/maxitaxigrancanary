import React from 'react';
import App from './App';
import DestinationPage from './pages/DestinationPage';
import EnDestinationPage from './pages/EnDestinationPage';
import TransferGuidePage from './pages/TransferGuidePage';
import GroupTransferPage from './pages/GroupTransferPage';
import EnGroupTransferPage from './pages/EnGroupTransferPage';
import { getDestinationByPath } from './data/destinations';

interface Props {
  url?: string;
}

export default function Router({ url }: Props) {
  const pathname = url ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const cleanPath = pathname.replace(/\/$/, '');

  if (cleanPath === '/en/airport-transfer-guide') {
    return <TransferGuidePage />;
  }

  if (cleanPath === '/taxi-8-plazas') {
    return <GroupTransferPage />;
  }

  if (cleanPath === '/en/8-seater-taxi') {
    return <EnGroupTransferPage />;
  }

  if (cleanPath.startsWith('/en/transfer-')) {
    const esPath = cleanPath.replace('/en', '');
    const destination = getDestinationByPath(esPath);
    if (destination) return <EnDestinationPage destination={destination} />;
  }

  const destination = getDestinationByPath(cleanPath);
  return destination ? <DestinationPage destination={destination} /> : <App />;
}
