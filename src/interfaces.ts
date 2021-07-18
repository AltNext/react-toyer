export type ValueType<T> = T | { get(): T };

interface ISized {
  width: ValueType<number>;
  height: ValueType<number>;
}

interface IMovable {
  top?: ValueType<number>;
  left?: ValueType<number>;
}

export interface IVideoItem extends IMovable, ISized {
  index: number;
  playing: boolean;
  element: HTMLVideoElement;
}

export interface IToyerContext {
  latestIndex: number;
  canvas: ISized;
  videos: IVideoItem[];
}

export interface IToyerProps {
  width: number;
  height: number;
}

export interface IToyerVideoProps extends Partial<ISized & Omit<IVideoItem, 'element'>> {
  src: string;
}
