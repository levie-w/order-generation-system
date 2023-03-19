import React from 'react'
import {HashRouter, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Order from './pages/order/index'
import Client from './pages/client/index'
import Login from './pages/login/index'
import User from './pages/user/index'
import NoMatch from './pages/nomatch/index';
import { connect } from 'react-redux'

class IRouter extends React.Component {

    updateTimestamp = () => {
        const oldTimestamp = localStorage.getItem("timestamp")
        const newTimestamp = Date.now()
        if (oldTimestamp) {
            // 超过三天没有刷新操作或者后端请求的话，就强制登出 (这里是刷新)
            if (newTimestamp - Number(oldTimestamp) > 3 * 24 * 60 * 60 * 1000) {
                localStorage.clear()
                window.location.href = process.env.REACT_APP_FRONTEND_URL
            } else {
                localStorage.setItem("timestamp", newTimestamp.toString())
            }
        } else {
            localStorage.setItem("timestamp", newTimestamp.toString())
        }
    }

    render() {
        this.updateTimestamp()

        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" render={() =>
                            this.props.username ?
                            <Admin>
                                <Switch>
                                    <Route path="/order" component={Order}/>
                                    { this.props.level <= 2  ? <Route path="/client" component={Client}/> : undefined }
                                    { this.props.level === 1 ? <Route path="/user" component={User}/> : undefined }
                                    {/* 全都不匹配，默认重定向到 */}
                                    <Redirect to="/order"/>
                                    {/*<Route component={NoMatch}/>*/}
                                </Switch>
                            </Admin> : <Redirect to="/login"/>
                        }/>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
        level: state.userInfo.level
    }
}
export default connect(mapStateToProps)(IRouter)