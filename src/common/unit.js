/*
 * @Author: zs.duan
 * @Date: 2021-11-05 16:59:39
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-11-22 10:49:52
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\common\unit.js
 */
import { message } from "antd";
export const setData = query =>{
    let str = query.replace("?", "&");
    let arr = str.split("&");
    let json = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length) {
        let newArr = arr[i].split("=");
        json[newArr[0]] = decodeURI(newArr[1]);
      }
    }
    return json;
}

export const JumpHref = query =>{
  var a = document.createElement('a');
  a.href = query.url;
  a.target= query.target || " ";
  document.body.appendChild(a);
  a.click(); // 点击跳转
  document.body.removeChild(a);
}

// 警告消息
export const warning = msg =>{
  message.warning(msg);
}

// 成功消息
export const success = msg =>{
  message.success(msg);
}

// 提示消息
export const info = msg =>{
  message.info(msg);
}

// 错误消息
export const error = msg =>{
  message.error(msg);
}

// 加载中消息
export const loading = msg =>{
  message.loading(msg,0);
}

// 销毁消息
export const msgDestroy = () =>{
  message.destroy()
}
