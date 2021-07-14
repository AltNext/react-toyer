import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { ToyerContext } from './toyer.context';
import { getValue } from './toyer.helpers';
import type { IToyerContext, IToyerProps } from './interfaces';

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

      ctx.clearRect(0, 0, getValue(contextRef.current.canvas.width), getValue(contextRef.current.canvas.height));

      for (const video of Object.values(contextRef.current.videos)) {
        if (video.playing && video.element.paused) {
          video.element.play().catch((error) => {
            console.error('Error trying to initiate playback', error);
          });
        }

        if (!video.playing && !video.element.paused) {
          video.element.pause();
          video.element.currentTime = 0;
        }

        if (video.playing) {
          ctx.drawImage(
            video.element,
            getValue(video.left ?? 0),
            getValue(video.top ?? 0),
            getValue(video.width),
            getValue(video.height),
          );
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
