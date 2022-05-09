/*
 * @Author: zs.duan
 * @Date: 2021-11-15 09:49:45
 * @LastEditors: zs.duan
 * @LastEditTime: 2022-03-03 13:37:35
 * @FilePath: \blog_show\src\common\is_bottom.js
 */

// 本文档主要检测是否触底 适用于h5


// 获取卷取的高度
function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}


//文档的需要的总高度 || 整个文档的高度

function getScrollHeight(domJson) {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(domJson){
        for (const key in domJson) {
            if(document.querySelector(domJson[key])){
                scrollHeight += document.querySelector(domJson[key]).offsetHeight;
            }
        }
        return scrollHeight;
    }
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;

    return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode === "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

export const getIsBottom = (domJson) =>{
    domJson = {
        dom1 : ".user-wrop",
        dom2 : ".lable-wrop",
        dom3 : ".wbrs-wrop"
    }

    let wbrsJson = {
        dom1 : ".wbrs-wrop"
    }
    let domHeight = getScrollHeight(domJson);
    let wbrsHeight = getScrollHeight(wbrsJson);

    let top =  (domHeight - wbrsHeight)/2;
    // 想要元素的高度 - 卷去的高度  - 窗口的高度 + 底部的高度  
    if(!document.querySelector(".footer-wrop") || !document.querySelector(".swiper-wrop")){
        return ;
    }
    let num = domHeight - getScrollTop() - getWindowHeight() + document.querySelector(".footer-wrop").offsetHeight + document.querySelector(".swiper-wrop").offsetHeight;
    
    // 判断main左边的高度，高度不够直接 num = 0;
    let leftHeight1 = getScrollHeight({dom1:".article-list",dom2:".more-recommend"});
    if(!leftHeight1){
        leftHeight1 = getScrollHeight({dom1:".articl-wrop"});
    }
    if(domHeight > leftHeight1){
        num = 0;
    }
    return {
        num : num ,
        top : top
    } ;
}

