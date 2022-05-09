/*
 * @Author: zs.duan
 * @Date: 2021-11-19 16:45:39
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-11-22 11:42:49
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\components\my-popup\my-popup.js
 */


import React from "react";
import { Button } from "antd";

import closeImg from "../../static/images/close.png"
import "./my-popup.css";

class MyPopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){}

    onclose(){
        if(!this.props.parent || !this.props.parent.closePup){
            return ;
        }
        this.props.parent.closePup(this, false);
    }

    onSbumit(){
        if(!this.props.parent || !this.props.parent.onSbumitPup){
            return ;
        }
        this.props.parent.onSbumitPup(this);
    }

    render(){
        return (
            <div className="component-mypopup">
                {
                    this.props.is_show ? (
                        <div className="pup-box">
                            <div className={!this.props.showFooter ? 'content-footer content':'content'}>
                                <div className="title">{this.props.title ? this.props.title : "添加"}</div>
                                <div className="close" onClick={this.onclose.bind(this)}>
                                    <img alt="关闭" src={closeImg}></img>
                                </div>
                                <div className="center">
                                    {this.props.cneterSlot}
                                </div>
                                {
                                    this.props.showFooter ? (
                                        <div className="sbumit">
                                            <Button className="btn" onClick={this.onSbumit.bind(this)}>{this.props.success_txt ? this.props.success_txt : "提交"}</Button>
                                            <Button className="btn cancel" onClick={this.onclose.bind(this)}>取消</Button>
                                        </div>
                                    ) : ("")
                                }
                            </div>
                        </div>
                    ) : ("")
                }
                
            </div>
        )
    }
}

export default MyPopup;