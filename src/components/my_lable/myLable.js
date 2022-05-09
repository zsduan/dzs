/*
 * @Author: zs.duan
 * @Date: 2021-08-17 20:10:57
 * @LastEditTime: 2021-11-18 16:22:23
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\components\my_lable\myLable.js
 */

import React from "react";
import "./mylable.css";
import { _ } from "../../common/request";

class myLable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lableList : []
    };
  }

  componentDidMount() {
    this.getValue();
  }

  getValue(){
    if(this.state.lableList.length){
      return ;
    }
    _.getMyLable().then(res =>{
      this.setState({
        lableList : res.data,
      });
    })
  }

  render() {
    return (
      <div>
        {this.state.lableList.length > 0 && (
          <div className="lable-wrop">
            <div className="title">我的标签</div>
            <div className="list">
              {this.state.lableList.map((item, index) => {
                return (
                  <div key={index} className="item">
                    {item.title}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default myLable;
