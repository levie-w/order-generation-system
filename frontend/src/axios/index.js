import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
import Utils from '../utils/utils'

export default class Axios {

  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status === 'success') {
          resolve(response)
        } else {
          reject(response.message)
        }
      })
    })
  }

  // 封装方法
  static ajax(options) {
    let loading
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }

    let baseApi = process.env.REACT_APP_BACKEND_URL

    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        baseURL: baseApi,
        method: options.data.method,
        params: (options.data && options.data.method === 'get' && options.data.params) || '',
        data: (options.data && options.data.method === 'post' && options.data.params) || null,
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
    })
  }
}