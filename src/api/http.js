import axios from 'axios'
import qs from 'qs'
// import tools from '@/assets/plugins/tools'
// import router from '@/router'
// //全局配置--注意，全局配置不能添加可变量
axios.defaults.domain = process.env.VUE_APP_API_BASE
axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.timeout = 20000// 设置超时
/*
axios.interceptors.request.use(config => {
  // console.log('token', tools.getStore('token'))
  let token = tools.getStore('ad-token-patient') || 'jwt-token to be insert'
  config.headers.Authorization = 'Bearer ' + token
  // config.headers.Accept = 'application/vnd.alzheimer.v1+json'
  // 转换post数据为formdata
  if (config.method === 'post') config.data = qs.stringify(config.data)
  return config
}, err => {
  return Promise.reject(err)
})
// 添加一个响应拦截器
axios.interceptors.response.use(res => {
  if (res.status == 200 && res.data.status == 1) {
    return res.data
  } else if (res.status == 200 && res.data.success) { // 为获取验证码接口
    return res.data
  } else if (res.status == 200 && res.data.code == 4005) { // 未注册
    // let err = {
    //   code: 4005,
    //   status: 0,
    //   msg: '您还没绑定手机，请注册...'
    // }
    return Promise.reject(res.data)
  } else {
    return Promise.reject(res.data)
  }
}, err => {
  if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) { //  判断请求超时
    console.log('根据你设置的timeout,请求超时')
    let error = {
      status: 0,
      data: '',
      msg: '请求超时,请刷新重新加载'
    }
    return Promise.reject(error)
  }
  if (err && err.request) { // response
    err.code = err.request.status
    switch (err.request.status) {
      case 400:
        err.msg = '请求错误'
        break
      case 401:
        err.msg = '未登录或登录已过期'// 未授权，请登录
        tools.goLogin(router.currentRoute.fullPath, router.replace, 401, 'http')// 登录
        break
      case 403:// 用户没有权限
        err.msg = '没有访问权限'
        break

      case 404:
        err.msg = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.msg = '请求超时'
        break

      case 500:
        err.msg = `服务器内部错误: ${err.response.data.msg}`
        break

      case 501:
        err.msg = '服务未实现'
        break

      case 502:
        err.msg = '网关错误'
        break

      case 503:
        err.msg = '服务不可用'
        break

      case 504:
        err.msg = '网关超时'
        break

      case 505:
        err.msg = 'HTTP版本不受支持'
        break

      default:
    }
  }
  return Promise.reject(err)
})
*/
export default axios
