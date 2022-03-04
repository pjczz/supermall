import { request } from "./request";
export function getHomeMultidata() {
  //将首页的所有请求封装成函数，在同一个文件下进行管理
  return request({
    url: "/home/multidata",
  });
}
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params:{
      type,
      page
    }
  });
}
