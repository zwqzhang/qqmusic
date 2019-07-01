import React, { Component } from 'react'
import { Carousel } from 'antd';
import { Indexmsg } from '../../common/API'
import './recommend.css'
class Recommend extends Component {
    constructor(props) {
        super()
        this.state = {
            arr: [],
            arr2: []
        }
    }
    componentDidMount() {
        this.$http({
            url: Indexmsg,
            method: 'get'
        }).then(d => {
            // console.log(d);
            this.setState({
                arr: d.data.data.slider,
                arr2: d.data.data.radioList
            })
        })
    }
 
    render() {
        var el = this.state.arr.map((item, index) => {
            return (
                <div key={index} >
                    <h3><img src={item} alt="" /></h3>
                </div>
            )
        })
        var el2 = this.state.arr2.map(item => {
            return (
                <div className="left" key={item.id}>
                    <div className="imgPar"><img src={item.picUrl} alt="" /></div>
                    <h3>{item.title}</h3>
                    <span className="fa fa-play-circle play"></span>
                </div>
            )
        })
        return (
            <div className="recom">
                <div className="banner">
                    <Carousel autoplay>
                        {el}
                    </Carousel>
                </div>
                <div className="station">
                    <h2>电台</h2>
                    <div className="con">
                        {/* <div className="left">
                            <img src="https://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg?max_age=2592000" alt="" />
                            <h3>热歌</h3>
                            <span className="fa fa-play-circle play"></span>
                        </div>
                        <div className="left">
                            <img src="https://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg?max_age=2592000" alt="" />
                            <h3>热歌</h3>
                            <span className="fa fa-play-circle play"></span>
                        </div> */}
                        {el2}
                    </div>

                </div>
                <footer className="foot">
                    <p className="title">查看电脑版网页</p>
                    <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" />
                    <p className="time">
                        Copyright © 1998 - 2019 Tencent. All Rights Reserved.
                    </p>
                    <p className="time">联系电话：0755-86013388 QQ群：55209235</p>
                </footer>
                {/* <div className="fix">
                    <div className="an">
                        安装QQ音乐&nbsp;发现更多精彩
                    </div>
                </div> */}
            </div>
        )
    }
}
export default Recommend