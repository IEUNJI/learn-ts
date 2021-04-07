import axios, { AxiosResponse } from './axios';

const baseUrl = 'http://localhost:8080';

// 指的是服务器返回的对象
interface User {
  name: string;
  password: string;
}

let user: User = {
  name: 'ieunji',
  password: '123456'
};

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const isCancel = axios.isCancel;

axios({
  method: 'POST', // 方法名
  url: baseUrl + '/post', // 访问路径
  headers: {
    // 'name': 'ieunji'
  },
  cancelToken: source.token,
  data: user, // 查询参数对象，转换成查询字符串放在?的后面
}).then((response: AxiosResponse<User>) => {
  console.log(response);
  return response.data;
}).then((data) => {
  
}).catch((error: any) => {
  if (isCancel(error)) {
    console.log('qing qiu quxiao');
  }
  console.log(error);
});

source.cancel('取消啦请求');
