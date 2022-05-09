/*
 * @Author: zs.duan
 * @Date: 2021-08-05 15:01:30
 * @LastEditTime: 2022-04-22 11:06:10
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \blog_show\src\components\header\header.js
 */

import React from "react";
import "./style.css";
import searchpng from "../../static/images/search.png";
import { Input, Avatar } from "antd";
import { _ } from "../../common/request";
import cookie from "react-cookies";
import { decrypt, encrypt } from "../../common/encryp";
import { warning, info, success } from "../../common/unit";
import { Drawer } from 'antd';

import MyPopup from "../my-popup/my-popup";

import more_white from "../../static/phone-img/more-white.png";
import more_black from "../../static/phone-img/more-black.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      show_top: false, //是否显示顶部白色
      navList: [],
      blogTitle: {},
      showSearch: false,
      is_show_login: true,
      userInfo: {},
      show_pup: false,
      pwdList: {},
      is_phone_nav: false,//是否展开手机端nav
      showIconSet : false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.getValue();
    this.getUserInfo();
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }


  changeValue(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  getValue() {
    _.getNav().then(res => {
      res.data.forEach(v => {
        v.is_show = false;
      })
      this.setState({
        navList: res.data
      });
    })

    _.showSearch().then(res => {
      this.setState({
        showSearch: res.data
      });
    })

    _.getBlogTitle().then(res => {
      this.setState({
        blogTitle: res.data,
      });
    })
  }
  // 回到主页
  goHome() {
    this.props.history.push({ pathname: "/home" });
  }

  // 去登录页面
  goLogin() {
    this.props.history.push({ pathname: "/login" });
  }

  // 获取用户信息
  getUserInfo() {
    let token = cookie.load('TK');
    let userInfo = cookie.load('userInfo')
    if (!token || !userInfo) {
      return;
    }
    userInfo = JSON.parse(decrypt(userInfo))
    this.setState({
      userInfo: userInfo,
      is_show_login: false
    })
  }

  handleScroll = (event) => {
    //滚动条高度
    let scrollTop = document.documentElement.scrollTop; //滚动条滚动高度
    if (scrollTop > 100) {
      this.setState({
        show_top: true
      })
      return;
    }
    this.setState({
      show_top: false
    })
  };
  // 开始搜索
  search(e) {
    if (e.keyCode === 13 || e.type === "click") {
      if (this.state.searchValue === "") {
        warning("请输入内容");
        return;
      }
      var a = document.createElement('a');
      a.href = "./search?q=" + this.state.searchValue;
      document.body.appendChild(a)
      a.click() // 点击跳转
      document.body.removeChild(a);
    }
  }

  // 退出登录
  exit() {
    cookie.remove('TK');
    cookie.remove('userInfo');
    this.setState({
      is_show_login: true,
      userInfo: {}
    })
    setTimeout(()=>{
      this.props.history.push({ pathname: "/home" });
    },500)
  }

  closePup(result, msg) {
    this.setState({
      show_pup: msg
    })
  }

  openPup() {
    this.setState({
      show_pup: true
    })
  }

  iptChange(key, e) {
    let pwdList = this.state.pwdList;
    pwdList[`${key}`] = e.target.value;
    this.setState({
      pwdList: pwdList
    })
  }

  onSbumitPup() {
    let pwdList = this.state.pwdList;
    pwdList.id = this.state.userInfo.id;
    if (!pwdList.oldPassword || !pwdList.newPassword) {
      this.warning("请将信息填写完整");
      return;
    }
    _.updatePassword({
      user_login: encrypt(JSON.stringify(pwdList))
    }).then(res => {
      success(res.msg);
      this.closePup();
      setTimeout(() => {
        this.exit();
      }, 200)
    })
  }

  changeUserInfo() {
    info("该功能暂未开放")
  }


  // 点击展开信息
  changeNav(key, e) {
    let navList = this.state.navList;
    navList[key].is_show = !navList[key].is_show;
    this.setState({
      navList: navList
    })
  }

  // 动态nav
  tiggerNav() {
    let is_phone_nav = !this.state.is_phone_nav;
    this.setState({
      is_phone_nav: is_phone_nav
    })
  }

  // 关闭nav
  closeNav() {
    this.setState({
      is_phone_nav: false
    })
  }

  // 打开设置
  showIconSet(){
    this.setState({
      showIconSet : !this.state.showIconSet
    })
  }

  render() {
    return (
      <div className="header-box">
        {/* 修改密码弹窗 */}
        <MyPopup
          is_show={this.state.show_pup}
          showFooter={this.state.show_pup}
          parent={this}
          title={"修改密码"}
          success_txt={"修改"}
          cneterSlot={
            <div>
              <div className="ipt-box">
                <label>原密码</label>
                <Input.Password
                  placeholder="请输入原密码"
                  onChange={this.iptChange.bind(this, "oldPassword")}
                />
              </div>
              <div className="ipt-box">
                <label>新密码</label>
                <Input.Password
                  placeholder="请输入新密码"
                  onChange={this.iptChange.bind(this, "newPassword")}
                />
              </div>
            </div>
          }
        ></MyPopup>


        <div className={`header ${this.state.show_top || this.props.showTop ? 'back' : ''}`}>

          {/* logo */}
          <div className="header-left">
            <a href="/home">{this.state.blogTitle.title}</a>
          </div>

          {/* pc 右边 */}
          <div className="header-right">
            {this.state.showSearch && (
              <div className="search">
                <input
                  placeholder="请输入搜索内容"
                  value={this.state.searchValue}
                  onChange={this.changeValue.bind(this)}
                  onKeyDown={this.search.bind(this)}
                ></input>
                <img
                  src={searchpng}
                  alt="搜索"
                  onClick={this.search.bind(this)}
                ></img>
              </div>
            )}
            <div className="nav-list">
              {this.state.navList.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    {!item.path || item.path === 'null' ? (<a href={"/moreArticle?id=" + item.id}>{item.title}</a>) : (<a href={item.path}>{item.title}</a>)}

                    {item.list.length ? (
                      <div className="item-list-wrop">
                        <div className="item-list">
                          {item.list.map((itm, idx) => {
                            return (
                              <div className="item-item" key={idx}>
                                {!itm.path || itm.path === 'null' ? (<a href={"/moreArticle?id=" + itm.id}>{itm.title}</a>) : (<a href={itm.path}>{itm.title}</a>)}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}

              {
                this.state.is_show_login ? (<div className="login item" onClick={this.goLogin.bind(this)}>登录</div>) : (
                  <div className="icon-box">
                    <div className="icon">
                      <Avatar src={this.state.userInfo.icon}></Avatar>
                    </div>
                    <div className="select">
                      <div className="option" onClick={this.openPup.bind(this)}>修改密码</div>
                      <div className="option" onClick={this.changeUserInfo.bind(this)}>修改个人信息</div>
                      <div className="option" onClick={this.exit.bind(this)}>退出登录</div>
                    </div>
                  </div>
                )
              }

            </div>
          </div>

          {/* wap 左边 */}
          <div className="header-left-phone">
            <div className="icon" onClick={this.tiggerNav.bind(this)}>
              {
                this.state.show_top ? (
                  <img alt="更多" src={more_black} />
                ) : (
                  <img alt="更多" src={more_white} />
                )
              }
            </div>
          </div>

          {/* wap中间 */}
          <div className="header-center-phone">
            {this.state.showSearch ? (
              <div className="search">
                <input
                  placeholder="请输入搜索内容"
                  value={this.state.searchValue}
                  onChange={this.changeValue.bind(this)}
                  onKeyDown={this.search.bind(this)}
                ></input>
                <img
                  src={searchpng}
                  alt="搜索"
                  onClick={this.search.bind(this)}
                ></img>
              </div>
            ) : (
              <div className="header-center-title">zs.duan的个人博客</div>
            )}
          </div>

          {/* wap右边 */}
          {
            this.state.is_show_login ? (<div className="login item header-right-phone" onClick={this.goLogin.bind(this)}>登录</div>) : (
              <div className="icon-box header-right-phone">
                <div className="icon" onClick={this.showIconSet.bind(this)}>
                  <img src={this.state.userInfo.icon} alt="头像"/>
                </div>
                <div className={`select ${this.state.showIconSet ? 'select-active' : ''}`}>
                  <div className="option" onClick={this.exit.bind(this)}>退出登录</div>
                </div>
              </div>
            )
          }
        </div>

        {/* 下拉列表 */}
        {
          this.state.is_phone_nav ? (
            <Drawer
              title="目录"
              placement={"left"}
              closable={false}
              onClose={this.closeNav.bind(this)}
              visible={this.state.is_phone_nav}
              key="left"

            >
              <div className={`nav-list-phone ${this.state.show_top || this.props.showTop ? 'nav-list-phone-white' : ''}`}>
                {this.state.navList.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      {
                        !item.list.length && item.title !== '关于我' ? (
                          <p onClick={this.closeNav.bind(this)}>
                            {(!item.path || item.path === 'null') ? (<a href={"/moreArticle?id=" + item.id}>{item.title}</a>) : (<a href={item.path}>{item.title}</a>)}
                          </p>
                        ) : (
                          <div>
                            {
                              item.title !== '关于我' ? (
                                <p className="item-list-top" onClick={this.changeNav.bind(this, index)}>{item.title}</p>
                              ) : ("")
                            }
                          </div>
                        )
                      }

                      {item.list.length ? (
                        <div className={`item-list-wrop ${item.is_show ? 'item-list-wrop-active' : ''}`}>
                          <div className="item-list">
                            {item.list.map((itm, idx) => {
                              return (
                                <div className="item-item" key={idx} onClick={this.closeNav.bind(this)}>
                                  {!itm.path || itm.path === 'null' ? (<a href={"/moreArticle?id=" + itm.id}>{itm.title}</a>) : (<a href={itm.path}>{itm.title}</a>)}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
                <div className="item">
                  <p>
                    <a href="/phoneNewPage/1">我的标签</a>
                  </p>
                </div>
                <div className="item">
                  <p>
                    <a href="/phoneNewPage/2">微博热搜</a>
                  </p>
                </div>
                <div className="item">
                  <p>
                    <a href="/phoneNewPage/3">关于我</a>
                  </p>
                </div>
              </div>
            </Drawer>
          ) : ("")
        }

      </div>
    );
  }
}

export default Header;
