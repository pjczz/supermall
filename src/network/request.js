import axios from "axios";
import { Promise } from "core-js";

export function request(config) {
  const instance1 = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000,  });
  //axios拦截器
  //1.请求拦截
  instance1.interceptors.request.use(
    (config) => {
      return config; //拦截完要记得把config送回，否则就消失了

      //1 config中的一些信息不符合服务器的要求
      //2 比如每次发送请求时，都希望在界面显示一个请求的图标
      //3 某些网络请求比如登录（需要token） 必须携带一些特殊的信息
    },
    (err) => {
      console.log(err);
    }
  );
  //2. 响应拦截
  instance1.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  return instance1(config); //这样写也可以的原因是本来instance1就是axios 而axios本质上也是一个promise 所以直接返回一个promise再进行then和reject
}
