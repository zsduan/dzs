/*
 * @Author: zs.duan
 * @Date: 2021-10-16 16:21:50
 * @LastEditors: zs.duan
 * @LastEditTime: 2022-03-03 11:42:37
 * @FilePath: \blog_show\src\pages\article-details\article-details.js
 */


import React, { Component } from "react";

import Header from "../../components/header/header";
import Swiper from "../../components/banner/banner";
import MyFooter from "../../components/my-footer/my-footer";
import UserInfo from "../../components/my-user-info/userInfo";
import MyLable from "../../components/my_lable/myLable";
import Wbrs from "../../components/wbrs/wbrs";
import ScollTop from "../../components/scollTop/scollTop";
import Comment from "../../components/comment/comment";
import { _ } from "../../common/request";
import "antd/dist/antd.css";
import "./article-details.css"

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerTitle: "正在获取",
            article_id:  0,
            article_data: {},
            PositionHeight: 0,
            showPublish : true,
            commentList : []
        }
    }

    componentDidMount() {
        this.getValues();
    }

    getValues() {
        let pathname = this.props.location.pathname;
        let pathArr = pathname.split("/");
        let id = pathArr[pathArr.length - 1];
        this.setState({
            article_id : id,
        })
        _.getArticleById({
            id: id
        }).then(res =>{
            this.setState({
                article_data: res.data,
                bannerTitle : res.data.title
            })
            this.getCommentByArticleId();
            document.title = res.data.title;
        })
        
    }

    // 获取文章评论
    getCommentByArticleId(){
        _.getCommentByArticleId({
            article_id : this.state.article_id
        }).then(res =>{
            this.setState({
                commentList : res.data
            })
        })
    }

    // 更新文章评论
    updateComment(){
        this.getCommentByArticleId();
    }

    // 侧边栏改变
    changeslider(e,msg){
        console.log(msg)
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
                <Header
                    history={this.props.history}
                >
                    {" "}
                </Header>
                <Swiper bannerTitle={this.state.bannerTitle}></Swiper>
                <div className="main">
                    <div className="left">
                        <div className="articl-wrop">
                            <div className="title">{this.state.article_data.title}</div>
                            <div className="reading-all">
                                <div className="read">阅读量:{this.state.article_data.reading}</div>
                                <div className="time">{this.state.article_data.addtime}</div>
                                <div className="type">
                                    <a href={"../moreArticle?id=" + this.state.article_data.nav_id}>{this.state.article_data.type}</a>
                                </div>
                            </div>
                            <div className="html-wrop">
                                <div dangerouslySetInnerHTML={{ __html: this.state.article_data.content }} ></div>
                            </div>
                            <div className="read-more">
                                <a href={"../moreArticle?id=" + this.state.article_data.nav_id}>阅读更多内容</a>
                            </div>
                        </div>
                        <div className="comment">
                            <Comment
                                showPublish={this.state.showPublish}
                                commentList = {this.state.commentList}
                                articleId = {this.state.article_id}
                                parent = {this}
                            ></Comment>
                        </div>
                    </div>
                    <div className={`right`} >
                        <div className={`${this.state.PositionHeight ? 'right-position' : '' } `} style={{ top: this.state.PositionHeight ?  "-" + this.state.PositionHeight + "px" : "" }}>
                            <UserInfo
                                history={this.props.history}
                            ></UserInfo>
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