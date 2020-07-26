import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/Home.vue"
import FailPopup from "./components/common/FailPopup.vue"
import FriendList from "./components/common/FriendList.vue"
import Discern from "./components/common/Discern.vue"
import Recharge  from "./components/common/Recharge.vue"
import Personal from "./components/common/Personal.vue"
import TabBarIcon from "./components/common/TabBarIcon.vue"
import ReceivePopup from "./components/common/ReceivePopup.vue"
import FractionDetails from "./components/common/FractionDetails.vue"
import FirstPage from "./components/common/FirstPage.vue"
import PhonePopup from "./components/common/PhonePopup.vue"
Vue.use(Router)

export default new Router({
  routes: [
    // {path:'/' ,redirect: Home},
    {path:'/' , component: Home},
    {path: '/Home' , component: Home},
    {path: '/FailPopup' , component: FailPopup},
    {path: '/FriendList' , component: FriendList},
    {path: '/Discern' , component: Discern},
    {path: '/Recharge' , component: Recharge},
    {path: '/Personal' , component: Personal},
    {path: '/TabBarIcon' , component: TabBarIcon},
    {path: '/ReceivePopup' , component: ReceivePopup},
    {path: '/FractionDetails' , component: FractionDetails},
    {path: '/FirstPage' , component: FirstPage},
    {path: '/PhonePopup' , component: PhonePopup},
  ]
})
