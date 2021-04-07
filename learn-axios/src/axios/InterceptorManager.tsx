export interface OnFulfilled<V> {
  (value: V): V | Promise<V>;
}
export interface OnRejected {
  (error: any): any;
}

export interface Interceptor<V> {
  onFulfilled?: OnFulfilled<V>;
  onRejected?: OnRejected;
}

// V 可能是 AxiosRequestConfig 或 AxiosResponse
export default class InterceptorManager<V> {
  public interceptors: Array<Interceptor<V> | null> = [];

  use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
    this.interceptors.push({
      onFulfilled,
      onRejected
    });
    return this.interceptors.length - 1;
  }

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
