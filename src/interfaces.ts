interface ISized {
  width: number;
  height: number;
}

export interface IToyerContext {
  loaded: boolean;
  options: {
    size?: ISized;
  };
}

export interface IToyerProps extends ISized {}
