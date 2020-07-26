/**
 * 用户模块
 */
import { get, post, put, del } from '../function'

//登录
export default {
  requestFraction: get('takeout/userScore/list'),
  requestRedWrap: post('takeout/redpackage/obtain'),
  invitationList: get('wx/wxUser/list'),
}
