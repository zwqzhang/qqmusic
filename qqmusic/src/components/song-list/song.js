import React, { Component } from 'react'
import './song.css'
import { SongList } from '../../common/API'
// import Item from 'antd/lib/list/Item';
class Song extends Component {
    constructor(props) {
        super()
        this.state = {
            arr: [],
            totalSongNum: '',
            picAlbum: '',
            listName: '',
            updateTime: ''
        }
    }
    componentDidMount() {

        this.$http({
            url: SongList + '/' + this.props.match.params.id
        }).then(d => {
            // console.log(d);
            this.setState({
                arr: d.data.data.songList,
                totalSongNum: d.data.data.totalSongNum,
                picAlbum: d.data.data.topInfo.picAlbum,
                listName: d.data.data.topInfo.listName,
                updateTime: d.data.data.updateTime
            })
        })
    }
    toPlay(d) {
        // this.ev.emit('song',d)
        this.props.history.push({pathname:'/play/',state:d})
    }
    render() {
        var song = this.state.arr.map((item, index) => {
            var x = item.singer.map(subitem => {
                return <em key={subitem.singerMid}>{subitem.singerName}</em>
            })
            return (
                <li className="list_one" key={item.songMid}
                    onTouchEnd={() => { this.toPlay(item) }}
                >
                    <div className="list_left">
                        <p>{index + 1}</p>
                        <i><span className="fa fa-level-up"></span> 190%</i>
                    </div>
                    <div className="list_center">
                        <h4>{item.songName}</h4>
                        {x}
                    </div>
                    <div className="list_right">
                        <span className="fa fa-download"></span>
                    </div>

                </li>
            )
        })
        return (
            <div className="songhome">
                <div className="nav">
                    <header className="header1">
                        <div className="aimg">
                            <img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt="" />
                            <span>更多QQ音乐排行榜</span>
                            <a className="btn">戳我查看</a>
                        </div>
                    </header>
                </div>
                <div className="player">
                    <div className="pic">
                        <img src={this.state.picAlbum} alt="" />
                        <span>{this.state.listName}</span>
                    </div>
                    <div className="player_info">
                        <p className="pltitle">{this.state.listName}</p>
                        <p className="pltime">流行指数榜&nbsp;&nbsp;第170天</p>
                        <p className="plupdatetime">更新时间: <span>{this.state.updateTime}</span></p>
                    </div>
                    <a href="" className="player_btn"><span className="fa fa-play"></span></a>
                </div>
                <div className="songnum">
                    <h3>排行榜 &nbsp;共<span>{this.state.totalSongNum}</span>首</h3>
                    <ul className="list">
                        {/* <li className="list_one">
                            <div className="list_left">
                                <p>1</p>
                                <i><span className="fa fa-level-up"></span> 190%</i>
                            </div>
                            <div className="list_center">
                                <h4>You Need To Calm Down</h4>
                                <em>123</em>
                            </div>
                            <div className="list_right">
                                <span className="fa fa-download"></span>
                            </div>
                        </li> */}
                        {song}
                    </ul>
                </div>
            </div>
        )
    }
}
export default Song