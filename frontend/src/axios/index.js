import JsonP from 'jsonp'
import axios from 'axios'

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
    const oldTimestamp = localStorage.getItem("timestamp")
    const newTimestamp = Date.now()
    if (oldTimestamp) {
      // 超过三天没有刷新操作或者后端请求的话，就强制登出 (这里是后端请求)
      if (newTimestamp - Number(oldTimestamp) > 3 * 24 * 60 * 60 * 1000) {
        localStorage.clear()
        window.location.href = process.env.REACT_APP_FRONTEND_URL
      } else {
        localStorage.setItem("timestamp", newTimestamp.toString())
      }
    } else {
      localStorage.setItem("timestamp", newTimestamp.toString())
    }

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