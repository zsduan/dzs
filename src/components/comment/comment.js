/*
 * @Author: zs.duan
 * @Date: 2021-11-22 14:39:05
 * @LastEditors: zs.duan
 * @LastEditTime: 2022-04-22 11:08:33
 * @FilePath: \blog_show\src\components\comment\comment.js
 */


import React from "react";
import cookie from "react-cookies";
import { decrypt } from "../../common/encryp";
import { Input, Button } from 'antd';
import replyIcon from "../../static/images/reply-icon.png";

import { warning, success } from "../../common/unit"

import { _ } from "../../common/request";

import "./comment.css";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            is_reply: false,
            replyItem: {},
            placeholder: "快来发表你的评论吧！",
            content: "",
        };
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        let token = cookie.load('TK');
        let userInfo = cookie.load('userInfo')
        if (!token || !userInfo) {
            return;
        }

        userInfo = JSON.parse(decrypt(userInfo));
        this.setState({
            userInfo: userInfo,
        })
    }

    replyItem(item, e) {
        this.setState({
            replyItem: item,
            is_reply: true,
            placeholder: "回复@" + item.username
        })
    }

    alone() {
        this.setState({
            replyItem: {},
            is_reply: false,
            placeholder: "快来发表你的评论吧！"
        })
    }

    // 获取输入值
    iptChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    setComment() {
        if (!this.state.content) {
            warning("评论内容不能为空")
            return;
        }
        let token = cookie.load('TK');
        _.setComment({
            article_id: this.props.articleId,
            content: this.state.content,
            token: token
        }).then(res => {
            success(res.msg);
            this.setState({
                content: ""
            })
            this.updateComment();
        })
    }

    // 更新评论
    updateComment() {
        if (!this.props.parent || !this.props.parent.updateComment) {
            return;
        }
        this.props.parent.updateComment(this);
    }

    // 回复评论
    replyComment(){
        if (!this.state.content) {
            warning("回复评论内容不能为空")
            return;
        }
        let token = cookie.load('TK');
        _.replyComment({
            reply_id: this.state.replyItem.id,
            content: this.state.content,
            token: token
        }).then(res => {
            success(res.msg);
            this.setState({
                content: ""
            })
            this.updateComment();
            this.alone();
        })
    }

    render() {
        return (
            <div className="comment-box">
                {
                    this.props.showPublish && '{}' !== JSON.stringify(this.state.userInfo) ? (
                        <div className="publish-box">
                            <div className="left">
                                <div className="icon">
                                    <img alt="用户头像" src={this.state.userInfo.icon}></img>
                                </div>
                                <div className="username">{this.state.userInfo.username}</div>
                            </div>
                            <div className="right">
                                <div className="right-top">
                                    <Input.TextArea
                                        className="textArea"
                                        placeholder={this.state.placeholder}
                                        onChange={this.iptChange.bind(this)}
                                        value={this.state.content}
                                    ></Input.TextArea>
                                </div>
                                <div className="right-bottom">
                                    {
                                        this.state.is_reply ? (
                                            <div>
                                                <Button type="primary" onClick={this.replyComment.bind(this)}>回复</Button>
                                                <span className="changebtn" onClick={this.alone.bind(this)}>单独发表</span>
                                            </div>
                                        ) : (

                                            <div>
                                                <Button type="primary" onClick={this.setComment.bind(this)}>发表</Button>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    ) : ("")
                }

                {
                    this.props.commentList && this.props.commentList.length ? (
                        <div className="comment-list">
                            <div className="title">网友评论：</div>
                            {
                                this.props.commentList.map((item, index) => {
                                    return (
                                        <div className="item-box" key={index}>
                                            <div className="item">
                                                <div className="left">
                                                    <div className="icon">
                                                        <img alt={item.username} src={item.icon}></img>
                                                    </div>
                                                    <div className="username">{item.username}</div>
                                                </div>
                                                <div className="right">
                                                    <div className="right-top">
                                                        <p className="content">
                                                            {item.content}
                                                        </p>
                                                        <div className="reply" onClick={this.replyItem.bind(this, item)}>
                                                            <img alt={`回复${item.username}`} src={replyIcon}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                item.list.length ? (
                                                    <div className="item-item-box">
                                                        {
                                                            item.list.map((itm, idx) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <div className="item item-item">
                                                                            <div className="left">
                                                                                <div className="icon">
                                                                                    <img alt={item.username} src={item.icon}></img>
                                                                                </div>
                                                                                <div className="username">{item.username}</div>
                                                                            </div>
                                                                            <div className="right">
                                                                                <div className="right-top">
                                                                                    <p className="content">
                                                                                        {item.content}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                ) : ("")
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="empty">
                            还没有评论，来抢沙发吧~
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Comment;