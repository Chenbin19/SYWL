import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
import router from '@/router'
// axios 配置
axios.defaults.timeout = 300000
axios.defaults.baseURL = process.env.API_URL || 'https://api.simeke.cn/sanyu/'
axios.defaults.marketingURL =
  process.env.MARKETING_URL || 'https://marketing.socialarks.com'
axios.defaults.dmpURL = process.env.DMP_URL || 'https://dmp.socialarks.com'
axios.defaults.paramsSerializer = params =>
  qs.stringify(params, { arrayFormat: 'indices' })
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['X-Access-Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3d4dXNlciI6dHJ1ZSwiZXhwIjoxNTgxNTgzMTYzLCJ1c2VybmFtZSI6Im92Ujl3czdDZ0tRWGV2RzdkblFheXkyMmtqZVEifQ.dkxxXRl-JXwE9HDTnVfmsEAN0_mLPBo2CAnERIP8UhE'
axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json;charset:UTF-8',
  },
  // timeout : 30000
})

let pending = [] //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken
let removePending = config => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f() //执行取消操作
      pending.splice(p, 1) //把这条记录从数组中移除
    }
  }
}

const urlArr = ['/contactPerson/searchCompany', '/deals/lists']

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.url === '/messages/try_email_cfg') {
      config.timeout = 60000
    }
    const user = store.state.user || {}
    if (user.token) {
      config.headers.token = `${user.token}`
    }
    if (urlArr.indexOf(config.url) !== -1) {
      removePending(config) //在一个ajax发送前执行一下取消操作
      config.cancelToken = new cancelToken(c => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串
        pending.push({ u: config.url + '&' + config.method, f: c })
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // let headers = response.headers
    // let token = headers.token
    // if (token) {
    //   token = token[token.length > 1 ? 1 : 0].trim()
    //   if (token) {
    //     localStorage.token = token
    //   }
    // }
    if (response.data.ret == 401) {
      store.commit('setWakeUp', 'true')
    }

    if (urlArr.indexOf(response.config.url) !== -1) {
      removePending(response.config) //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    }
    // -100错误直接跳转到错误页面
    // if (response.data.ret === -100) {
    //     return (window.location.href = '/error_new.html')
    // }
    return response.data
  },
  error => {
    let msg
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('logout')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath,
            },
          })
      }
      msg = error.response.data
    } else {
      msg = '服务器繁忙'
    }
    return Promise.reject(msg)
  },
)

export default axios
