import React, { Component } from 'react'
import { Search } from '../../common/API'
import './search.css'
class Searchpage extends Component {
    constructor() {
        super()
        this.state = {
            arr: [],
            str: '',
            Array:[
                {
                    con:"gai"
                },
                {
                    con:"周杰伦"
                },
                {
                    con:"周笔畅 新歌"
                },
                {
                    con:"摩天轮演唱会"
                },
                {
                    con:"林俊杰 JJ"
                },
                {
                    con:"热点MV"
                },
            ]
        }
    }
    change(e) {
        var a = e.target.value
        var ul = document.getElementsByClassName('ul')[0]
        ul.style.display = "block"
        this.setState({
            str: a
        })
        if (e.target.value !== "*") {
            this.$http({
                url: Search + '/' + this.state.str
            }).then(d => {
                console.log(d);
                var m = d.data.data.songList
                this.setState({
                    arr: m
                })
            })
        }
    }
    focus() {
        var ul = document.getElementsByClassName('ul')[0]
        var hotsong = document.getElementsByClassName('hotsong')[0]
        var what = document.getElementsByClassName('what')[0]
        var give = document.getElementsByClassName('give1')[0]
        what.style.width = '80%'
        give.style.display = 'block'
        hotsong.style.display = 'none'
        ul.innerHTML=''
    }
    give() {
        var hotsong = document.getElementsByClassName('hotsong')[0]
        var what = document.getElementsByClassName('what')[0]
        var give = document.getElementsByClassName('give1')[0]
        var input = document.getElementsByTagName('input')[0]
        var ul = document.getElementsByClassName('ul')[0]
        var li=document.getElementsByClassName('searchlist')
        li.innerHTML=''
        input.value = ""
        what.style.width = '100%'
        give.style.display = 'none'
        hotsong.style.display = 'block'
        ul.style.display = "none"
    }
    push(e) {
        var x = e.target.innerHTML
        var input = document.getElementsByTagName('input')[0]
        var hotsong = document.getElementsByClassName('hotsong')[0]
        var ul = document.getElementsByClassName('ul')[0]
        var what = document.getElementsByClassName('what')[0]
        var give = document.getElementsByClassName('give1')[0]
        ul.style.display = 'block'
        input.value = x
        what.style.width = '80%'
        give.style.display = 'block'
        hotsong.style.display = 'none'
        this.$http({
            url: Search + '/' + input.value
        }).then(d => {
            // console.log(d.data.data.songList);
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
                    <div className="what">
                        <span className="fa fa-search"></span>
                        <input  type="text" placeholder="搜索歌曲、歌单、专辑" onChange={(e) => {
                            this.change(e)
                        }} onTouchEnd={() => {
                            this.focus()}} />
                    </div>
                    <span className="give1" onTouchEnd={() => {
                        this.give()
                    }}>取消</span>
                </div>
                <div className="hotsong">
                    <h2>热门搜索</h2>
                    <div>
                       {
                           this.state.Array.map((item,index)=>{
                               return(
                                <span onTouchEnd={(e) => { this.push(e) }} key={index}>{item.con}</span>
                               )
                           })
                       }
                    </div>
                </div>
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
            </div>
        )
    }
}
export default Searchpage