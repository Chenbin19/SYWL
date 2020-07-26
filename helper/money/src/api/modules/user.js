/**
 * 用户模块
 */
import { get, post, put, del } from '../function'

//登录
export default {
  requestAuth: post('api/wx/user/login'),
  requestFriend: get('api/wx/user/user_share_img'),
}
