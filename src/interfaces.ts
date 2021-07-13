interface ISized {
  width: number;
  height: number;
}

export interface IToyerContext {
  canvas: ISized;
}

export interface IToyerProps extends ISized {}

export interface IToyerVideoProps extends Partial<ISized> {
  playing?: boolean;
  src: string;
}
