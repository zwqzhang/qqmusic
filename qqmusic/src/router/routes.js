import Index from '../components/index/index'
import Play from '../components/play/play'
// import Ranking from '../components/ranking-list/ranking'
import Song from '../components/song-list/song'
 
var routes=[
    {
        path:'/index',
        component:Index
    },
    {
        path:'/play',
        component:Play
    },
    {
        path:'/song/:id',
        component:Song
    },
    {
        path:"*",
        redirect:"/index"
    }
]
export default routes