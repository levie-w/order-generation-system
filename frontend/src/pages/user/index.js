import React from 'react'
import { Card, Button, Modal, Radio, Popover, Select, Form, Input } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import ETable from './../../components/ETable'
import { QuestionCircleOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import UserStore from "../../redux/store/UserStore";

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

class User extends React.Component {

  params = {
    page: 1,
    isVisible: false
  }

  state = {}

  // 表格列表接口
  listAllUsers = () => {
    axios.ajax({
      url: '/user/listAll',
      data: {
        params: {
          userId: this.props.userId,
          version: this.props.version
        },
        method: 'get'
      }
    }).then((data) => {
      if (data.code === 200) {
        if (data.result) {
          let list = data.result.map((item, index) => {
            item.key = index
            return item
          })
          this.setState({
            list,
            selectedRowKeys: null,
            selectedItem: null,
            pagination: Utils.pagination(data, (current) => {
              this.params.page = current
              this.setState({
                selectedRowKeys: null,
                selectedItem: null
              })
            })
          })
        }
      } else if (data.code === 501) {
        this.props.dispatch(UserStore.action.remove())
        window.location.href = process.env.REACT_APP_FRONTEND_URL
      } else {
        Modal.info({
          title: '提示',
          content: data.message
        })
      }
    })
  }

  // 各种操作
  handleOperate = (type) => {
    let item = this.state.selectedItem
    if (type === 'list') {
      this.listAllUsers()
      this.setState({
        selectedRowKeys: null,
        selectedItem: null
      })
    } else if (type === 'create') {
      this.setState({
        type,
        isVisible: true, // 弹窗显示
        title: '创建用户'
      })
    } else if (type === 'edit') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一条数据'
        })
        return
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑用户',
        userInfo: item
      })
    } else if (type === 'delete') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      let _this = this
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前选中数据?',
        onOk() {
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                userId: item.userId,
                operatingUserId: _this.props.userId,
                operatingVersion: _this.props.version
              },
              method: 'get'
            }
          }).then((res) => {
            if(res.code === 200) {
              _this.setState({
                isVisible: false
              })
              _this.listAllUsers()
            } else if (res.code === 501) {
              _this.props.dispatch(UserStore.action.remove())
              window.location.href = process.env.REACT_APP_FRONTEND_URL
            } else {
              Modal.info({
                title: '提示',
                content: res.message
              })
            }
          })
        }
      })
    }
  }

  // 创建/修改客户提交
  handleSubmit = () => {
    let type = this.state.type
    let data = this.userForm.props.form.getFieldsValue()

    let userId = data.userId;
    let username = data.username;
    let password = data.password;
    let level = data.level;

    if (username && password && level > 0) {
      if (/.*[\u4e00-\u9fa5]+.*$/.test(password)) {
        return Modal.warn({
          title: '提示',
          content: <span>密码不能包含中文字符！</span>,
          okText: 'ok',
        });
      }

      axios.ajax({
        url: type === 'create' ? '/user/create' : '/user/edit',
        data: {
          params: {
            userId: userId,
            username: username,
            password: password,
            level: level,
            operatingUserId: this.props.userId,
            operatingVersion: this.props.version
          },
          method: 'post'
        }
      }).then((res) => {
        if (res.code === 200) {
          this.userForm.props.form.resetFields() // 重置表单
          this.setState({
            isVisible: false,
            selectedRowKeys: null,
            selectedItem: null
          })
          this.listAllUsers()
        } else if (res.code === 501) {
          this.props.dispatch(UserStore.action.remove())
          window.location.href = process.env.REACT_APP_FRONTEND_URL
        } else if (res.code === 502) {
          Modal.info({
            title: '提示',
            content: res.message
          })
        } else {
          Modal.info({
            title: '提示',
            content: res.message
          })
        }
      })
    } else {
      Modal.warn({
        title: '提示',
        content: <span>不得有空字段！</span>,
        okText: 'ok',
      });
    }
  }

  render() {

    // 表头
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '密码',
        dataIndex: 'password'
      },
      {
        title: '权限等级',
        dataIndex: 'level'
      }
    ]

    return (
        <div>
          <Card>
            <Button type="primary" icon="search" style={{marginLeft:10}} onClick={() => this.handleOperate('list')}>显示所有用户</Button>
            <Button type="primary" icon="plus" style={{marginLeft:10}} onClick={() => this.handleOperate('create')}>创建用户</Button>
            <Button type="primary" icon="edit" style={{marginLeft:10}} onClick={() => this.handleOperate('edit')}>编辑用户</Button>
            <Button type="primary" icon="delete" style={{marginLeft:10}} onClick={() => this.handleOperate('delete')}>删除用户</Button>
          </Card>

          <div className="content-wrap">
            {/* 应用封装的表格 */}
            <ETable
                updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                columns={columns}
                dataSource={this.state.list}
                pagination={this.state.pagination}
                selectedRowKeys={this.state.selectedRowKeys}
                selectedItem={this.state.selectedItem}
                rowSelection='radio'
                rowKey={record => record.id}
            />
          </div>

          {/* 模态框 */}
          <Modal
              title={this.state.title}
              visible = {this.state.isVisible}
              onOk={this.handleSubmit}
              onCancel={() => {
                this.userForm.props.form.resetFields() // 重置表单
                this.setState({
                  isVisible: false
                })
              }}
              width={600}
          >
            <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => {this.userForm = inst}} />
          </Modal>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userInfo.userId,
    version: state.userInfo.version
  }
}
export default connect(mapStateToProps)(User)


class UserForm extends React.Component{

  render() {
    let type = this.props.type
    let userInfo = this.props.userInfo || {}
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15}
    }

    return (
        <Form layout="horizontal">
          <FormItem label="用户ID" style={{display: "none"}}>
            {
              getFieldDecorator('userId', type === 'edit' ? {
                initialValue: userInfo.userId
              } : {
                initialValue: undefined
              })(
                  <Input type="text" placeholder="请输入用户ID" />
              )
            }
          </FormItem>

          <FormItem label="用户名" {...formItemLayout}>
            {
              getFieldDecorator('username', type === 'edit' ? {
                initialValue: userInfo.username
              } : {
                initialValue: undefined
              })(
                  <Input type="text" placeholder="请输入用户名" maxlength="20" />
              )
            }
          </FormItem>

          <FormItem label="密码" {...formItemLayout}>
            {
              getFieldDecorator('password', type === 'edit' ? {
                initialValue: userInfo.password
              } : {
                initialValue: undefined
              })(
                  <Input type="text" placeholder="请输入密码 (不含中文字符)" maxlength="20" />
              )
            }
          </FormItem>

          <FormItem label="权限等级" labelCol={{span: 5}} wrapperCol={{span: 17}}>
            {
              getFieldDecorator('level', type === 'edit' ? {
                initialValue: userInfo.level
              } : {
                initialValue: undefined
              })(
                  <Select placeholder={"请选择权限等级"} style={{display: "inline", float: "left", width: 345, marginTop: 5}}>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                  </Select>
              )
            }

            <Popover
                content={<div style={{
                  width: '200px',
                  height: 'auto',
                  fontSize: '12px',
                  lineHeight: '17px',
                  color: '#757575'
                }}>
                  1: 管理员，拥有所有权限 <br/>
                  2: 员工，拥有除"用户管理"之外的所有权限 <br/>
                  3: 普通用户，只拥有"流向生成"权限
                </div>}
                title="等级说明"
                placement="rightTop"
                trigger="hover">
              <div style={{display: "inline", float: "left", marginLeft: "10px", marginTop: "3px"}}>
                <QuestionCircleOutlined style={{fontSize: "16px"}}/>
              </div>
            </Popover>
          </FormItem>
        </Form>
    )
  }
}

UserForm = Form.create({})(UserForm)