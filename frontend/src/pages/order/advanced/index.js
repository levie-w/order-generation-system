import React from 'react'
import { Card, Button, Modal, Radio, DatePicker, Select, Form, Input } from 'antd'
import axios from './../../../axios/index'
import Utils from './../../../utils/utils'
import {Table} from 'antd'
import BaseForm from '../../../BaseForm';
import ExportJsonExcel from "js-export-excel";
import moment from "moment";
import {connect} from "react-redux";

class Order extends React.Component {

  // 表头
  columns = []

  columnNames = []

  excelResult = []

  params = {
    page: 1
  }

  state = {}

  formList = [
    {
      type: 'DATE',
      label: '日期范围(起)',
      field: 'startDate',
      placeholder: '请选择起始日期'
    },
    {
      type: 'DATE',
      label: '日期范围(止)',
      field: 'endDate',
      placeholder: '请选择截止日期'
    },
    {
      type: 'UPLOAD',
      label: '条件列表',
      field: 'conditionFile',
      placeholder: '请上传excel文件'
    },
    {
      type: 'SELECT',
      label: '客户类型',
      field: 'clientType',
      placeholder: '默认无限制',
      width: 120,
      mode: 'multiple',
      initialValue: [],
      list: [
        {
          id: 1,
          name: '零售药店'
        }, {
          id: 2,
          name: '批发经营'
        }, {
          id: 3,
          name: '医疗机构'
        }
      ]
    },
    {
      type: 'UPLOAD_2',
      label: '自定义客户名单(可选)',
      field: 'clientFile',
      placeholder: '请上传excel文件'
    }
  ]

  // 表格列表接口
  generateOrders = () => {
    let startDate = this.params.startDate;
    let endDate = this.params.endDate;
    let orderConditionFile = this.params.conditionFile;
    let clientTypes = this.params.clientType;
    let clientFile = this.params.clientFile;
    if (startDate && endDate && orderConditionFile && orderConditionFile.fileList[0]) {
      if (startDate > endDate) {
        return Modal.warn({
          title: '提示',
          content: <span>起始日期不得大于截止日期!</span>,
          okText: 'ok',
        });
      }
      const formData = new window.FormData();
      startDate = moment(startDate).format('YYYY-MM-DD');
      endDate = moment(endDate).format('YYYY-MM-DD');
      let orderConditionFileContent = orderConditionFile.fileList[0].originFileObj;
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('orderConditionFile', orderConditionFileContent);
      formData.append('clientTypes', clientTypes);
      formData.append('userId', this.props.userId);
      formData.append('version', this.props.version);
      if (clientFile && clientFile.fileList[0]) {
        let clientFileContent = clientFile.fileList[0].originFileObj;
        formData.append('clientFile', clientFileContent);
      }
      axios.ajax({
        url: '/order/advanced/generate',
        data: {
          params: formData,
          method: 'post'
        }
      }).then((data) => {
        if (data.code === 200) {
          if (data.columnList) {
            this.columns = data.columnList
          }
          if (data.result) {
            let list = data.result.map((item, index) => {
              item.key = index
              return item
            })
            this.setState({
              list,
              selectedRowKeys: undefined,
              selectedItem: undefined,
              pagination: Utils.pagination(data, (current) => {
                this.params.page = current
                this.setState({
                  selectedRowKeys: undefined,
                  selectedItem: undefined
                })
              })
            })
          }
          if (data.excelResult) {
            this.excelResult = data.excelResult
          }
          if (data.columnNameList) {
            this.columnNames = data.columnNameList
          }
        } else if (data.code === 501) {
          localStorage.clear()
          window.location.href = process.env.REACT_APP_FRONTEND_URL
        } else {
          Modal.info({
            title: '提示',
            content: data.message
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

  // 下载条件列表模版文件
  downloadConditionTemplateFile = () => {
    let option = {};  // option代表的就是excel文件
    option.fileName = '流向生成条件(动态模版)';  // excel文件名称
    option.datas = [
      {
        sheetData: [],  // excel文件中的数据源
        sheetName: '条件列表',  // excel文件中sheet页名称
        sheetHeader: ['商品信息(一)', '商品信息(二)', '商品信息(三)', '商品信息(四)', '商品信息(五)', '商品信息(...)', '总流出量 (必填, 例:100)', '总客户数 (必填, 例:10)'],  // excel文件中每列的表头名称
      }
    ]
    let file = new ExportJsonExcel(option);  // 生成excel文件
    file.saveExcel();  // 下载excel文件
  }

  // 下载客户列表模版文件
  downloadClientTemplateFile = () => {
    let option = {};  // option代表的就是excel文件
    option.fileName = '自定义客户名单(模版)';  // excel文件名称
    option.datas = [
      {
        sheetData: [],  // excel文件中的数据源
        sheetName: '客户名单',  // excel文件中sheet页名称
        sheetHeader: ['客户名称 (必填)', '客户类型 (选填, 有效值:[零售药店, 批发经营, 医疗机构])'],  // excel文件中每列的表头名称
      }
    ]
    let file = new ExportJsonExcel(option);  // 生成excel文件
    file.saveExcel();  // 下载excel文件
  }

  // 把结果导出为excel文件
  downloadResultToExcel = () => {
    let option = {};  // option代表的就是excel文件
    option.fileName = '商品流向表';  // excel文件名称
    option.datas = [
      {
        sheetData: this.excelResult,  // excel文件中的数据源
        sheetName: '流向明细',  // excel文件中sheet页名称
        sheetHeader: this.columnNames,  // excel文件中每列的表头名称
      }
    ]
    let toExcel = new ExportJsonExcel(option);  // 生成excel文件
    toExcel.saveExcel();  // 下载excel文件
  }

  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleSubmit={(params) => {
            this.params = params
            this.generateOrders()
          }} submitButtonName="生成"/>
        </Card>

        <Card style={{marginTop:10}}>
          <Button type="primary" icon="download" onClick={this.downloadConditionTemplateFile}>下载条件列表模版</Button>
          <Button type="primary" icon="download" onClick={this.downloadClientTemplateFile}>下载客户名单模版</Button>
          <Button type="primary" icon="download" onClick={this.downloadResultToExcel}>下载结果</Button>
        </Card>

        <div className="content-wrap">
          {/* 应用封装的表格 */}
          <Table
            columns={this.columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
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
export default connect(mapStateToProps)(Order)
