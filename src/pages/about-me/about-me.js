/*
 * @Author: zs.duan
 * @Date: 2021-11-23 11:45:09
 * @LastEditors: zs.duan
 * @LastEditTime: 2021-12-20 16:58:56
 * @FilePath: \templatef:\我的博客\blog_show\src\pages\about-me\about-me.js
 */


import React, { Component } from "react";
import { _ } from "../../common/request";
import Header from "../../components/header/header";
import ScollTop from "../../components/scollTop/scollTop";
import html2pdf from "html2pdf.js";

import top_line from "../../static/images/top-line.png";
import title_back from "../../static/images/title-back.png";

import "./about-me.css";


export default class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            evaluateInfo: {},
            educationList: [],
            abilityList: [],
            projectList: [],
            publicData: {}
        }
    }

    componentDidMount() {
        document.title = "关于我";
        this.getUserInfo();
        this.getEvaluate();
        this.getEducation();
        this.getAbility();
        this.getProject();
    }

    getUserInfo() {
        let pathname = this.props.location.pathname;
        let pathArr = pathname.split("/");
        let type = pathArr[pathArr.length - 1];
        _.getUserInfo({ type: type }).then(res => {
            this.setState({
                userInfo: res.data
            })
        })
    }

    getEvaluate() {
        _.getEvaluate().then(res => {
            this.setState({
                evaluateInfo: res.data
            })
        })
    }

    getEducation() {
        let pathname = this.props.location.pathname;
        let pathArr = pathname.split("/");
        let type = pathArr[pathArr.length - 1];
        _.getEducation({ type: type }).then(res => {
            this.setState({
                educationList: res.data
            })
        })
    }

    getAbility() {
        _.getAbility().then(res => {
            this.setState({
                abilityList: res.data
            })
        })
    }

    getProject() {
        _.getProject().then(res => {
            this.setState({
                projectList: res.data
            })
        })
    }

    getResumeCss() {
        _.getResumeCss().then(res => {
            this.setState({
                publicData: res.data
            })
        })
    }

    // 导入为pdf
    htmlToPdf() {
        var element = document.getElementById('element-to-print1');
        var element1 = document.getElementById('element-to-print2');
        let element2 = this.getHTML(element, true) + this.getHTML(element1, true);
        element2 = '<style>' + this.state.publicData.css + "</style>" + element2;
        var opt = {
            filename: '我的简历' + this.getTimes() + ".pdf",
        };
        html2pdf().set(opt).from(element2).save();
    }

    // 将dom转化为string
    getHTML(who, deep) {
        if (!who || !who.tagName) return '';
        var txt, ax, el = document.createElement("div");
        el.appendChild(who.cloneNode(false));
        txt = el.innerHTML;
        if (deep) {
            ax = txt.indexOf('>') + 1;
            txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
        }
        el = null;
        return txt;
    }

    getTimes() {
        let date = new Date();
        let year = date.getFullYear(); //获取完整的年份(4位)
        let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        let day = date.getDate(); //获取当前日(1-31)
        let hours = date.getHours(); //获取当前小时数(0-23)
        let min = date.getMinutes(); //获取当前分钟数(0-59)
        return year.toString() + this.addZro(month) + this.addZro(day) + this.addZro(hours) + this.addZro(min);
    }

    addZro(num) {
        if (num < 10) return '0' + num;
        return num;
    }

    // 打印
    print = () => {
        var element = document.getElementById('element-to-print1');
        var element1 = document.getElementById('element-to-print2');
        let element2 = this.getHTML(element, true) + this.getHTML(element1, true);
        element2 = '<style>' + this.state.publicData.css + "</style>" + element2;
        window.document.body.innerHTML = element2;
        window.print();
        window.location.reload();
    }


    render() {
        return (
            <div className="about-me-box">
                <Header showTop={true}></Header>
                <div className="content-box">
                    <div className="a4-box">
                        <div id="element-to-print1" className="A4">
                            <div className="left-line"></div>
                            <div className="title-box">
                                <div className="left">
                                    <div className="title">我的简历</div>
                                    <div className="line"></div>
                                </div>
                                <div className="intention">求职意向：Web前端工程师</div>
                            </div>
                            <div className="top-line">
                                <img src={top_line} alt="顶部图片" />
                            </div>
                            {/* 用户信息 */}
                            <div className="userinfo-box">
                                <div className="title-back-box">
                                    <img src={title_back} alt="标题背景"></img>
                                    <span>基本信息</span>
                                </div>
                                <div className="userinfo">
                                    <div className="left">
                                        <div className="item">
                                            <span className="title">姓名</span>
                                            <span className="colon">:</span>
                                            <span>{this.state.userInfo.username}</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">出生年月</span>
                                            <span className="colon">:</span>
                                            <span>1997.10</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">邮箱</span>
                                            <span className="colon">:</span>
                                            <span>{this.state.userInfo.email}</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">电话</span>
                                            <span className="colon">:</span>
                                            <span>{this.state.userInfo.tel}</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">住址</span>
                                            <span className="colon">:</span>
                                            <span>{this.state.userInfo.address}</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">工作经验</span>
                                            <span className="colon">:</span>
                                            <span>{this.state.userInfo.work_years}年</span>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <img src={this.state.userInfo.usericon} alt={this.state.userInfo.username} />
                                    </div>
                                </div>
                            </div>

                            {/* 自我评价 */}
                            <div className="evaluate-box">
                                <div className="title-back-box">
                                    <img src={title_back} alt="标题背景"></img>
                                    <span>自我评价</span>
                                </div>
                                <div className="evaluate">
                                    {this.state.evaluateInfo.content}
                                </div>
                            </div>

                            {/* 教育背景 */}
                            <div className="education-box">
                                <div className="title-back-box">
                                    <img src={title_back} alt="标题背景"></img>
                                    <span>教育背景</span>
                                </div>
                                <div className="education">
                                    {
                                        this.state.educationList.map((item, index) => {
                                            return (
                                                <div className="item" key={index}>
                                                    <p>
                                                        <span className="times">{item.times}</span>
                                                        <span className="school">{item.school}</span>
                                                        <span className="major">{item.major}</span>
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* 专业技能 */}
                            <div className="ability-box">
                                <div className="title-back-box">
                                    <img src={title_back} alt="标题背景"></img>
                                    <span>专业技能</span>
                                </div>
                                <div className="ability">
                                    {
                                        this.state.abilityList.map((item, index) => {
                                            return (
                                                <div className="item" key={index}>
                                                    <p>
                                                        <span className="sorts">{index + 1}.</span>
                                                        <span className="ability-text">{item.ability}</span>
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="a4-line"></div>
                    <div className="a4-box">
                        <div id="element-to-print2" className="A4">
                            <div className="left-line left-line-two"></div>
                            <div className="project-box">
                                <div className="title-back-box">
                                    <img src={title_back} alt="标题背景"></img>
                                    <span>项目经历</span>
                                </div>
                                <div className="project">
                                    {this.state.projectList.map((item, index) => {
                                        return (
                                            <div className="item" key={index}>
                                                <p>
                                                    <span className="name">项目名称：</span>
                                                    <span>{item.title}</span>
                                                </p>
                                                <p>
                                                    <span className="name">项目时间：</span>
                                                    <span>{item.time}</span>
                                                </p>
                                                <div>
                                                    <p className="name">项目介绍：</p>
                                                    <p className="introduce">{item.introduce}</p>
                                                </div>
                                                <p>
                                                    <span className="name">我的职责：</span>
                                                    <span>{item.duty}</span>
                                                </p>
                                                <p>
                                                    <span className="name">项目技术：</span>
                                                    <span>{item.technology}</span>
                                                </p>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="a4-line"></div>
                    <div className="btns">
                        <div className="btn" onClick={this.htmlToPdf.bind(this)}>导出为pdf</div>
                        <div className="btn" onClick={this.print.bind(this)}>打印</div>
                    </div>
                    <ScollTop></ScollTop>
                </div>
            </div>
        )
    }
}