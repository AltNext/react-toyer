import type { FC, VFC } from 'react';
import { createContext, useContext, useEffect, useRef } from 'react';

import type { IToyerContext, IToyerProps, IToyerVideoProps, IVideoItem } from './interfaces';

export const ToyerContext = createContext<IToyerContext>({
  latestIndex: 0,
  videos: [],
  canvas: { height: 0, width: 0 },
});

const registerVideo = (context: IToyerContext, video: IVideoItem): (() => void) => {
  video.element.addEventListener('loadedmetadata', () => {
    context.videos[video.index] = video;
  });

  return () => {
    if (context.videos[video.index]) {
      delete context.videos[video.index];
    }
  };
};

const getIndex = (context: IToyerContext, index?: number): number => index ?? (context.latestIndex += 1);

export const Toyer: FC<IToyerProps> = ({ children, height, width }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<IToyerContext>({ canvas: { height, width }, latestIndex: 0, videos: [] });

  useEffect(() => {
    let running = true;
    let ctx = canvasRef.current?.getContext('2d');

    const tick = (): void => {
      if (!running) {
        return;
      }

      if (!ctx) {
        ctx = canvasRef.current?.getContext('2d');

        requestAnimationFrame(tick);

        return;
      }

      ctx.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);

      for (const video of Object.values(contextRef.current.videos)) {
        if (video.playing && video.element.paused) {
          video.element.play();
        }

        if (!video.playing && !video.element.paused) {
          video.element.pause();
          video.element.currentTime = 0;
        }

        if (video.playing) {
          ctx.drawImage(video.element, 0, 0, video.element.width, video.element.height);
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      running = false;
    };
  }, []);

  contextRef.current.latestIndex = 0;

  return (
    <div style={{ height, width }}>
      <canvas ref={canvasRef} height={height} width={width} />
      <ToyerContext.Provider value={contextRef.current}>{children}</ToyerContext.Provider>
    </div>
  );
};

Toyer.displayName = 'Toyer';

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
