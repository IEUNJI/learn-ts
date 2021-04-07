export class Cancel {
  public message: string;
  constructor(msg: string) {
    this.message = msg;
  }
}

export function isCancel(error: any) {
  return error instanceof Cancel;
}

export class CancelToken {
  public resolve: any;
  source() {
    return {
      token: new Promise((resolve) => {
        this.resolve = resolve;
      }),
      cancel: (msg: string) => {
        this.resolve(new Cancel(msg));
      }
    };
  }
}