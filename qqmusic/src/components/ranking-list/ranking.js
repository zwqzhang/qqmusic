import React, { Component } from 'react'
import './ranking.css'
import { Toplist } from '../../common/API'
class Ranking extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            song: []
        }
    }
    componentDidMount() {
        this.$http({
            url: Toplist,
            method: 'get'
        }).then(d => {
            // console.log(d);
            this.setState({
                data: d.data.data,
                song: d.data.data.songList
            })
        })
    }
    toSong(x) {
        this.props.history.push('/song/' + x)
    }
    render() {
        var el = this.state.data.map(item => {
            var p = item.songList.map((subitem) => {
                return (
                    <p key={subitem.number}>
                        <span>{subitem.number}</span>
                        {subitem.songName}
                        <span>{subitem.singerName}</span>
                    </p>
                )
            })
            return (
                <li className="one" key={item.id}
                    onClick={() => { this.toSong(item.id) }}
                >
                    <div className="left">
                        <img src={item.picUrl} alt="" />
                        <span></span>
                    </div>
                    <div className="right">
                        <h2>{item.title}</h2>
                        {p}
                    </div>
                </li>
            )
        })
        return (
            <div className="rank">
                <ul className="list" >
                    {/* <li className="one">
                        <div className="left">
                            <img src="https://y.gtimg.cn/music/photo_new/T003R300x300M000002oimNk21RP7V.jpg?max_age=2592000" alt="" />
                            <span></span>
                        </div>
                        <div className="right">
                            <h2>巅峰榜·流行指数</h2>
                            <p><span>1</span>You Need To Calm Down <span>123</span></p>
                            <p><span>2</span>多想在平庸的生活拥抱你 (Live) <span>123</span></p>
                            <p><span>3</span>BIRTHDAY <span>123</span></p>
                        </div>
                    </li> */}
                    {el}
                </ul>
            </div>
        )
    }
}
export default Ranking