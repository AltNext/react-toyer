import { createContext } from 'react';

import type { IToyerContext } from './interfaces';

export const ToyerContext = createContext<IToyerContext>({
  latestIndex: 0,
  videos: [],
  canvas: { height: 0, width: 0 },
});
