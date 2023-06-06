import React from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigT } from './types';
import { App } from './App';

const runApp = (config: ConfigT) => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(<App config={config} />);
};

runApp({
  wsURL: process.env.REACT_APP_WS_URL as string,
  loggerName: process.env.REACT_APP_LOGGER_NAME as string,
});
