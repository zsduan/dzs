/*
 * @Author: zs.duan
 * @Date: 2021-08-17 20:32:36
 * @LastEditTime: 2022-04-22 11:10:02
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \blog_show\src\components\wbrs\wbrs.js
 */

import React from "react";
import { _ } from "../../common/request";

import {getIsBottom} from "../../common/is_bottom";

import "./wbrs.css";

class wbrs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wbrsList: [],
    };
  }

  componentDidMount() {
    this.getWbrs();
  }

  // 监听距离底部的距离
  IsBottom(){
    let _this = this;
    window.onscroll = function (){
      let json = getIsBottom();
      if(!json){
        return ;
      }
      if(json.num && json.num < 0){
        _this.updateBottom(json.top);
        return ;
      }
      _this.updateBottom(0);
    }
  }

  updateBottom(top) {
    if (!this.props.parent || !this.props.parent.changeslider) {
        return;
    }
    this.props.parent.changeslider(this,top || 0);
  }

  getWbrs() {
    _.wbrs().then(res =>{
      let arr = [],count = 0;
      res.data.forEach((v) => {
        if (count < 9) {
          arr.push(v);
        }
        count++;
      });
      this.setState({
        wbrsList: arr,
      });
      setTimeout(()=>{
        this.IsBottom();
      },100)
    })
  }

  render() {
    return (
      <div>
        {this.state.wbrsList.length > 0 && (
          <div className="wbrs-wrop">
            <div className="title">微博热搜</div>
            <div className="list">
              {this.state.wbrsList.map((item, index) => {
                return (
                  <div key={index} className="item">
                    <a href={item.url} className="name" target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  </div>
                );
              })}
              <div className="item more">
                <a href="https://weibo.com/hot/search" target="_blank" rel="noopener noreferrer">
                  更多热搜
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default wbrs;
