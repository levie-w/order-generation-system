import React from 'react'
import {Row, Col, Button, Modal} from 'antd'
import './index.less'
import { connect } from 'react-redux'
import UserStore from "../../redux/store/UserStore"
import axios from "../../axios"

class Header extends React.Component{

  state = {}

  render() {
    return (
      <div className="header">
        <Row className="header-top">

          <Col span={24}>
            <span>欢迎, { this.props.username }</span>
            <Button style={{color: '#1890ff', marginLeft: 10, border: "none"}} onClick={ () => {
              let _this = this
              Modal.confirm({
                title: '确认退出',
                content: '是否要退出当前用户?',
                onOk() {
                  _this.props.dispatch(UserStore.action.remove())
                  window.location.href = process.env.REACT_APP_FRONTEND_URL
                }
              })
            }
            }>退出</Button>
          </Col>
        </Row>

        {/*{*/}
        {/*  menuType ? '' :*/}
        {/*  <Row className="breadcrumb">*/}
        {/*    <Col span={4} className="breadcrumb-title">*/}
        {/*      { this.props.menuName }*/}
        {/*    </Col>*/}
        {/*    <Col span={20} className="weather">*/}
        {/*      <span className="date">时间: { this.state.sysTime }</span>*/}
        {/*      <span className="weather-img">*/}
        {/*        <img src={ this.state.dayPictureUrl } alt=""/>*/}
        {/*      </span>*/}
        {/*      <span className="weather-detail">{ this.state.weather }</span>*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*}*/}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuName: state.menu.menuName,
    username: state.userInfo.username
  }
}
export default connect(mapStateToProps)(Header)