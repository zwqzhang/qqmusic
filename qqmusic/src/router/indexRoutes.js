import Recommend from '../components/recommend/recommend'
import Ranking from '../components/ranking-list/ranking'
import Search from '../components/search/search1'
var routes=[
    {
        path:'/index/recommend',
        component:Recommend
    },
    {
        path:'/index/ranking',
        component:Ranking
    },
    {
        path:'/index/search',
        component:Search
    },
    {
        path:'*',
        redirect:'/index/recommend'
    },
]
export default routes;