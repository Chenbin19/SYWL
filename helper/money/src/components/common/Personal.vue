<template>
  <!-- 个人中心 -->
  <div>
    <div class="personal">
      <!-- 用户信息 -->
      <div class="user">
        <img :src="iconUrl" />
        <div>
          <span>{{user_name}}</span>
          <span>{{mobile}}</span>
        </div>
      </div>

      <div class="integral">
        <!-- 我的积分 -->
        <div @click="loadMore" class="integral1">
          <p class="integral_number">{{curPoint}}</p>
          <div class="integral2">
            <img class="star" src="../../assets/0.png" />
            <p class="integral_me">我的积分</p>
            <img class="arrow" src="../../assets/1.png" />
          </div>
        </div>
        <!-- 积分充值 -->
        <div @click="loadMore1" class="integral1">
          <img class="bag" src="../../assets/2.png" />
          <span class="fill">积分充值</span>
        </div>
      </div>

      <!-- 邀请好友 -->
      <div class="share">
        <img class="advert" src="../../assets/3.png" />
        <div class="item1">
          <div class="item1_txt">
            <span>每邀请一位好友</span>
            <span>即可获得100个积分奖励</span>
          </div>
          <div @click="loadFriend">
            <span class="item1_txt2">好友列表</span>
            <img class="arrow" src="../../assets/1.png" />
          </div>
        </div>
        <div class="item2">
          <div class="raise">
            <img src="../../assets/4.png" />
            <span class="raise1">+</span>
            <span class="raise2">100</span>
          </div>
          <mt-button class="share_img" @click.native="handClick">分享给好友</mt-button>
          <mt-popup v-model="popupVisible" position="center" modal="false">
            <img class="share_img1" :src="picture" />
            <p class="share_img2" style="text-align:center; margin-bottom:4px">可截图分享二维码</p>
          </mt-popup>
        </div>
      </div>
      <!-- 美团外卖红包 -->
      <div class="section">
        <a
          href="https://activityunion-marketing.meituan.com/unioncoupon/index.html?auTraceKey=0AA075754D0A44AD"
        >
          <div class="section1">
            <img src="../../assets/5.png" />
            <span>美团外卖红包</span>
          </div>
          <img class="section2" src="../../assets/1.png" />
        </a>
      </div>
      <!-- 联系客服 -->
      <div class="section" @click="ispop">
        <div class="section1">
          <img src="../../assets/6.png" />
          <span>联系客服</span>
        </div>
        <img class="section2" src="../../assets/1.png" />
      </div>
    </div>
    <!-- 联系客服弹窗组件 -->
    <Discern ref="Service"></Discern>
  </div>
</template>
<script>
import Recharge from "./Recharge";
import FriendList from "./FriendList";
import Discern from "./Discern";

export default {
  name: "Personal",
  data() {
    return {
      picture: "picture",
      iconUrl: "",
      user_name: "",
      mobile: "",
      curPoint: "",
      popupVisible: false
    };
  },
  methods: {
    // 跳转积分明细页面
    loadMore() {
      this.$router.push("/FractionDetails");
    },
    // 跳转积分充值页面
    loadMore1() {
      this.$router.push("/Recharge");
    },
    // 跳转好友列表页面
    loadFriend() {
      this.$router.push("/FriendList");
    },
    // 分享好友图
    handClick() {
      this.popupVisible = true;
      // 获取本地存储数据
      let login = JSON.parse(sessionStorage.getItem("login"));
      // 调用分享图接口
      let sheImg = {
        userid: login.result.user.id
      };
      this.$api.requestFriend(sheImg).then(res => {
        // let picture = "https://api.simeke.cn/sanyu" + res.result;
        // this.picture = picture;

        this.picture = "https://api.simeke.cn/sanyu" + res.result;
        console.log(res);
      });
    },
    // 关闭联系客服弹窗
    ispop() {
      this.$refs.Service.noService = true;
    }
  },
  created() {
    // 存储微信登录信息保存到本地
    let userinfo = {
      code: 200,
      message: "登录成功",
      result: {
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3d4dXNlciI6dHJ1ZSwiZXhwIjoxNTcyOTE2NzQ3LCJ1c2VybmFtZSI6Im92Ujl3czdDZ0tRWGV2RzdkblFheXkyMmtqZVEifQ.GZH07C6sBygPHdNEopCVAZ60l3t2M-HtLiVaPcq5Gvk",
        user: {
          city: "厦门",
          country: "中国",
          createBy: "wx",
          createIp: "127.0.0.1",
          createTime: 1572320340000,
          delFlag: 0,
          gender: 1,
          iconUrl:
            "http://thirdwx.qlogo.cn/mmopen/4G3fLC7uroUjTTfE0ATPTjTa2MxrkshfNUu6iaLPFeCSSXFaBlH5RVq9YFUkdZ7TF9qP3de4v42tlRK4icFOYESVSSwU66blv3/132",
          id: "9fe75dbf70a014b815be73642f4f5cf8",
          inviteByUserId: "",
          mobile: "13560335007",
          nickName: "c",
          point: 1000,
          province: "福建",
          subscribe: 1,
          updateTime: 1572408024000,
          wxOpenId: "ovR9ws7CgKQXevG7dnQayy22kjeQ",
          wxUnionId: "ovR9ws7CgKQXevG7dnQayy22kjeQ"
        }
      }
    };
    // 保存数据到本地
    sessionStorage.setItem("login", JSON.stringify(userinfo));

    // 从本地存储获取数据
    // let useinfo = sessionStorage.getItem("login");
    // useinfo = JSON.parse(useinfo);
    // 获取本地token
    // let login = useinfo.result;
    // let token = login.token;

    // 从本地存储获取数据
    let useinfo = JSON.parse(sessionStorage.getItem("login"));
    console.log("useinfo", useinfo);
    // 获取本地token
    let token = useinfo.result.token;

    // 用户信息
    this.curPoint = useinfo.result.user.point;
    this.user_name = useinfo.result.user.nickName;
    this.iconUrl = useinfo.result.user.iconUrl;
    this.mobile = useinfo.result.user.mobile;

    // 用户登录
    let params = {
      userId: "",
      code: "",
      invite_user_id: ""
    };
    this.$api.requestAuth(params).then(res => {
      console.log("wxLogin");
    });
  },
  components: {
    Recharge,
    FriendList,
    Discern
  }
};
</script>
<style>
.personal {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background: #f4f8f9;
}

.user {
  width: 100%;
  height: 7.2rem;
  display: flex;
  align-items: center;
  border-radius: 0 0 50px 50px;
  background-image: linear-gradient(bottom, #5787ff, #2f69ff);
}

.user img {
  width: 45px;
  height: 45px;
  margin: 0 0.69rem 0 0.85rem;
  border-radius: 50%;
}

.user div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user div :first-child {
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 2.5%;
}

.user div :last-child {
  color: #ffffff;
  font-size: 14px;
}

/* 积分 */
.integral {
  width: 100%;
  position: absolute;
  top: 95px;
  display: flex;
  justify-content: center;
}

.integral1 {
  width: 46.5%;
  height: 90px;
  margin-right: 5px;
  background: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.integral_number {
  margin: 0;
  font-weight: bold;
  color: #262121;
  font-size: 30px;
}

.integral2 {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.star {
  width: 11.5px;
  height: 11.5px;
}

.integral_me {
  color: #262121;
  font-size: 13px;
}

.arrow {
  width: 6px;
  height: 11px;
}

.bag {
  width: 21px;
  height: 21px;
  margin-bottom: 13.5px;
}

.fill {
  color: #262121;
  font-size: 13px;
}

.share {
  position: relative;
  width: 94%;
  height: 7.5rem;
  border-radius: 22px;
  margin: 20% 2.5% 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.advert {
  position: absolute;
  width: 42.5px;
  height: 41px;
}

.item1,
.item2 {
  width: 88%;
  padding-left: 8%;
}

.item1 {
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item1_txt {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item1_txt :first-child {
  color: #979eaa;
  font-size: 14px;
}

.item1_txt :last-child {
  color: #262121;
  font-size: 16px;
}

.item1_txt2 {
  color: #979eaa;
  font-size: 15px;
  margin-right: 5px;
}

.item1_txt2 img {
  width: 6px;
  height: 11px;
}

.item2 {
  height: 3.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.raise {
  color: #faa012;
  display: flex;
  align-items: center;
}

.raise img {
  width: 40.5px;
  height: 16.5px;
}

.raise1 {
  margin: 0 2.5px 0 5px;
  font-size: 15px;
}

.raise2 {
  font-size: 22.5px;
}

.share_img {
  width: 6.25rem !important;
  height: 2.1rem !important;
  background: #3863f1 !important;
  border-radius: 30px !important;
  font-size: 15px !important;
  text-align: center !important;
  line-height: 2.1rem !important;
  color: #ffffff !important;
}

.share_img1 {
  width: 16rem;
  height: 26rem;
}

.section {
  width: 88%;
  height: 45px;
  margin: 2.5% 2.5%;
  padding: 0 2.5%;
  border-radius: 22px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section a {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
}

.section1 {
  width: 100%;
  display: flex;
  align-items: center;
}

.section1 img {
  width: 20.5px;
  height: 20.5px;
  margin-right: 2.5%;
}

.section1 span {
  color: #262121;
  font-size: 14px;
}

.section2 {
  width: 7.5px;
  height: 13.5px;
}

.section3 {
  position: absolute;
  z-index: 20;
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
}
</style>