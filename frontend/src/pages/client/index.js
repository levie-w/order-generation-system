import React from 'react'
import { Card, Button, Modal, Radio, DatePicker, Select, Form, Input } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import ETable from './../../components/ETable'
import BaseForm from '../../BaseForm';
import moment from 'moment'
import ExportJsonExcel from "js-export-excel";
const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

export default class Client extends React.Component {

  params = {
    page: 1,
    isVisible: false
  }

  state = {}

  formList = [
    {
      type: 'UPLOAD',
      label: '客户名单',
      field: 'file',
      placeholder: '请上传excel文件'
    },
    {
      type: 'CHECKBOX',
      label: '覆盖全部',
      field: 'override',
      initialValue: false
    }
  ]

  // 批量导入
  handleUpload = (params) => {
    this.params = params
    let override = this.params.override;
    let file = this.params.file;
    if (file && file.fileList[0]) {
      const formData = new window.FormData();
      let fileContent = file.fileList[0].originFileObj;
      formData.append('override', override);
      formData.append('file', fileContent);
      axios.ajax({
        url: '/client/batchCreate',
        data: {
          params: formData,
          method: 'post'
        }
      }).then((data) => {
        if (data && data.result) {
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
      })
    } else {
      Modal.warn({
        title: '提示',
        content: <span>缺少参数！</span>,
        okText: 'ok',
      });
    }
  }

  // 表格列表接口
  listAllClients = () => {
    axios.ajax({
      url: '/client/listAll',
      data: {
        params: undefined,
        method: 'get'
      }
    }).then((data) => {
      if (data && data.result) {
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
    })
  }

  // 各种操作
  handleOperate = (type) => {
    let item = this.state.selectedItem
    if (type === 'list') {
      this.listAllClients()
      this.setState({
        selectedRowKeys: null,
        selectedItem: null
      })
    } else if (type === 'create') {
      this.setState({
        type,
        isVisible: true, // 弹窗显示
        title: '创建客户'
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
        title: '编辑客户',
        clientInfo: item
      })
    } else if (type === 'delete') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个客户'
        })
        return
      }
      let _this = this
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前选中数据',
        onOk() {
          axios.ajax({
            url: '/client/delete',
            data: {
              params: {
                clientId: item.clientId
              },
              method: 'get'
            }
          }).then((res) => {
            if(res.code === 200) {
              _this.setState({
                isVisible: false
              })
              _this.listAllClients()
            }
          })
        }
      })
    }
  }

  // 创建/修改客户提交
  handleSubmit = () => {
    let type = this.state.type
    let data = this.clientForm.props.form.getFieldsValue()

    let clientId = data.clientId;
    let clientCode = data.clientCode;
    let clientName = data.clientName;
    let clientType = data.clientType;

    if (clientCode && clientName && clientType) {
      axios.ajax({
        url: type === 'create' ? '/client/create' : '/client/edit',
        data: {
          params: {
            clientId: clientId,
            clientCode: clientCode,
            clientName: clientName,
            clientType: clientType
          },
          method: 'post'
        }
      }).then((res) => {
        if (res.code === 200) {
          this.clientForm.props.form.resetFields() // 重置表单
          this.setState({
            isVisible: false,
            selectedRowKeys: null,
            selectedItem: null
          })
          this.listAllClients()
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

  // 下载模版文件
  downloadTemplateFile = () => {
    let option = {};  // option代表的就是excel文件
    option.fileName = '客户名单(模版)';  // excel文件名称
    option.datas = [
      {
        sheetData: [],  // excel文件中的数据源
        sheetName: '客户名单',  // excel文件中sheet页名称
        sheetHeader: ['客户代码(必填)', '客户名称(必填)', '客户类型(必填)'],  // excel文件中每列的表头名称
      }
    ]
    let file = new ExportJsonExcel(option);  // 生成excel文件
    file.saveExcel();  // 下载excel文件
  }

  render() {

    // 表头
    const columns = [
      {
        title: '客户代码',
        dataIndex: 'clientCode'
      },
      {
        title: '客户名称',
        dataIndex: 'clientName'
      },
      {
        title: '客户类型',
        dataIndex: 'clientType'
      }
    ]

    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleSubmit={this.handleUpload} submitButtonName="导入"/>
        </Card>
        
        <Card style={{marginTop:10}}>
          <Button type="primary" icon="download" onClick={this.downloadTemplateFile}>下载客户名单模版</Button>
          <Button type="primary" icon="search" style={{marginLeft:10}} onClick={() => this.handleOperate('list')}>显示所有客户</Button>
          <Button type="primary" icon="plus" style={{marginLeft:10}} onClick={() => this.handleOperate('create')}>创建客户</Button>
          <Button type="primary" icon="edit" style={{marginLeft:10}} onClick={() => this.handleOperate('edit')}>编辑客户</Button>
          <Button type="primary" icon="delete" style={{marginLeft:10}} onClick={() => this.handleOperate('delete')}>删除客户</Button>
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
            this.clientForm.props.form.resetFields() // 重置表单
            this.setState({
              isVisible: false
            })
          }}
          width={600}
        >
          <ClientForm type={this.state.type} clientInfo={this.state.clientInfo} wrappedComponentRef={(inst) => {this.clientForm = inst}}></ClientForm>
        </Modal>
      </div>
    )
  }
}

class ClientForm extends React.Component{

  render() {
    let type = this.props.type
    let clientInfo = this.props.clientInfo || {}
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15}
    }

    return (
      <Form layout="horizontal">
        <FormItem label="客户ID" style={{display: "none"}}>
          {
            getFieldDecorator('clientId', type === 'edit' ? {
              initialValue: clientInfo.clientId
            } : {
              initialValue: undefined
            })(
                <Input type="text" placeholder="请输入客户ID"></Input>
            )
          }
        </FormItem>

        <FormItem label="客户代码" {...formItemLayout}>
          {
            getFieldDecorator('clientCode', type === 'edit' ? {
              initialValue: clientInfo.clientCode
            } : {
              initialValue: undefined
            })(
                <Input type="text" placeholder="请输入客户代码"></Input>
            )
          }
        </FormItem>

        <FormItem label="客户名称" {...formItemLayout}>
          {
            getFieldDecorator('clientName', type === 'edit' ? {
              initialValue: clientInfo.clientName
            } : {
              initialValue: undefined
            })(
              <Input type="text" placeholder="请输入客户名称"></Input>
            )
          }
        </FormItem>

        <FormItem label="客户类型" {...formItemLayout}>
          {
            getFieldDecorator('clientType', type === 'edit' ? {
              initialValue: clientInfo.clientType
            } : {
              initialValue: undefined
            })(
                <Select placeholder={"请选择客户类型"}>
                  <Option value="零售药店">零售药店</Option>
                  <Option value="批发经营">批发经营</Option>
                  <Option value="医疗机构">医疗机构</Option>
                </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

ClientForm = Form.create({})(ClientForm)