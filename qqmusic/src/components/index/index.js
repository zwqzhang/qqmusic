import React, { Component } from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
import Router from '../../router/index'
import routes from '../../router/indexRoutes'
class Index extends Component {
    // constructor() {
    //     super()
    // }

    render() {
        return (
            <div className="home">
                <header className="header">
                    <div className="aimg">
                        <img src="http://y.gtimg.cn/mediastyle/yqq/img/logo@2x.png?nowebp=1%202x" alt="" />
                        <a className="btn">下载APP</a>
                    </div>
                </header>
                <div className="content">
                    <div className="nav">
                        <NavLink to="/index/recommend" activeClassName="select">推荐</NavLink>
                        <NavLink to="/index/ranking" activeClassName="select">排行榜</NavLink>
                        <NavLink to="/index/search" activeClassName="select">搜索</NavLink>
                    </div>
                    <Router routes={routes}></Router>
                </div>
                <div className="fix">
                    <div className="an">
                        安装QQ音乐&nbsp;发现更多精彩
                    </div>
                </div>
            </div>
        )
    }
}
export default Index