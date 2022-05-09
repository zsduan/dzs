/*
 * @Author: zs.duan
 * @Date: 2021-08-12 16:29:08
 * @LastEditTime: 2022-01-06 15:06:42
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \blog_show\src\components\article-item\article-item.js
 */

import React from "react";

import "./style.css";

class articleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  readMore() {
    if (!this.props.parent || !this.props.parent.readMore) {
      return;
    }
    this.props.parent.readMore(this);
  }

  render() {
    return (
      <div className="article-list">
        {this.props.articleList.length ? (
          <div>
            {this.props.articleList.map((item, index) => {
              return (
                <div className="item" key={index}>
                  {item.imgUrl ? (
                    <div className="left u-img">
                      <img src={item.imgUrl} alt={item.title}></img>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="right-artice">
                    <div className="item-title">
                      <a href={`./article/${item.id}`}>{item.title}</a>
                    </div>
                    <div className="item-content">
                      <a href={`./article/${item.id}`}>{item.brfie}</a>
                    </div>
                    <div className="bottom">
                      <div className="bottom-left">
                        <div className="read">read:{item.reading}</div>
                        <div className="time">{item.addtime}</div>
                        <div className="type">
                          <a href={"./moreArticle?id=" + item.nav_id}>
                            {item.type}
                          </a>
                        </div>
                      </div>
                      <div className="bottom-right">
                        <a href={`./article/${item.id}`}>立即阅读</a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {this.props.showMore ? (
              <div className="read-more">
                <span onClick={this.readMore.bind(this)}>阅读更多内容</span>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="empty">
            <div>暂无内容</div>
          </div>
        )}
      </div>
    );
  }
}

export default articleItem;
