/*
 * @Author: your name
 * @Date: 2021-08-05 11:31:31
 * @LastEditTime: 2022-03-03 11:36:22
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \blog_show\src\pages\home.js
 */

import React, { Component } from "react";

import Header from "../components/header/header";
import Swiper from "../components/banner/banner";
import ArticleItem from "../components/article-item/article-item";
import UserInfo from "../components/my-user-info/userInfo";
import MyLable from "../components/my_lable/myLable";
import Wbrs from "../components/wbrs/wbrs";
import MyFooter from "../components/my-footer/my-footer";
import ScollTop from "../components/scollTop/scollTop";




import { _ } from "../common/request";

import "../static/css/home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
      articleList: [],
      PositionHeight: 0, //侧边栏顶部高度
      page : 1,
      pageSize : 5,
      showMore : true
    };
  }

  componentDidMount() {
    this.getBanner();
    this.getArticle();
    document.title = "zs.duan的个人博客";
  }

  // 获取banner
  getBanner(){
    _.getBanner().then((res) =>{
      let bannerList = [...res.data];
      bannerList.forEach((v) => {
        v.title = v.title.replace(/；/g, "，");
        v.list = v.title.split("，");
        if(v.path){
          let arr = v.path.split("=");
          v.path = "/article/" + arr[1];
        }
      });
      this.setState({
        bannerList: bannerList,
      });
    })
  }

  // 获取最新文章
  getArticle(){
    _.getArticle({
      page : this.state.page,
      pageSize : this.state.pageSize
    }).then(res =>{
      let articleList = this.state.articleList;
      articleList.push(...res.data);
      if(res.data.length < this.state.pageSize){
        this.setState({
          showMore : false
        })
      }
      this.setState({
        articleList: articleList,
      });
    })
  }

  // 阅读更多
  readMore(){
    this.setState({
      page : this.state.page + 1
    })
    setTimeout(()=>{
      this.getArticle();
    },100)
  }

  // 侧边栏改变
  changeslider(e,msg){
    if(msg){
      this.setState({
        PositionHeight : msg
      })
      return ;
    }
    this.setState({
      PositionHeight : 0
    })
  }

  render() {
    return (
      <div className="page">
        <Header history={this.props.history}> </Header>
        <Swiper bannerList={this.state.bannerList}></Swiper>
        <div className="main">
          <div className="left">
            <ArticleItem
              articleList={this.state.articleList}
              history={this.props.history}
              parent = {this}
              showMore = {this.state.showMore}
            ></ArticleItem>
          </div>
          <div className="right" >
            <div className={`${this.state.PositionHeight ? 'right-position' : '' } `} style={{ top: this.state.PositionHeight ?  "-" + this.state.PositionHeight + "px" : "" }}>
              <UserInfo
                history={this.props.history}
              ></UserInfo>
              <MyLable></MyLable>
              <Wbrs
                parent = {this}
              ></Wbrs>
            </div>
          </div>
        </div>
        <MyFooter></MyFooter>
        <ScollTop></ScollTop>
      </div>
    );
  }
}
