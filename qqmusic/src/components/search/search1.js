import React, { Component } from 'react'
import { Search } from '../../common/API'
import './search.css'
class Searchpage extends Component {
    constructor() {
        super()
        this.state = {
            arr: [],
            ipt: '',
            isshow: true,
            Array: [
                {
                    con: "123"
                },
                {
                    con: "周杰伦2222"
                },
                {
                    con: "周笔畅 新歌"
                },
                {
                    con: "摩天轮演唱会"
                },
                {
                    con: "林俊杰 JJ"
                },
                {
                    con: "热点MV"
                },
            ]
        }
    }
    change(e) {
        if (this.state.ipt === "") {
            this.setState({
                arr: []
            })
        }
        this.setState({
            ipt: e.target.value,
        })
        if (e.target.value !== "*") {
            this.$http({
                url: Search + '/' + this.state.ipt
            }).then(d => {
                var m = d.data.data.songList
                this.setState({
                    arr: m
                })
            })
        }
    }

    focus() {
        this.setState({
            isshow: false
        })
    }
    blur() {
        if (this.state.ipt === "") {
            this.setState({
                isshow: false
            })
        }
    }
    give() {
        this.setState({
            isshow: true,
            ipt: '',
            arr: []
        })

    }
    push(e) {
        this.setState({
            ipt: e,
            isshow: false
        })
        // var x = e.target.innerHTML
        this.$http({
            url: Search + '/' + e
        }).then(d => {
            var m = d.data.data.songList
            this.setState({
                arr: m
            })
        })

    }
    toSong(e) {
        this.props.history.push('/song/' + e)
    }
    render() {
        var rl = this.state.arr.map(item => {
            var mb = item.singer.map(subitem => {
                return (
                    <em key={subitem.singerMid}>{subitem.singerName}</em>
                )
            })
            return (
                <li className="searchlist" key={item.songId} onTouchEnd={() => { this.toSong(item.songId) }}>
                    <div className="li_left">
                        <img src="https://y.gtimg.cn/mediastyle/global/img/album_150.png?max_age=2592000" alt="" />
                    </div>
                    <div className="li_right">
                        <h3>{item.songName}</h3>
                        {mb}
                    </div>
                </li>
            )
        })
        return (
            <div className="search">
                <div className="bg">
                    <div className={this.state.isshow ? "what" : "what width"}>
                        <span className="fa fa-search"></span>
                        <input type="text"
                            placeholder="请输入歌曲名"
                            value={this.state.ipt}
                            onFocus={() => { this.focus() }}
                            onChange={(e) => { this.change(e) }}
                            onBlur={() => { this.blur() }} />
                    </div>
                    <span className={this.state.isshow ? "give1" : "give"}
                        onClick={() => { this.give() }}>取消</span>
                </div>
                {
                    this.state.isshow ? (
                        <div className="hotsong">
                            <h2>热门搜索</h2>
                            <div>
                                {
                                    this.state.Array.map((item, index) => {
                                        return (
                                            <span onTouchEnd={(e) => { this.push(item.con) }} key={index}>{item.con}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : (
                            <ul className="ul">
                                {rl}
                                {/* <li className="searchlist">
                                    <div className="li_left">
                                        <img src="https://y.gtimg.cn/mediastyle/global/img/album_150.png?max_age=2592000" alt="" />
                                    </div>
                                    <div className="li_right">
                                        <h3>歌曲名</h3>
                                        <em>歌手</em>
                                    </div>
                                </li> */}
                            </ul>
                        )
                }


            </div>
        )
    }
}
export default Searchpage