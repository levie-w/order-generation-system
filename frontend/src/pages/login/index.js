import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './index.less'
import axios from "../../axios";
import {connect} from 'react-redux'
import UserStore from "../../redux/store/UserStore";
import { Modal, Input } from "antd";

class Login extends React.Component{
  state = {
    userId: null,
    username: null,
    password: null,
    level: null,
    version: null
  }

  login = () => {
    const { username, password } = this.state
    if (!username || !password) {
      return Modal.warn({
        title: '提示',
        content: <span>用户名和密码不得为空！</span>,
        okText: 'ok',
      });
    }

    axios.ajax({
      url: '/user/authenticate',
      data: {
        params: {
          username: username,
          password: password
        },
        method: 'post'
      }
    }).then((res) => {
      if(res.code === 200) {
        this.setState({
          userId: res.userId,
          level: res.level,
          version: res.version
        })
        this.props.dispatch(UserStore.action.save({
          userId: this.state.userId,
          username: this.state.username,
          level: this.state.level,
          version: this.state.version
        }))
        window.location.href = process.env.REACT_APP_FRONTEND_URL
      } else {
        Modal.warn({
          title: '提示',
          content: <span>{res.message}</span>,
          okText: 'ok',
        });
      }
    })
  }

  render() {
    return(
      <div className="login-page">
        <dl className="login-wrapper">
          <dt><b>流向生成系统</b></dt>
          <dd className="login-box">
            <div className="login-tips">
              <></>
            </div>
            <ul>
              <li>
                <Input type="text" name="username" placeholder="请输入用户名" onChange={ event => this.setState({ username: event.target.value}) } />
              </li>
              <li>
                <Input.Password name="password" placeholder="请输入密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} onChange={ event => this.setState({ password: event.target.value}) }/>
              </li>
              <li>
                <button onClick={ this.login.bind(this) }>登录</button>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    )
  }
}

export default connect()(Login)