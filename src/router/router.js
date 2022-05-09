/*
 * @Author: zs.duan
 * @Date: 2021-08-05 11:30:37
 * @LastEditTime: 2022-04-26 16:57:26
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \blog_show\src\router\router.js
 */


import React, { Suspense } from "react";

//引入需要用到的页面组件
import Home from "../pages/home";
import Article from "../pages/article-details/article-details";
import Search from '../pages/search/search';
import MoreArticle from "../pages/more-article/more-article";
import Login from "../pages/login/login";
import AboutMe from "../pages/about-me/about-me";
import PhoneNewPage from "../pages/phone-new-page/phone-new-page"


import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
  } from "react-router-dom";

  function router() {
    return (
      <Router>
        <Suspense fallback={<div> Loading... </div>}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/article" component={Article} />
            <Route path="/search" component={Search} />
            <Route path="/moreArticle" component={MoreArticle} />
            <Route path="/login" component={Login} />
            <Route path="/aboutme" component={AboutMe} />
            <Route path="/phoneNewPage" component={PhoneNewPage} />
            <Route path="/" render={() => <Redirect to="/home" />}></Route>
          </Switch>
        </Suspense>
      </Router>
    );
  }
  export default router;