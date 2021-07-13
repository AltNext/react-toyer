import type { VFC } from 'react';
import { useContext, useEffect } from 'react';

import { ToyerContext } from './toyer.context';
import { getIndex, registerVideo } from './toyer.helpers';
import type { IToyerVideoProps } from './interfaces';

export const ToyerVideo: VFC<IToyerVideoProps> = ({ index, src, playing, width, height }) => {
  const context = useContext(ToyerContext);

  const currentIndex = getIndex(context, index);

  useEffect(() => {
    const video = document.createElement('video');

    video.muted = true;
    video.src = src;
    video.width = width ?? context.canvas.width;
    video.height = height ?? context.canvas.height;

    const unregister = registerVideo(context, { index: currentIndex, playing: !!playing, element: video });

    return () => {
      unregister();
      video.remove();
    };
  }, [context, src, currentIndex, width, height]); // Its intentinal to keep out playing from deps here

  return null;
};

ToyerVideo.displayName = 'ToyerVideo';
