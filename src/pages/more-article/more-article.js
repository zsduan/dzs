/*
 * @Author: zs.duan
 * @Date: 2021-11-05 16:58:41
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-12-15 09:46:41
 * @FilePath: \重庆蒂慕商贸有限公司f:\我的博客\blog_show\src\pages\more-article\more-article.js
 */

import React, { Component } from "react";

import Header from "../../components/header/header";
import Swiper from "../../components/banner/banner";
import MyFooter from "../../components/my-footer/my-footer";
import UserInfo from "../../components/my-user-info/userInfo";
import MyLable from "../../components/my_lable/myLable";
import Wbrs from "../../components/wbrs/wbrs";
import ArticleItem from "../../components/article-item/article-item";
import { _ } from "../../common/request";
import { setData } from "../../common/unit";
import ScollTop from "../../components/scollTop/scollTop";

import "./more-article.css";

export default class MoreArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navTitle: "当前分类",
            articleList: [],
            showMore: true,
            moreArticleList: [],
            page: 1,
            pageSize: 5,
            PositionHeight: 0,
        };
    }

    componentDidMount() {
        this.getValues();
    }

    // 获取数据
    getValues() {
        let json = setData(this.props.location.search);
        _.getArticleByClassifyId({
            id: json.id,
            page: this.state.page,
            pageSize: this.state.pageSize
        }).then((res) => {
            let list = this.state.articleList;
            list.push(...res.data.articleLsit);
            if (res.data.articleLsit.length < 5) {
                this.setState({
                    showMore: false,
                });
                this.getArticle();
            }
            list.forEach((v) => {
                v.type = res.data.navTitle;
                v.nav_id = json.id;
            });
            this.setState({
                articleList: list,
                navTitle: "当前分类：" + res.data.navTitle,
            });
            document.title = "当前分类：" + res.data.navTitle;
        });
    }

    // 获取相关推荐
    getArticle() {
        _.getArticle({
            page: 1,
            pageSize: 3
        }).then(res => {
            this.setState({
                moreArticleList: res.data,
            });
        })
    }

    // 获取更多数据
    readMore() {
        this.setState({
            page: this.state.page + 1
        })
        setTimeout(() => {
            this.getValues();
        }, 100)
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
            <div className="more-article-box">
                <Header history={this.props.history}> </Header>
                <Swiper bannerTitle={this.state.navTitle}></Swiper>
                <div className="main">
                    <div className="left">
                        <ArticleItem
                            articleList={this.state.articleList}
                            history={this.props.history}
                            parent={this}
                            showMore={this.state.showMore}
                        ></ArticleItem>
                        {this.state.articleList.length < this.state.pageSize ? (
                            <div className="more-recommend">
                                <div className="recommend">相关推荐</div>
                                <ArticleItem
                                    articleList={this.state.moreArticleList}
                                    history={this.props.history}
                                    parent={this}
                                    showMore={false}
                                ></ArticleItem>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="right">
                        <div className={`${this.state.PositionHeight ? 'right-position' : '' } `} style={{ top: this.state.PositionHeight ?  "-" + this.state.PositionHeight + "px" : "" }}>
                            <UserInfo history={this.props.history}></UserInfo>
                            <MyLable></MyLable>
                            <Wbrs parent={this}></Wbrs>
                        </div>
                    </div>
                </div>
                <MyFooter></MyFooter>
                <ScollTop></ScollTop>
            </div>
        );
    }
}
