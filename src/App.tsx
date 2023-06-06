import React, { FC } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { ConfigT } from './types';
import { ErrorFallback, Root } from './components';

import './App.scss';

type Props = {
  config: ConfigT;
};
export const App: FC<Props> = ({ config }) => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Root config={config} />
    </ErrorBoundary>
  );
};
