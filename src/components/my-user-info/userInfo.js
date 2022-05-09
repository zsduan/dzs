/*
 * @Author: zs.duan
 * @Date: 2021-08-17 17:15:32
 * @LastEditTime: 2021-11-18 16:32:40
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\components\my-user-info\userInfo.js
 */

import React from "react";
import "./userinfo.css";
import { _ } from "../../common/request";

class userInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : {}
    };
  }

  componentDidMount() {
    this.getValue();
  }

  getValue(){
    if(JSON.stringify(this.state.userInfo) !== "{}"){
      return ;
    }
    _.getMyUserInfo().then(res =>{
      this.setState({
        userInfo: res.data,
      });
    })
  }

  render() {
    return (
      <div>
        {this.state.userInfo.id && (
          <div className="user-wrop">
            <div className="icon">
              <img
                src={this.state.userInfo.usericon}
                alt={this.state.userInfo.username}
              ></img>
            </div>
            <div className="user-name">{this.state.userInfo.username}</div>
            <div className="user-name">{this.state.userInfo.brief}</div>
            <div className="contact">
              <div className="item show-wrop">
                <img
                  src={this.state.userInfo.yxicon}
                  alt={this.state.userInfo.email}
                ></img>
                <div className="show-tips">{this.state.userInfo.email}</div>
              </div>
              <div className="item show-wrop">
                <img src={this.state.userInfo.wxicon} alt="微信"></img>
                <div className="show-tips">
                  <img src={this.state.userInfo.wx} alt="wxcode"></img>
                </div>
              </div>
              <div className="item show-wrop">
                <img src={this.state.userInfo.addressicon} alt="微信"></img>
                <div className="show-tips address">
                  {this.state.userInfo.address}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default userInfo;
