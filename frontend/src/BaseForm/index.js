import React from 'react'
import { Input, Select, Form, Button, Modal, Checkbox, DatePicker, Upload, Icon } from 'antd'
import Utils from '../utils/utils'

const FormItem = Form.Item
// const Option = Select.Option


class FilterForm extends React.Component {

  state = {
    fileList: []
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        // console.log(item)
        let label = item.label
        let field = item.field
        let initialValue = item.initialValue
        let placeholder = item.placeholder
        let width = item.width
        if (item.type === 'INPUT') {
          const INPUT = <FormItem label = {label} key = {field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Input type="text" placeholder={placeholder}/>
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        } else if (item.type === 'SELECT') {
          const SELECT = <FormItem label = {label} key = {field}>
            {
              getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Select mode={item.mode}
                        style={{ width: width }}
                        placeholder={placeholder}
                        allowClear>
                  {Utils.getOptionList(item.list)}
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT)
        } else if (item.type === 'CHECKBOX') {
          const CHECKBOX = <FormItem label = {label} key = {field}>
            {
              getFieldDecorator([field], {
                valuePropName: field,
                initialValue: initialValue
              })(
                <Checkbox/>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX)
        } else if (item.type === 'DATE') {
          // 封装时间
          const Date_Picker = <FormItem label= {label} key={field}>
            {
              getFieldDecorator([field])(
                <DatePicker style={{width: 145}} mode="date" placeholder={placeholder} format="YYYY-MM-DD"/>
              )
            }
          </FormItem>
          formItemList.push(Date_Picker)
        } else if (item.type === 'RANGE') {
          // 封装时间
          const Range_Picker = <FormItem label= {label} key={field}>
            {
              getFieldDecorator([field])(
                  <DatePicker.RangePicker showTime={false} placeholder={['起始日期','结束日期']} format="YYYY-MM-DD"/>
              )
            }
          </FormItem>
          formItemList.push(Range_Picker)
        } else if (item.type === 'UPLOAD') {
          const UPLOAD = <FormItem label= {label} key={field}>
            {
              getFieldDecorator([field])(
                <Upload
                    headers = {{ 'content-type': 'multipart/form-data' }}
                    multiple = {false}
                    accept = '.xls,.xlsx'
                    beforeUpload = {() => {
                      return false;
                    }}
                    onChange={e => {
                      if (e.file.status === 'done') {
                        if (e.file.response.code === 200) {
                          let result = e.fileList;
                          this.setState({ fileList: result });
                        } else {
                          Modal.warn({
                            title: '提示',
                            content: <span>{e.file.response.msg}</span>,
                            okText: 'ok',
                          });
                        }
                      }
                      this.setState({ fileList: e.fileList });
                    }}
                    showUploadList = {true}
                    fileList = {this.state.fileList}>
                  <Button>
                    <Icon type="upload" /> {placeholder}
                  </Button>
                </Upload>,
            )}
          </FormItem>
          formItemList.push(UPLOAD)
        }
      })
    }
    return formItemList
  }

  render() {
    return (
      <Form layout="inline">
        { this.initFormList() }
        <FormItem>
          <Button type="primary" style={{margin: '0 10px'}} onClick={() => {
            let params = this.props.form.getFieldsValue()
            this.props.handleSubmit(params)
            this.setState({ fileList: [] })
          }}>{this.props.submitButtonName}</Button>

          <Button type="primary" onClick={() => {
            this.props.form.resetFields()
            this.setState({ fileList: [] })
          }}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(FilterForm)