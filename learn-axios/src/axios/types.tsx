import InterceptorManager from './InterceptorManager';
import { CancelToken } from './cancel';

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'

// 请求参数
export interface AxiosRequestConfig {
  method?: Method;
  url?: string;
  params?: any;
  headers?: Record<string, any>;
  data?: Record<string, any>;
  timeout?: number;
  transformRequest?: (data: any, headers: any) => any;
  transformResponse?: (data: any) => any;
  cancelToken?: any;
}

// Axios.prototype.request 这个方法
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
  };
  CancelToken: CancelToken;
  isCancel: any;
}

// 泛型T代表数据data的类型
export interface AxiosResponse<T = any> {
  data: T;
  status: number,
  statusText: string;
  headers?: Record<string, any>;
  config?: AxiosRequestConfig;
  request?: XMLHttpRequest;
}
