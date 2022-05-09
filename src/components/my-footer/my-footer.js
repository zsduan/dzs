/*
 * @Author: zs.duan
 * @Date: 2021-08-17 21:04:27
 * @LastEditTime: 2021-11-18 16:32:30
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\components\my-footer\my-footer.js
 */

import React from "react";
import { _ } from "../../common/request";


import "./my-footer.css";

class myFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 0,
      day: 0,
      blogTitle : {},
      linkList : []
    };
  }

  componentDidMount() {
      this.getYears();
      this.getValue(); 
  }

  // 获取运行时间
  getYears() {
    let date = new Date();
    let year = date.getFullYear();
    let mouth = date.getMonth() + 1;
    let day = date.getDate();
    let days = new Date(year + "-" + mouth + "-" + day) - new Date("2021-08-05");
    this.setState({
        year : year,
        day : parseInt(days / (1000 * 60 * 60 * 24)) + 1
    })
  }

  getValue(){
    if(JSON.stringify(this.state.blogTitle) !== '{}'){
      return ;
    }
    _.getBlogTitle().then(res =>{
      this.setState({
        blogTitle: res.data,
      });
    })

    if(this.state.linkList.length){
      return ;
    }
    _.getLink().then(res =>{
      this.setState({
        linkList : res.data
      });
    })
  }

  render() {
    return (
      <div className="footer-wrop">
        <div className="tips">
          {this.state.blogTitle.title},{this.state.blogTitle.brfie}
        </div>
        <div className="linkList">
          <div className="item">友情链接：</div>
          {this.state.linkList.map((item, index) => {
            return (
              <div className="item" key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </div>
            );
          })}
        </div>
        <div className="footer-tips">
          <p>&copy;2021-{this.state.year},段钟山的个人博客</p>
          <p>本网站勉强运行{this.state.day}天</p>
        </div>
      </div>
    );
  }
}

export default myFooter;
