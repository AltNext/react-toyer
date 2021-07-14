import type { VFC } from 'react';
import { useContext, useEffect, useRef } from 'react';

import { ToyerContext } from './toyer.context';
import { getIndex, registerVideo } from './toyer.helpers';
import type { IToyerVideoProps } from './interfaces';

export const ToyerVideo: VFC<IToyerVideoProps> = ({ index, src, playing, width, height, top, left }) => {
  const context = useContext(ToyerContext);
  const videoRef = useRef<HTMLVideoElement>();
  const currentIndex = getIndex(context, index);

  useEffect(() => {
    const video = document.createElement('video');

    video.muted = true;
    video.src = src;
    video.width = width ?? context.canvas.width;
    video.height = height ?? context.canvas.height;

    videoRef.current = video;

    return () => {
      video.remove();
    };
  }, [src]);

  useEffect(
    () =>
      registerVideo(context, {
        index: currentIndex,
        playing: !!playing,
        element: videoRef.current!,
        top,
        left,
        width: width ?? context.canvas.width,
        height: height ?? context.canvas.height,
      }),
    [context, currentIndex, width, height, top, left],
  ); // Its intentinal to keep out playing from deps here

  return null;
};

ToyerVideo.displayName = 'ToyerVideo';
