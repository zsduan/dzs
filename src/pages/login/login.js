/*
 * @Author: zs.duan
 * @Date: 2021-11-18 16:16:24
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-11-23 15:56:16
 * @FilePath: \车巢租车 pcf:\我的博客\blog_show\src\pages\login\login.js
 */
import React, { Component } from "react";
import { _ } from "../../common/request";
import cookie from "react-cookies";
import { Input, Button, message } from "antd";
import { encrypt } from "../../common/encryp";

import "./login.css";



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code_show: "",
            is_login: true, //是否为登录
            fromList: [],
            allTips: {},
            loginTips: {
                title: "用户登录",
                tips: "没有账号？注册一个",
                btn_text: "登录",
            },
            registerTips: {
                title: "用户注册",
                tips: "已有账号？立即登录",
                btn_text: "注册",
            },
            loginList: [
                {
                    label: "用户名",
                    key: "username",
                    type: "text",
                },
                {
                    label: "密码",
                    key: "password",
                    type: "password",
                },
                {
                    label: "验证码",
                    key: "code",
                    type: "text",
                    is_code: true,
                },
            ],
            registerList: [
                {
                    label: "用户名",
                    key: "username",
                    type: "text",
                    is_important: true,
                },
                {
                    label: "密码",
                    key: "password",
                    type: "password",
                    is_important: true,
                },
                {
                    label: "确认密码",
                    key: "confirmPassword",
                    type: "password",
                    is_important: true,
                },
                {
                    label: "邮箱",
                    key: "email",
                    type: "text",
                    is_important: true,
                },
                {
                    label: "手机号",
                    key: "tel",
                    type: "text",
                },
                {
                    label: "验证码",
                    key: "code",
                    type: "text",
                    is_code: true,
                },
            ],
            sbumitList: {},
            is_loading: false,
        };
    }

    warning = (msg) => {
        message.warning(msg);
    }

    loading = (msg) => {
        message.loading(msg, 0);
    }

    success = (msg) => {
        message.success(msg);
    }

    error = (msg) => {
        message.error(msg);
    }

    componentDidMount() {
        this.setState({
            fromList: this.state.loginList,
            allTips: this.state.loginTips,
        });
        document.title = "登录";
        setTimeout(() => {
            this.draw([], this);
        }, 100);
    }

    // 切换登录
    changeLogin() {
        let is_login = !this.state.is_login;
        this.setState({
            is_login: is_login,
        });
        if (is_login) {
            this.setState({
                fromList: this.state.loginList,
                allTips: this.state.loginTips,
            });
            document.title = "登录";

        } else {
            this.setState({
                fromList: this.state.registerList,
                allTips: this.state.registerTips,
            });
            document.title = "注册";
        }
        setTimeout(() => {
            this.draw([], this);
        }, 100);
    }

    // 生成验证码
    //生成并渲染出验证码图形
    draw(show_num, $even) {
        let canvas_width = document.querySelector("#canvas").offsetWidth;
        let canvas_height = document.querySelector("#canvas").offsetHeight;
        let canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
        let context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        let sCode =
            "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        let aCode = sCode.split(",");
        let aLength = aCode.length; //获取到数组的长度
        for (let i = 0; i < 4; i++) {
            //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            let j = Math.floor(Math.random() * aLength); //获取到随机的索引值
            // let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            let deg = Math.random() - 0.5; //产生一个随机弧度
            let txt = aCode[j]; //得到随机的一个内容
            show_num[i] = txt;
            let x = 10 + i * 20; //文字在canvas上的x坐标
            let y = 20 + Math.random() * 8; //文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
            context.translate(x, y);
            context.rotate(deg);
            context.fillStyle = this.randomColor();
            context.fillText(txt, 0, 0);
            context.rotate(-deg);
            context.translate(-x, -y);
        }
        this.setState({
            code_show: show_num.join(""),
        });
        for (let i = 0; i <= 5; i++) {
            //验证码上显示线条
            context.strokeStyle = this.randomColor();
            context.beginPath();
            context.moveTo(
                Math.random() * canvas_width,
                Math.random() * canvas_height
            );
            context.lineTo(
                Math.random() * canvas_width,
                Math.random() * canvas_height
            );
            context.stroke();
        }
        for (let i = 0; i <= 30; i++) {
            //验证码上显示小点
            context.strokeStyle = this.randomColor();
            context.beginPath();
            let x = Math.random() * canvas_width;
            let y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }

    //得到随机的颜色值
    randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    // 获取输入值
    iptChange(key, e) {
        let sbumitList = this.state.sbumitList;
        sbumitList[`${key}`] = e.target.value;
        this.setState({
            sbumitList: sbumitList
        })
    }

    // 提交
    sbumit(e) {
        if (e.keyCode !== 13 && e.type !== "click") {
            return;
        }
        let sbumitList = this.state.sbumitList;
        if (this.state.is_login) {
            let loginList = this.state.loginList;
            let fagle = false;
            loginList.forEach(v => {
                if (!sbumitList[`${v.key}`]) {
                    fagle = true;
                }
            })
            if (fagle) {
                this.error("数据不完整");
                return;
            }
            if (sbumitList.code.toLocaleUpperCase() !== this.state.code_show.toLocaleUpperCase()) {
                this.warning("验证码错误请重新输入");
                this.draw([], this);
                return;
            }
            let timestamp = new Date().getTime();
            let data = {
                password: sbumitList.password,
                username: sbumitList.username
            }

            let allTips = this.state.allTips;
            allTips.btn_text = "登录中";
            this.setState({
                is_loading: true,
                allTips: allTips
            })

            _.userLogin({
                user_login: encrypt(JSON.stringify(data)),
                timestamp: timestamp + 980322,
                pwd_login: encrypt(sbumitList.code),
                code: sbumitList.code,
            }).then(res => {
                this.success(res.msg);
                allTips.btn_text = "登录成功!";
                this.setState({
                    is_loading: false,
                    allTips: allTips
                })
                let inFifteenMinutes = new Date(new Date().getTime() + 1 * 3600 * 1000);//一小时
                let userInfo = encrypt(JSON.stringify(res.data.userinfo));
                cookie.save('userInfo', userInfo, { expires: inFifteenMinutes });
                cookie.save('TK', res.data.token, { expires: inFifteenMinutes });
                setTimeout(() => {
                    this.props.history.push({ pathname: "/home" });
                }, 1000)
            }).catch(() => {
                this.draw([], this);
                allTips.btn_text = "登录";
                this.setState({
                    is_loading: false,
                    allTips: allTips
                })
            })
            return
        }

        this.register();
    }

    // 注册
    register() {
        let sbumitList = this.state.sbumitList;
        let registerList = this.state.registerList;
        let fagle = false;
        registerList.forEach(v => {
            if (!sbumitList[`${v.key}`] && v.is_important) {
                fagle = true;
            }
        })
        if (fagle || !sbumitList.code) {
            this.error("数据不完整");
            return;
        }
        if (sbumitList.code.toLocaleUpperCase() !== this.state.code_show.toLocaleUpperCase()) {
            this.warning("验证码错误请重新输入");
            this.draw([], this);
            return;
        }

        if (sbumitList.password.length < 6) {
            this.warning("请输入6为以上密码");
            this.draw([], this);
            return;
        }

        if (sbumitList.password !== sbumitList.confirmPassword) {
            this.warning("两次输入的密码不一致");
            this.draw([], this);
            return;
        }


        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(sbumitList.email)) {
            this.warning("邮箱格式不正确！");
            this.draw([], this);
            return;
        }


        if (sbumitList.tel && !/^(?:(?:\+|00)86)?1\d{10}$/.test(sbumitList.tel)) {
            this.warning("手机号码格式不正确！");
            this.draw([], this);
            return;
        }
        let allTips = this.state.allTips;
        allTips.btn_text = "注册中";
        this.setState({
            is_loading: true,
            allTips: allTips
        })

        _.userRegister({
            username: sbumitList.username,
            password: sbumitList.password,
            email: sbumitList.email,
            tel: sbumitList.tel || ""
        }).then(res => {
            this.success(res.msg);
            allTips.btn_text = "注册成功!";
            this.setState({
                is_loading: false,
                allTips: allTips
            })
            setTimeout(() => {
                this.setState({
                    fromList : this.state.loginList,
                    allTips : this.state.loginTips
                })
            }, 1000)
        })
    }

    render() {
        return (
            <div className="page-login">
                <div className="login">
                    <div className="title">{this.state.allTips.title}</div>
                    {this.state.fromList.map((item, index) => {
                        return (
                            <div className="ipt-box" key={index}>
                                <label>
                                    {item.is_important ? (
                                        <span className="important">*</span>
                                    ) : (
                                        ""
                                    )}
                                    <span>{item.label}</span>
                                </label>
                                {item.type === "text" ? (
                                    <Input
                                        className={item.is_code ? "code" : ""}
                                        placeholder={"请输入" + item.label}
                                        allowClear={true}
                                        onChange={this.iptChange.bind(this, item.key)}
                                        onKeyDown={this.sbumit.bind(this)}
                                    />
                                ) : (
                                    ""
                                )}
                                {item.type === "password" ? (
                                    <Input.Password
                                        className={item.is_code ? "code" : ""}
                                        placeholder={"请输入" + item.label}
                                        onChange={this.iptChange.bind(this, item.key)}
                                    />
                                ) : (
                                    ""
                                )}
                                {item.is_code ? (
                                    <div className="canvas" onClick={this.draw.bind(this, [])}>
                                        <canvas id="canvas" width="100" height="30">
                                            您的浏览器不支持canvas
                                        </canvas>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        );
                    })}

                    <div className="tips" onClick={this.changeLogin.bind(this)}>
                        {this.state.allTips.tips}
                    </div>

                    <div className="btn-box">
                        <Button className="btn" type="primary" size="large" loading={this.state.is_loading} onClick={this.sbumit.bind(this)}>
                            {this.state.allTips.btn_text}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
