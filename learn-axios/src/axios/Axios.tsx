import { AxiosRequestConfig, AxiosResponse, Method } from './types';
import qs from 'qs';
import parseHeaders from 'parse-headers';
import InterceptorManager, { Interceptor } from './InterceptorManager';

let defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      accept: 'application/json'
    }
  },
  transformRequest: (data, headers) => {
    return data;
  },
  transformResponse: (response) => {
    return response;
  }
};

let getStyleMethods = ['get', 'head', 'delete', 'options'];
let postStyleMethods = ['put', 'post', 'patch'];

getStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {};
});

postStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {
    'content-type': 'application/json'
  };
});

let allMethods = [...getStyleMethods, ...postStyleMethods];

// 错误处理：网络异常 超时异常 错误状态码
export default class Axios<T> {
  public defaults: AxiosRequestConfig = defaults;
  public interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse<T>>()
  };

  request(config: AxiosRequestConfig): Promise<AxiosResponse<T> | AxiosRequestConfig> {
    const mergeHeaders = Object.assign({}, this.defaults.headers, config.headers);
    config = Object.assign({}, this.defaults, config);
    config.headers = mergeHeaders;
    if (config.transformRequest && config.data) {
      config.data = config.transformRequest(config.data, config.headers);
    }
    const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>> = [
      {
        onFulfilled: this.dispatchRequest
      }
    ];
    this.interceptors.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
      interceptor && chain.unshift(interceptor);
    });
    this.interceptors.response.interceptors.forEach((interceptor: Interceptor<AxiosResponse<T>> | null) => {
      interceptor && chain.push(interceptor);
    });

    let promise: any = Promise.resolve(config);
    while(chain.length) {
      const { onFulfilled, onRejected } = chain.shift()!;
      promise = promise.then(onFulfilled, onRejected);
    }

    return promise;
  }

  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let { method = 'get', url = '', params = '', headers, data, timeout } = config;
      method = method.toLocaleLowerCase() as Method;
      let request = new XMLHttpRequest();
      if (params && typeof params === 'object') {
        params = qs.stringify(params);
      }
      if (params) {
        url += `${url.includes('?') ? '&' : '?'}${params}`;
      }
      request.open(method, url, true);
      request.responseType = 'json';
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 0) return; // 请求失败 走onerror
          if (request.status >= 200 && request.status < 300) {
            let response: AxiosResponse<T> = {
              data: request.response || this.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request
            };
            if (config.transformResponse) {
              response = config.transformResponse(response);
            }
            resolve(response);
          } else {
            reject(new Error(`Request failed with status code ${request.status}`));
          }
        }
      };
      if (headers) {
        for(let key in headers) {
          if (key === 'common' || allMethods.includes(key)) {
            if (key === 'common' || method === key) {
              for(let key2 in headers[key]) {
                request.setRequestHeader(key2, headers[key][key2]);
              }
            }
          } else {
            request.setRequestHeader(key, headers[key]);
          }
        }
      }
      let body: string | null = null;
      if (data) {
        body = JSON.stringify(data);
      }
      request.onerror = function (error) {
        reject(new Error('Network Error'));
      };
      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = function () {
          reject(new Error(`timeout of ${timeout}ms exceeded`));
        };
      }
      if (config.cancelToken) {
        config.cancelToken.then((cancelReason: any) => {
          request.abort();
          reject(cancelReason);
        });
      }
      request.send(body);
    });
  }
}
