import type { IToyerContext, IVideoItem } from './interfaces';

export const registerVideo = (context: IToyerContext, video: IVideoItem): (() => void) => {
  video.element.addEventListener('loadedmetadata', () => {
    context.videos[video.index] = video;
  });

  return () => {
    if (context.videos[video.index]) {
      delete context.videos[video.index];
    }
  };
};

export const getIndex = (context: IToyerContext, index?: number): number => index ?? (context.latestIndex += 1);
