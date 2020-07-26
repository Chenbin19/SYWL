<template>
  <div class="page_tabbar">
    <!-- 3:切换面板列表 -->
    <mt-tab-container class="page-tabbar-container" v-model="active">
      <mt-tab-container-item id="message">
        <!-- 领红包弹窗 -->
        <div class="redpopup">
          <ReceivePopup ref="receiveDom"></ReceivePopup>
        </div>
        <!-- 首页 -->
        <FirstPage ref="first" @test1="onTest1"></FirstPage>
      </mt-tab-container-item>
      <mt-tab-container-item id="contact">
        <!-- 个人中心 -->
        <Personal></Personal>
      </mt-tab-container-item>
    </mt-tab-container>

    <!-- tabbar组件 -->
    <mt-tabbar v-model="active" fixed class="tabbar">
      <mt-tab-item id="message" @click.native="changeState(0)">
        <TabBarIcon
          :selectedImage="require('../assets/9.png')"
          :normalImage="require('../assets/7.png')"
          :focused="currentIndex[0].isSelect"
        ></TabBarIcon>领红包
      </mt-tab-item>
      <mt-tab-item id="contact" @click.native="changeState(1)">
        <TabBarIcon
          :normalImage="require('../assets/8.png')"
          :selectedImage="require('../assets/10.png')"
          :focused="currentIndex[1].isSelect"
        ></TabBarIcon>个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
// 引入子组件

import Personal from "./common/Personal";
import TabBarIcon from "./common/TabBarIcon";
import FirstPage from "./common/FirstPage";
import ReceivePopup from "./common/ReceivePopup";

export default {
  data() {
    return {
      //面板中显示的子组件id
      active: "message",
      //创建数组保存图片焦点状态
      currentIndex: [{ isSelect: true }, { isSelect: false }]
    };
  },
  methods: {
    //禁止页面滑动
    stopScroll() {
      let mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    //取消滑动限制
    canScroll() {
      let mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
    // 底部导航栏判断
    changeState(n) {
      for (let i = 0; i < this.currentIndex.length; i++) {
        if (n == i) {
          this.currentIndex[i].isSelect = true;
        } else {
          this.currentIndex[i].isSelect = false;
        }
      }
    },
    // 手机号领取入口
    onTest1(params) {
      this.Ancestors(params);
    },
    // 判断领红包弹窗页面顶部的的积分消耗类型
    Ancestors(params) {
      let type = this.$refs.first.change_type_id;
      if (type == 1) {
        this.$refs.receiveDom.item[0].type = "免积分领取";
      } else if (type == 2) {
        this.$refs.receiveDom.item[0].type = "每次消耗88积分/次";
      } else if (type == 6) {
        this.$refs.receiveDom.item[0].type = "每次消耗80积分/次";
      }

      // 套餐3,4,5禁用
      if (type == 3 || type == 4 || type == 5) {
        return;
      }
      
      // 手机号格式验证
      let mobile = params;
      if (!/^1[3-8]\d{9}$/.test(mobile)) {
        // 弹出提示框时禁止底部页面滚动
        this.stopScroll();
        this.$messagebox({
          title: "温馨提示",
          message: "手机号码有误，请重填"
        });
        return flase;
      }

      // 调取红包数据接口
      let RedWrap = {
        lat: "",
        lng: "",
        mobile: mobile,
        sid: "",
        type: type
      };
      let that = this;
      this.$api.requestRedWrap(RedWrap).then(res => {
        console.log("res", res);
        // 选择套餐
        if (res.success) {
          let red_result = JSON.parse(res.result.reqRes);
          console.log("cccc", red_result);

          //饿了么接口弹窗提示框
          if (red_result.code != 0) {
            // 弹出提示框时禁止底部页面滚动
            this.stopScroll();
            this.$messagebox({
              title: "温馨提示",
              message: red_result.eleMessag
            });
            return;
          }

          if (type == 2) {
            window.location.href = JSON.parse(res.result.reqRes).eleUrl;
            return;
          } else if (type == 1 || type == 6) {
            that.$refs.receiveDom.red_box = red_result.data;
            //修改本地用户信息手机号
            let login = JSON.parse(sessionStorage.getItem("login"));
            login.result.user.mobile = mobile;
            // console.log(login.result.user.mobile);
            sessionStorage["login"] = JSON.stringify(login);

            console.log((login = JSON.parse(sessionStorage.getItem("login"))));
            // 弹出提示框时禁止底部页面滚动
            this.stopScroll();
            // 控制红包弹窗显示
            this.$refs.receiveDom.showToast = true;
            this.stopScroll();
          }
        }
        // 积分不足提示框
        if (res.code == 500) {
          // 弹出提示框时禁止底部页面滚动
          this.stopScroll();
          this.$messagebox({
            title: "温馨提示",
            message: "请充值积分"
          });
          return;
        }
      });
    }
  },
  components: {
    Personal,
    TabBarIcon,
    ReceivePopup,
    FirstPage
  }
};
</script>
<style scoped>
/* 最外层父元素 */
.page_tabbar {
  overflow: hidden;
}

.redpopup {
  position: absolute;
  z-index: 20;
  height: auto;
  position: fixed;
  width: 100%;
}

.tabbar {
  width: 100%;
}

/* 修改tabbar默认文字颜色 */
.mint-tabbar > .mint-tab-item {
  color: #979eaa;
}

/* 修改默认tab选中文字样式 */
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: transparent;
  color: #3863f1;
}
</style>