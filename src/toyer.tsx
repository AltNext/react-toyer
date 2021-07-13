import type { FC, VFC } from 'react';
import { createContext, /* useContext,*/ useRef } from 'react';

import type { IToyerContext, IToyerProps, IToyerVideoProps } from './interfaces';

export const ToyerContext = createContext<IToyerContext>({ canvas: { height: 0, width: 0 } });

export const Toyer: FC<IToyerProps> = ({ children, height, width }) => {
  const contextRef = useRef<IToyerContext>({ canvas: { height, width } });

  return (
    <div style={{ height, width }}>
      <canvas height={height} width={width} />
      <ToyerContext.Provider value={contextRef.current}>{children}</ToyerContext.Provider>
    </div>
  );
};

Toyer.displayName = 'Toyer';

export const ToyerVideo: VFC<IToyerVideoProps> = () =>
  /* const context = useContext(ToyerContext); */

  null;

ToyerVideo.displayName = 'ToyerVideo';
