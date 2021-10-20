import EventEmitter from "events";

interface IRenderBuffer extends EventEmitter {
  columns: number;
  write: (str: string) => void;
  get(): string;
}

class Screen extends EventEmitter implements IRenderBuffer {
  readonly columns: number;

  private out: string;

  constructor(columns: number = 120) {
    super();
    this.columns = columns;
    this.out = "";
  }

  write(str: string) {
    this.out = str;
  }

  get() {
    return this.out;
  }
}

export const RenderBuffer = (columns: number = 120): IRenderBuffer => {
  return new Screen(columns);
};
