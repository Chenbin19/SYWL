<template>
  <!-- 积分充值套餐选择，被引入个人中心Personal组件 -->
  <div class="recharge">
    <div @click="loadPage" class="user2">
      <div class="user3">
        <img :src="iconUrl" />
        <div>
          <span>{{user_name}}</span>
          <span>{{mobile}}</span>
        </div>
      </div>
      <div class="user4">
        <span>{{curPoint}}</span>
        <span>当前积分</span>
      </div>
    </div>

    <div class="discount">
      <p class="set">请选择优惠套餐</p>

      <!-- 四个套餐 -->
      <div class="discount1">
        <div @click="ispop(index)" v-for="(item,index) in list" :key="index" class="discount2">
          <div class="discount3">
            <span>{{item.user_number}}</span>
            <span>积分</span>
          </div>
          <p class="discount4">￥{{item.user_cost}}</p>
          <p class="discount5">{{item.user_summary}}</p>
        </div>
      </div>

      <!-- 充值说明 -->
      <div class="explain">
        <p class="explain1">充值说明</p>
        <p class="explain2">
          1、请关注公众号：
          <a href="javascript:;" @click="isService" style="color:#3863F1">省钱学姐</a>，以便更好的找到使用入口
        </p>
        <p class="explain2">2、积分可用于本公众号提供的各种活动，一经充值概不退款</p>
        <p class="explain3" @click="loadFraction">积分记录</p>
      </div>
    </div>
    <!-- 支付失败弹窗 -->
    <FailPopup ref="Fail"></FailPopup>
    <!-- 客服二维码弹窗 -->
    <discern ref="Service"></discern>
  </div>
</template>
<script>
// 引入充值失败弹窗组件
import FailPopup from "./FailPopup";
import Discern from "./Discern";

export default {
  name: "Recharge",
  data() {
    return {
      iconUrl:"",
      user_name: "",
      mobile:"",
      curPoint: "",
      list: [
        {
          user_number: 420,
          user_cost: "6",
          user_summary: "预计节省5外卖费用"
        },
        {
          user_number: 760,
          user_cost: "9",
          user_summary: "预计节省25外卖费用"
        },
        {
          user_number: 1100,
          user_cost: "12",
          user_summary: "预计节省50外卖费用"
        },
        {
          user_number: 2000,
          user_cost: "20",
          user_summary: "预计节省125外卖费用"
        }
      ]
    };
  },
  methods: {
    loadPage() {
      this.$router.push("../Home");
    },
    loadFraction() {
      this.$router.push("./FractionDetails");
    },
    ispop(index) {
      let login = JSON.parse(sessionStorage.getItem("login"));

      let recharge = {
        orderMoney: this.list[index].user_cost,
        userId: login.result.user.id
      };
      this.$api.requestPay(recharge).then(res => {
        console.log("res", res);
        // 支付判断
        if (res.error == true) {
          this.$refs.Fail.nopop = true;
        }
      });
    },
    isService() {
      this.$refs.Service.noService = true;
    }
  },
  created() {
    let login = JSON.parse(sessionStorage.getItem("login"));
    this.curPoint = login.result.user.point;
    this.iconUrl = login.result.user.iconUrl;
    this.user_name = login.result.user.nickName;
    this.mobile = login.result.user.mobile;
  },
  components: {
    FailPopup,
    Discern
  }
};
</script>
<style>
.recharge {
  width: 100%;
  height: auto;
  background: #ffffff;
}

.user2 {
  width: 100%;
  height: 6.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.69rem;
  background-image: linear-gradient(bottom, #5787ff, #2f69ff);
}

.user3 {
  display: flex;
  align-items: center;
}

.user3 img {
  width: 45px;
  height: 45px;
  margin-right: 0.69rem;
  border-radius: 50%;
}

.user3 div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user3 div :first-child {
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 2.5%;
}

.user3 div :last-child {
  color: #ffffff;
  font-size: 14px;
}

.user4 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user4 :first-child {
  color: #ffffff;
  font-size: 25px;
}

.user4 :last-child {
  color: #d4e0ff;
  font-size: 13px;
}

.set {
  margin: 5% 3% 3.5%;
  color: #666666;
  font-size: 14px;
}

.discount {
  width: 100%;
  height: auto;
  position: absolute;
  top: 5.4rem;
  background: #ffffff;
  border-radius: 11px;
}

.discount1 {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.discount2 {
  width: 48%;
  margin-bottom: 0.5rem;
  border: 0.5px solid #ffe4c2;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.discount3 {
  margin: 20% 0 3.5%;
  height: 22.5px;
  display: flex;
  align-items: flex-end;
  color: #262121;
}

.discount3 :first-child {
  font-size: 30px;
  margin-right: 3px;
}

.discount3 :last-child {
  font-size: 14px;
  margin-bottom: 5px;
}

.discount4 {
  width: 36%;
  height: 15px;
  border-radius: 14px;
  background: #fff2e2;
  color: #733a08;
  font-size: 14px;
  font-family: Heavy;
  line-height: 15px;
  text-align: center;
}

.discount5 {
  margin: 0.56rem 0 0.8rem;
  color: #979eaa;
  font-size: 12px;
}

.explain {
  position: fixed;
  box-sizing: border-box;
  padding: 0 0.8rem;
  bottom: 0;
}

.explain1 {
  color: #666666;
  font-size: 14px;
  margin-bottom: 0.6rem;
}

.explain2 {
  color: #666666;
  font-size: 13px;
  margin-bottom: 0.63rem;
}

.explain3 {
  text-align: center;
  margin: 0.63rem 0 1rem;
  color: #979eaa;
  font-size: 13px;
}
</style>