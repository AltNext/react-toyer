import type { IToyerContext, IVideoItem, ValueType } from './interfaces';

export const registerVideo = (context: IToyerContext, video: IVideoItem): (() => void) => {
  if (video.element.readyState >= video.element.HAVE_ENOUGH_DATA) {
    context.videos[video.index] = video;
  } else {
    video.element.load();
    video.element.addEventListener('loadedmetadata', () => {
      context.videos[video.index] = video;
    });
  }

  return () => {
    if (context.videos[video.index]) {
      delete context.videos[video.index];
    }
  };
};

export const getIndex = (context: IToyerContext, index?: number): number => index ?? (context.latestIndex += 1);

export const getValue = <T>(value: ValueType<T>): T => {
  if (typeof value === 'object' && value !== null && 'get' in (value as object)) {
    return (value as { get(): T }).get();
  }

  return value as T;
};
