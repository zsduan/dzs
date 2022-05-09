/*
 * @Author: zs.duan
 * @Date: 2021-11-22 13:51:20
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-11-22 14:12:58
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\components\scollTop\scollTop.JS
 */
import React from "react";
import { BackTop  } from "antd";

import scollTopImg from "../../static/images/scollTop.png";
import "./scollTop.css";

class ScollTop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){}

    render(){
        return (
           <div className="scollTop-box">
               <BackTop >
                    <img alt="会顶部" src={scollTopImg}></img>
               </BackTop>
           </div>
        )
    }
}

export default ScollTop;