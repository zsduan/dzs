/*
 * @Author: zs.duan
 * @Date: 2021-11-15 15:53:53
 * @LastEditors: zs.duan
 * @LastEditTime: 2022-03-03 13:51:25
 * @FilePath: \blog_show\src\common\api.js
 */


/*
 封装请求
*/

// 请求的头部
let contentType = {
    form: "application/x-www-form-urlencoded; charset=UTF-8",
    json: "application/json",
    multipart: "multipart/form-data",
    stream: "application/json",
    arraybuffer: "arraybuffer" // 图片buffer
}

const baseURL = "https://wxurl.hzdsh169.com/api/";
// const baseURL = "http://localhost:3000/api/";
export const api = {

    // 获取banner
    "getBanner": {
        url: baseURL + "index/getBanner",
        method: "get",
        is_loading: true
    },

    // 获取最新文章
    "getArticle": {
        url: baseURL + "article/getArticle",
        method: "get",
    },

    // 获取nav
    "getNav": {
        url: baseURL + "index/getNav",
        method: "get",
    },

    // 获取是否显示搜索
    "showSearch": {
        url: baseURL + "index/showSearch",
        method: "get",
    },

    // 获取博客标题
    "getBlogTitle": {
        url: baseURL + "index/getBlogTitle",
        method: "get",
    },

    // 获取我的标签
    "getMyLable": {
        url: baseURL + "index/getMyLable",
        method: "get",
    },

    // 获取我的个人信息
    "getMyUserInfo": {
        url: baseURL + "index/getMyUserInfo",
        method: "get",
    },


    // 获取友情链接
    "getLink": {
        url: baseURL + "index/getLink",
        method: "get",
    },

    // 搜索
    "search": {
        url: baseURL + "index/search",
        method: "get",
    },


    // 根据分类查询
    "getArticleByClassifyId": {
        url: baseURL + "article/getArticleByClassifyId",
        method: "get",
    },

    // 根据id查询文章
    "getArticleById": {
        url: baseURL + "article/getArticleById",
        method: "get",
    },

    // 获取微博热搜
    "wbrs": {
        url: baseURL + "wbrs",
        method: "get",
    },

    // 用户登录
    "userLogin": {
        url: baseURL + "users/userLogin",
        method: "post",
    },

    // 用户注册
    "userRegister": {
        url: baseURL + "users/userRegister",
        method: "post",
    },

    // 修改密码
    "updatePassword": {
        url: baseURL + "users/updatePassword",
        method: "post",
        header: contentType.stream
    },

    // 获取评论
    "getCommentByArticleId": {
        url: baseURL + "article/getCommentByArticleId",
        method: "get",
    },

    // 发表评论
    "setComment": {
        url: baseURL + "article/setComment",
        method: "post",
    },

    // 回复评论
    "replyComment": {
        url: baseURL + "article/replyComment",
        method: "post",
    },

    // 简历 个人信息
    "getUserInfo": {
        url: baseURL + "users/getUserInfo",
        method: "get",
    },

    // 简历 自我评价
    "getEvaluate": {
        url: baseURL + "users/getEvaluate",
        method: "get",
    },

    // 简历 我的学校
    "getEducation": {
        url: baseURL + "users/getEducation",
        method: "get",
    },

    // 简历 我的能力
    "getAbility": {
        url: baseURL + "users/getAbility",
        method: "get",
    },

    // 简历 我的项目
    "getProject": {
        url: baseURL + "users/getProject",
        method: "get",
    },

    // 简历 样式
    "getResumeCss": {
        url: baseURL + "users/getResumeCss",
        method: "get",
    },


}