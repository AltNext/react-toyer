interface ISized {
  width: number;
  height: number;
}

export interface IVideoItem {
  index: number;
  playing: boolean;
  element: HTMLVideoElement;
}

export interface IToyerContext {
  latestIndex: number;
  canvas: ISized;
  videos: IVideoItem[];
}

export interface IToyerProps extends ISized {}

export interface IToyerVideoProps extends Partial<ISized & Omit<IVideoItem, 'element'>> {
  src: string;
}
