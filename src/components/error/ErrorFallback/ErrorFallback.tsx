import React, { FC } from 'react';

export const ErrorFallback: FC = () => {
  return (
    <div>
      <p>Render Error</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
};
