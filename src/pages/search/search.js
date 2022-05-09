/*
 * @Author: zs.duan
 * @Date: 2021-11-04 13:42:10
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-11-23 15:57:04
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\pages\search\search.js
 */

import React, { Component } from "react";

import Header from "../../components/header/header";
import Swiper from "../../components/banner/banner";
import MyFooter from "../../components/my-footer/my-footer";
import UserInfo from "../../components/my-user-info/userInfo";
import MyLable from "../../components/my_lable/myLable";
import Wbrs from "../../components/wbrs/wbrs";
import ArticleItem from "../../components/article-item/article-item";
import ScollTop from "../../components/scollTop/scollTop";
import { _ } from "../../common/request";
import { setData } from "../../common/unit";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerTitle: "正在搜索",
      articleList: [],
      is_empty: false,
    };
  }

  componentDidMount() {
    this.getValues();
  }

  getValues() {
    let json = setData(this.props.location.search);
    _.search({
      q: json.q,
    }).then((res) => {
      document.title = "搜索关键字：" + json.q
      this.setState({
        articleList: res.data,
        bannerTitle: "搜索关键字：" + json.q,
      });
      if (!res.data.length) {
        this.setState({
          is_empty: true,
        });
        this.getIndexValues();
      }
    });
  }

  getIndexValues() {
    _.getArticle({
      page: this.state.page,
      pageSize: this.state.pageSize,
    }).then((res) => {
      this.setState({
        articleList: res.data,
      });
    });
  }

  render() {
    return (
      <div className="page">
        <Header history={this.props.history}> </Header>
        <Swiper bannerTitle={this.state.bannerTitle}></Swiper>
        <div className="main">
          <div className="left">
            {this.state.is_empty ? (
              <div>暂无搜索内容，已为你展示推荐内容</div>
            ) : (
              ""
            )}
            <ArticleItem
              articleList={this.state.articleList}
              history={this.props.history}
            ></ArticleItem>
          </div>
          <div className="right">
            <UserInfo history={this.props.history}></UserInfo>
            <MyLable></MyLable>
            <Wbrs></Wbrs>
          </div>
        </div>
        <MyFooter></MyFooter>
        <ScollTop></ScollTop>
      </div>
    );
  }
}
