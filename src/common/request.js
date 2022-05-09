/*
 * @Author: zs.duan
 * @Date: 2021-08-05 11:37:54
 * @LastEditTime: 2021-11-19 15:04:34
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\common\request.js
 */

import axios from "axios";
import {message} from "antd";
import "antd/dist/antd.css";
const apiList = require("./api").api;


const warning = (msg) =>{
    message.warning(msg);
}

const loading = (msg) =>{
    message.loading(msg, 0);
}

const error = (msg) =>{
    message.error(msg);
}


// 新版请求
let reqList = {};
const $get = (obj) => {
    let urls = `${obj.url}`; //拼接 url
    urls = obj.is_url ? obj.url : urls; //是否需要重写url 接外部的请求
    
    return function (data) {
        let count = 0;
        let getData = ""; //发送数据
        for (let key in data) {
            if (count === 0) {
                getData += '?' + key + "=" + data[key];
            } else {
                getData += '&' + key + "=" + data[key];
            }
            count++;
        }
        let requestData = {
            header: obj.header || "",
            url: urls + "" + getData,
            Loading: obj.is_loading,
            method: "GET",
            data: {}
        }
        return request(requestData);
    }
}

const $requests = (obj) => {
    let urls = `${obj.url}`; //拼接 url
    urls = obj.is_url ? obj.url : urls; //是否需要重写url 接外部的请求
    return function (data) {
        let requestData = {
            header: obj.header,
            url: urls,
            Loading: obj.is_loading,
            method: obj.method,
            data: data
        }
        return request(requestData);
    } 
}

for (const item in apiList) {
    if (apiList[item].method === "get") {
        reqList[`${item}`] = $get(apiList[item]);
    } else {
        reqList[`${item}`] = $requests(apiList[item])
    }
}

// 请求
const request = (data) => {
	if(data.Loading) loading("正在加载中,请稍等~");
    return new Promise((resolve, reject) => {
        axios({
            header:  {'content-type': data.header ? data.header : 'application/json; charset=utf-8'},
            url: data.url,
            method: data.method,
            data: data.data,
        }).then(res =>{
			if(data.Loading) message.destroy();
			if (res.status !== 200 && res.status !== 304) {
				warning("网络或请求错误");
				reject({
					code: -1,
					msg: "网络或请求错误"
				});
				return;
			}
			if (res.data.code < 0) { //专属判断
				warning(res.data.msg);
				reject({
					code: -1,
					msg: res.data.msg,
					data:res.data
				});
				return;
			}
			resolve(res.data);
		}).catch(err =>{
			if(data.Loading) message.destroy();
			error("服务器有点小问题刷新试一试");
            reject({
                code: -2,
                msg: "服务器问题",
				data : err
            });
		})
    })
}

export const _ = reqList;
