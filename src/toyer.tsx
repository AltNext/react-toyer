import type { FC } from 'react';
import { createContext, useCallback, useState } from 'react';

import type { IToyerContext, IToyerProps } from './interfaces';

export const ToyerContext = createContext<IToyerContext>({ loaded: false, options: {} });

export const Toyer: FC<IToyerProps> = ({ children, height, width }) => {
  const [context, setContext] = useState<IToyerContext>({ loaded: false, options: { size: { height, width } } });
  const setCanvasRef = useCallback(
    (ref: HTMLCanvasElement | null): void => {
      if (ref && !context.loaded) {
        setContext((ctx) => ({ ...ctx, loaded: true }));
      }
    },
    [context.loaded],
  );

  return (
    <div style={{ height, width }}>
      <canvas ref={setCanvasRef} height={height} width={width} />
      <ToyerContext.Provider value={context}>{children}</ToyerContext.Provider>
    </div>
  );
};
