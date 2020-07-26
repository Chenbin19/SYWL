<template>
  <div class="page">
    <!-- 顶部 -->
    <div class="hand">
      <img src="../../assets/user1.png" />
      <div class="hand_title">
        <p>欢迎使用</p>
        <p>省钱学姐</p>
      </div>
    </div>

    <div class="page1">
      <!-- 用户积分 -->
      <div class="user_recharge">
        <div class="user1">
          <div class="user1_item">
            <img :src="iconUrl" />
            <span>{{user_name}}</span>
          </div>
          <div class="user1_item1">
            <img src="../../assets/4.png" />
            <span>{{curPoint}}</span>
          </div>
          <button @click="loadDetails" class="user1_item2">
            <span>积分明细</span>
            <img src="../../assets/1.png" />
          </button>
        </div>
        <button @click="recharge" class="user1_btn">积分充值</button>
      </div>
      <!-- 选择领取的红包类型 -->
      <div class="red_envelope">
        <p class="red_envelope1">请选择您要的领取的红包类型</p>
        <div class="red_envelope2">
          <!-- 红包套餐选择列表 -->
          <div v-for="(item,index) in list" :key="index" style="redList">
            <!-- 红包套餐标题 -->
            <div @click="showCard(item,index)" :item="item" v-if="item.show" class="red_envelope3">
              <div>
                <span>{{item.Name}}</span>
                <span>（推荐）</span>
              </div>
              <span>{{item.type}}积分/次</span>
            </div>
            <!-- 红包具体信息 -->
            <div v-else class="recommend_rackage">
              <div class="recommend_rackage2">
                <div>
                  <span>{{item.Name}}</span>
                  <span>（推荐）</span>
                </div>
                <span>{{item.type}}积分/次</span>
              </div>
              <p>{{item.content}}</p>
            </div>
          </div>
          <!-- 手机号领取组件 -->
          <div style="padding-bottom:13.5%">
            <PhonePopup ref="phe" v-on="$listeners"></PhonePopup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PhonePopup from "./PhonePopup";

export default {
  name: "FirstPage",
  data() {
    return {
      iconUrl: "",
      user_name: "",
      curPoint: "",
      change_type_id: 1,
      // 红包套餐数据
      list: [
        {
          id: 1,
          type: "免",
          show: false,
          Name: "通用红包",
          content:
            "该类型红包每天可领取一次，最低2元，最高20元，活跃用户必出30-5，风控用户将会领取失败。"
        },
        {
          id: 2,
          type: "88",
          show: true,
          Name: "每日拼手气红包",
          content:
            "该类型红包每天可领取一次，有概率出大额红包，小于4元红包不扣积分。"
        },
        {
          id: 3,
          type: "80",
          show: true,
          Name: "每日特惠红包",
          content:
            "必出一个满30-5的品质联盟红包。此礼包包含4个红包，分别为：全场通用(30-3)、品质联盟(30-5)、下午茶红包(30-4)和夜宵红包(39-6)"
        },
        {
          id: 4,
          type: "80",
          show: true,
          Name: "每日人品红包",
          content:
            "必出一个满30-5的品质联盟红包。此礼包包含4个红包，分别为：全场通用(30-3)、品质联盟(30-5)、下午茶红包(30-4)和夜宵红包(39-6)"
        },
        {
          id: 5,
          type: "80",
          show: true,
          Name: "品质联盟红包",
          content:
            "该红包为饿了么'品质联盟'仅限品质联盟商家可用该类型红包，每日可领取5次。"
        },
        {
          id: 6,
          type: "80",
          show: true,
          Name: "全场通用红包",
          content:
            "领取一个39-7或者45-5店铺通用红包，（39-7在饿了么内显示为果蔬，实际为通用红包)，低于5元不扣积分"
        }
      ]
    };
  },
  methods: {
    // 遍历红包套餐类型
    showCard(a, index) {
      this.list.forEach(item => {
        a.id == item.id ? (item.show = false) : (item.show = true);
      });
      this.change_type_id = a.id;
      // 选择套餐屏幕平滑滚动到底部的手机领取框位置
      window.scrollTo({
        top: 400,
        behavior: "smooth"
      });
      // 选择套餐手机号领取页面更换内容绑定下标
      this.$refs.phe.index = index;
    },
    // 跳转积分充值页面
    recharge() {
      this.$router.push("/Recharge");
    },
    // 跳转积分明细页面
    loadDetails() {
      this.$router.push("/FractionDetails");
    }
  },
  created() {
    // 从本地存储获取数据
    let login = JSON.parse(sessionStorage.getItem("login"));
    // 调用用户积分、用户姓名，用户头像
    this.curPoint = login.result.user.point;
    this.user_name = login.result.user.nickName;
    this.iconUrl = login.result.user.iconUrl;
  },
  components: {
    PhonePopup
  }
};
</script>
<style>
.page {
  width: 100%;
  height: auto;
  background: #f4f8f9;
  position: relative;
}

.hand {
  width: 100%;
  height: 11rem;
  border-radius: 0 0 48px 48px;
  background-image: linear-gradient(bottom, #5787ff, #2f69ff);
  box-sizing: border-box;
  padding: 1.25rem 0 4.2rem 2.3rem;
  display: flex;
}

.hand img {
  width: 6.25rem;
  height: 5.4rem;
}

.hand_title :first-child {
  color: #82a0f8;
  font-size: 16px;
  margin-bottom: 0.7rem;
}

.hand_title :last-child {
  color: #ffffff;
  font-size: 25px;
}

.page1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.91rem;
}

.user_recharge {
  position: absolute;
  top: 6.4rem;
  width: 93%;
  height: 8.75rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 22px;
}

.user1 {
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
}

.user1_item,
.user1_item1 {
  display: flex;
  align-items: center;
}

.user1_item img {
  border-radius: 50%;
  width: 1.56rem;
  height: 1.56rem;
}

.user1_item span {
  color: #4e515b;
  font-size: 15px;
  margin-left: 0.63rem;
}

.user1_item1 img {
  width: 2.53rem;
  height: 1rem;
}

.user1_item1 span {
  color: #262121;
  font-size: 34px;
  font-weight: bold;
  margin-left: 0.63rem;
}

.user1_item2 {
  background: #ffffff;
  border: none;
  outline: none;
  text-align: start;
  margin-top: 0.2rem;
}

.user1_item2 span {
  color: #979eaa;
  font-size: 13px;
  margin-right: 0.3rem;
  text-align: center;
}

.user1_item2 img {
  width: 0.38rem;
  height: 0.6rem;
}

.user1_btn {
  margin-right: 1.25rem;
  background: #3863f1;
  border-radius: 34px;
  border: none;
  width: 6.25rem;
  height: 2.1rem;
  outline: none;
  color: #ffffff;
}

.red_envelope {
  width: 21.8rem;
  margin-top: 6rem;
}

.red_envelope1 {
  color: #666666;
  font-size: 13px;
  margin-bottom: 0.7rem;
}

.red_envelope2 {
  width: 21.8rem;
  height: auto;
  background: #e6eaed;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0.63rem;
}

.redList {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.red_envelope3 {
  width: 19.6rem;
  height: 2.8rem;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.63rem;
  margin: 0 auto 0.5rem;
}

.red_envelope3 div {
  color: #333333;
  font-size: 15px;
}

.red_envelope3 span {
  font-size: 14px;
}

.recommend_rackage {
  width: 19.6rem;
  height: auto;
  background: #f6f8fe;
  border-radius: 11px;
  border: 0.5px solid #3863f1;
  margin: 0 0.63rem 0.63rem;
  padding: 0 0.78rem 0.63rem 0.5rem;
}

.recommend_rackage2 {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.recommend_rackage2 div {
  font-weight: bold;
  color: #3863f1;
  font-size: 16px;
}

.recommend_rackage2 span {
  font-size: 14px;
}

.recommend_rackage2 :last-child {
  color: #3863f1;
}

.recommend_rackage p {
  color: #979eaa;
  font-size: 12px;
}
</style>