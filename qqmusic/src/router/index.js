import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
function Router(props) {
    var el = props.routes.map(item => {
        if (item.path === "*") {
            return <Redirect key={item.path} to={item.redirect}></Redirect>
        } else {
            return <Route key={item.path} path={item.path} component={item.component}></Route>
        }
    })
    return (
        <Switch>
            {el}
        </Switch>
    )
}

export default Router