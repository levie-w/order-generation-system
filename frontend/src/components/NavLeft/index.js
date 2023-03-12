import React from 'react'
import MenuConfig from './../../config/menuConfig'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import MenuStore from '../../redux/store/MenuStore'
import { Menu, Col } from 'antd';
import  './index.less'
const { SubMenu } = Menu;

class NavLeft extends React.Component{

  state = {
    currentKey: '/order'
  }

  handleClick = ({item, key}) => {
    console.log(item)
    const { dispatch } = this.props
    dispatch(MenuStore.action.switchMenu(item.props.title))
    this.setState({
      currentKey: key
    })
  }

  componentWillMount() {
    let menu = MenuConfig
    if (this.props.level !== 1) {
      menu = MenuConfig.filter(item => item.key !== '/user')
    }

    const menuTreeNode =  this.renderMenu(menu)

    // 取到点击的路由
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')

    this.setState({
      currentKey,
      menuTreeNode
    })
  }

  // 菜单渲染
  renderMenu=(data) => {
    return data.map((item)=> {
      if (item.children) {
        return <SubMenu title={item.title} key={item.key}>
            { this.renderMenu(item.children) }
          </SubMenu>
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={ item.key }>
          { item.title }
        </NavLink>
      </Menu.Item>
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <Col span={5}>
            <img src="favicon.ico" alt=""/>
          </Col>
          <Col span={30}>
            <h2>流向生成系统</h2>
          </Col>
        </div>
        <Menu theme="dark" selectedKeys={[this.state.currentKey]} onClick={this.handleClick}>
          { this.state.menuTreeNode }
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.userInfo.username,
    level: state.userInfo.level
  }
}
export default connect(mapStateToProps)(NavLeft)