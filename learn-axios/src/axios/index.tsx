import Axios from './Axios';
import { AxiosInstance } from './types';
import { CancelToken, isCancel } from './cancel';

// 可以创建一个axios实例，axios其实就是一个函数
function createInstance(): AxiosInstance {
  let context: Axios<any> = new Axios(); // this 指针上下文

  // 让request方法里的this永远指向context
  let instance = Axios.prototype.request.bind(context);

  // 将原型上的属性和实例上的属性拷贝到这个函数instance上，也就是request方法上
  Object.assign(instance, Axios.prototype, context);

  return instance as AxiosInstance;
}

let axios = createInstance();
axios.CancelToken = new CancelToken();
axios.isCancel = isCancel;

export default axios;

export * from './types';
