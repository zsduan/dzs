/*
 * @Author: zs.duan
 * @Date: 2021-12-10 11:21:02
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-12-17 15:18:02
 * @FilePath: \templatef:\我的博客\blog_show\src\pages\phone-new-page\phone-new-page.js
 */


import React, { Component } from "react";

import Header from "../../components/header/header";
import Swiper from "../../components/banner/banner";
import MyFooter from "../../components/my-footer/my-footer";
import UserInfo from "../../components/my-user-info/userInfo";
import MyLable from "../../components/my_lable/myLable";
import Wbrs from "../../components/wbrs/wbrs";
import ScollTop from "../../components/scollTop/scollTop";

import "./phone-new-page.css"

export default class PhoneNewPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            bannerTitle : "new-page",
            statu : 0 ,
        }
    }

    componentDidMount(){
        this.init();
    }

    init(){
        let pathname = this.props.location.pathname;
        let pathArr = pathname.split("/");
        let id = pathArr[pathArr.length - 1];
        let name = Number(id) === 1 ? '我的标签' : Number(id) === 2 ? "微博热搜" : "关于我";
        this.setState({
            bannerTitle : name,
            statu : Number(id)
        })
        
    }

    render(){
        return(
            <div className="phone-new-page-box">
                <Header history={this.props.history}> </Header>
                <Swiper bannerTitle={this.state.bannerTitle}></Swiper>
                <div className="mian">
                    {/* 我的标签 */}
                    {
                        this.state.statu === 1 ? (
                            <div>
                                <MyLable></MyLable>
                            </div>
                        ):("")
                    }

                    {/* 微博热搜 */}
                    {
                        this.state.statu === 2 ? (
                            <div>
                                <Wbrs></Wbrs>
                            </div>
                        ):("")
                    }

                    {/* 关于我 */}
                    {
                        this.state.statu === 3 ? (
                            <div>
                                <UserInfo></UserInfo>
                            </div>
                        ):("")
                    }
                </div>
                <MyFooter></MyFooter>
                <ScollTop></ScollTop>
            </div>
        )
    }
}