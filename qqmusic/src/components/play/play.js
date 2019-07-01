import React, { Component } from 'react'
import './play.css'
import { lrc, albumImg, songUrllist } from '../../common/API'
class Play extends Component {
    constructor(props) {
        super()
        this.state = {
            // 封面图片
            albumImgUrl: "",
            // 歌手图片
            singerAvatarUrl: '',
            Array: [],
            arr: [],
            url: '',
            str: '',
            current: null
        }
        // this.ev.on('song',d=>{
        //     console.log(d)
        // })
    }
    componentDidMount() {
        var songId = this.props.location.state.songId
        var songMid = this.props.location.state.songMid
        var albumMid = this.props.location.state.albumMid
        var singerMid = this.props.location.state.singerMid
        var x = this.props.location.state.singer
        this.setState({
            arr: x
        })

        // 获取歌词
        this.$http({
            url: lrc + '/' + songId
        }).then(d => {
            // console.log(d);
            var lyric = d.data.data.lyric
            var arr = lyric.split('[换行]')
            // console.log(arr)
            var Array = []
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split(']')
                var key = arr2[0].substr(1)
                var value = arr2[1]
                var json = {}

                if (value === "*" && key.indexOf(0) !== -1) {
                    continue;
                }
                if (value === "") {
                    value = key
                    key = '00:00'
                    json.key = key
                    json.value = value
                    Array.push(json)
                    continue
                }
                key = key.substr(0, 5)
                json.key = key
                json.value = value
                Array.push(json)

            }
            var bg = []
            for (var a = 0; a < Array.length; a++) {
                if (Array[a].key !== "00:00") {
                    bg.push(Array[a])
                }
            }
            this.setState({
                Array: bg
            })

        })
        // 获取歌曲封面图片
        this.$http({
            url: albumImg + '/' + albumMid + '/' + singerMid
        }).then(d => {
            this.setState({
                albumImgUrl: d.data.data.albumImgUrl,
                singerAvatarUrl: d.data.data.singerAvatarUrl
            })
        })
        // 获取歌曲播放路径
        this.$http({
            url: songUrllist + '/' + songMid
        }).then(d => {
            this.setState({
                url: d.data.data[0]
            })
        })
    }
    transtime(num) {
        var minute = Math.floor(num / 60) < 10 ? '0' + Math.floor(num / 60) : Math.floor(num / 60)
        var second = Math.floor(num % 60) < 10 ? '0' + Math.floor(num % 60) : Math.floor(num % 60)
        return minute + ':' + second
    }
    // 回到起点
    stop() {
        var play = document.getElementsByClassName('play')[0]
        var pause = document.getElementsByClassName('pause')[0]
        var inner = document.querySelector('.inner')
        var songtext = this.refs.songtext
        songtext.style.top=0;
        inner.style.width=0;
        var audio = this.refs.audio
        audio.load();
        play.style.display = "inline-block"
        pause.style.display = "none"
    }
    // 开始播放
    action() {
        var play = document.getElementsByClassName('play')[0]
        var pause = document.getElementsByClassName('pause')[0]
        var audio = this.refs.audio
        var bgpic = document.querySelector('.bgpic')
        var picimg = document.querySelector('.picimg')
        var progress = document.querySelector('.progress')
        var inner = document.querySelector('.inner')
        picimg.style.display = "none"
        bgpic.style.display = "block"
        audio.play();
        play.style.display = "none"
        pause.style.display = "inline-block"
        // 播放
        // var audio = this.refs.audio;
        var num = 0;
        var songtext = this.refs.songtext
        var that = this
        audio.ontimeupdate = function (e) {
            // 当前时间
            var currentTime = that.transtime(audio.currentTime)
            for (var i = 0; i < songtext.children.length; i++) {
                if (songtext.children[i].getAttribute('time') === currentTime) {
                    num = i
                    that.setState({
                        current: currentTime
                    })
                    break;
                }
            }
            songtext.style.top = (-num + 1) * 50 + 'px'
            // 进度条运行程度
            var duration = 0;
            duration = audio.duration
            var NowTime = audio.currentTime
            var width = progress.offsetWidth * NowTime / duration;
            inner.style.width = width + "px"
        }
    }
    // 暂停播放
    pause() {
        var play = document.getElementsByClassName('play')[0]
        var pause = document.getElementsByClassName('pause')[0]
        var audio = this.refs.audio
        audio.pause();
        play.style.display = "inline-block"
        pause.style.display = "none"
    }
    // 控制播放进度
    control(e) {
        var progress = document.querySelector('.progress')
        var inner = document.querySelector('.inner')
        var width = e.clientX - progress.getBoundingClientRect().left
        var play = document.getElementsByClassName('play')[0]
        var pause = document.getElementsByClassName('pause')[0]
        var bgpic = document.querySelector('.bgpic')
        var picimg = document.querySelector('.picimg')
        picimg.style.display = "none"
        bgpic.style.display = "block"
        play.style.display = "none"
        pause.style.display = "inline-block"
        var audio = this.refs.audio
        audio.play();
        inner.style.width = width + "px";
        var duration = 0;
        duration = audio.duration
        audio.currentTime = duration * width / progress.offsetWidth
        var num = 0;
        var songtext = this.refs.songtext
        var that = this
        audio.ontimeupdate = function (e) {
            // 当前时间
            var currentTime = that.transtime(audio.currentTime)
            for (var i = 0; i < songtext.children.length; i++) {
                if (songtext.children[i].getAttribute('time') === currentTime) {
                    num = i
                    that.setState({
                        current: currentTime
                    })
                    break;
                }
            }
            songtext.style.top = (-num + 1) * 50 + 'px'
        }
    }
    render() {
        var el = this.state.arr.map(item => {
            return (
                <em key={item.singerMid}>{item.singerName}</em>
            )
        })
        return (
            <div className="playpage">
                <header className="header2">
                    <div className="aimg">
                        <img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt="" />
                        <span>千万正版音乐  海量无损曲库</span>
                        <a className="btn">立即使用</a>
                    </div>
                </header>
                <div className="text">
                    <h2 className="songName">{this.props.location.state.songName}</h2>
                    {el}
                </div>
                <div className="bgpic">
                    <div className="songtext" ref='songtext'>
                        {
                            this.state.Array.map((item, index) => {
                                return <p className={this.state.current === item.key ? "select" : ""} key={index} time={item.key} index={index}>{item.value}</p>
                            })
                        }
                    </div>
                </div>
                <div className="picimg">
                    <img src={this.state.albumImgUrl} alt="" />
                </div>
                <audio src={this.state.url} ref="audio" ></audio>
                {/* 进度条 */}
                <div className="progress" onClick={(e) => { this.control(e) }}>
                    <div className="inner"></div>
                </div>
                {/* 控制开关 */}
                <div className="control">
                    <div className="stop div">
                        <span className="fa fa-stop stop"
                            onTouchEnd={() => { this.stop() }}
                        ></span>
                        <span className="fa fa-play play" onTouchEnd={() => { this.action() }}></span>
                        <span className="fa fa-pause pause"
                            onTouchEnd={() => { this.pause() }}></span>
                        <span className="fa fa-heart heart"></span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Play