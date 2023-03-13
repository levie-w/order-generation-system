import React from 'react'
import { Card, Button, Modal, Radio, DatePicker, Select, Form, Input } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import {Table} from 'antd'
import BaseForm from '../../BaseForm';
import ExportJsonExcel from "js-export-excel";
import moment from "moment";
import {connect} from "react-redux";

class Order extends React.Component {

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
      field: 'file',
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
    }
  ]

  // 表格列表接口
  generateOrders = () => {
    let startDate = this.params.startDate;
    let endDate = this.params.endDate;
    let file = this.params.file;
    let clientTypes = this.params.clientType;
    if (startDate && endDate && file && file.fileList[0]) {
      if (startDate > endDate) {
        return Modal.warn({
          title: '提示',
          content: <span>起始日期不得大于截止日期！</span>,
          okText: 'ok',
        });
      }
      const formData = new window.FormData();
      startDate = moment(startDate).format('YYYY-MM-DD');
      endDate = moment(endDate).format('YYYY-MM-DD');
      let fileContent = file.fileList[0].originFileObj;
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('file', fileContent);
      formData.append('clientTypes', clientTypes);
      formData.append('userId', this.props.userId);
      formData.append('version', this.props.version);
      axios.ajax({
        url: '/order/generate',
        data: {
          params: formData,
          method: 'post'
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

  // 下载模版文件
  downloadTemplateFile = () => {
    let option = {};  // option代表的就是excel文件
    option.fileName = '流向生成条件(模版)';  // excel文件名称
    option.datas = [
      {
        sheetData: [],  // excel文件中的数据源
        sheetName: '条件列表',  // excel文件中sheet页名称
        sheetHeader: ['商品名称(必填)', '规格', '生产厂商', '批号', '有效期', '单价', '总流出量(必填, 例:100)', '总客户数(必填, 例:10)'],  // excel文件中每列的表头名称
      }
    ]
    let file = new ExportJsonExcel(option);  // 生成excel文件
    file.saveExcel();  // 下载excel文件
  }

  // 把结果导出为excel文件
  downloadResultToExcel = () => {
    const { list } = this.state;
    let option = {};  // option代表的就是excel文件
    let dataTable = [];  // excel文件中的数据内容
    if (list && list.length > 0) {
      for (let i in list) {  // 循环获取excel中每一行的数据
        let obj = {
          '商品名称': list[i].productName,
          '规格':list[i].specification,
          '生产厂商': list[i].manufacturer,
          '批号': list[i].batchNumber,
          '有效期': list[i].validityDate,
          '单价': list[i].price,
          '客户': list[i].clientName,
          '数量': list[i].quantity,
          '日期': list[i].date,
        }
        dataTable.push(obj);  // 设置excel中每列所获取的数据源
      }
    }
    option.fileName = '商品流向表';  // excel文件名称
    option.datas = [
      {
        sheetData: dataTable,  // excel文件中的数据源
        sheetName: '流向明细',  // excel文件中sheet页名称
        sheetHeader: ['商品名称', '规格', '生产厂商', '批号', '有效期', '单价', '客户', '数量', '日期'],  // excel文件中每列的表头名称
      }
    ]
    let toExcel = new ExportJsonExcel(option);  // 生成excel文件
    toExcel.saveExcel();  // 下载excel文件
  }

  render() {
    // 表头
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'productName'
      },
      {
        title: '规格',
        dataIndex: 'specification'
      },
      {
        title: '生产厂商',
        dataIndex: 'manufacturer'
      },
      {
        title: '批号',
        dataIndex: 'batchNumber'
      },
      {
        title: '有效期',
        dataIndex: 'validityDate'
      },
      {
        title: '单价',
        dataIndex: 'price'
      },
      {
        title: '客户',
        dataIndex: 'clientName'
      },
      {
        title: '数量',
        dataIndex: 'quantity'
      },
      {
        title: '日期',
        dataIndex: 'date'
      }
    ]

    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleSubmit={(params) => {
            this.params = params
            this.generateOrders()
          }} submitButtonName="生成"/>
        </Card>

        <Card style={{marginTop:10}}>
          <Button type="primary" icon="download" onClick={this.downloadTemplateFile}>下载条件列表模版</Button>
          <Button type="primary" icon="download" onClick={this.downloadResultToExcel}>下载结果</Button>
        </Card>

        <div className="content-wrap">
          {/* 应用封装的表格 */}
          <Table
            columns={columns}
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
