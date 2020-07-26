/**
 * 用户模块
 */
import { get, post, put, del } from '../function'

//登录
export default {
  requestPay: post('wx/pay/order')
}
