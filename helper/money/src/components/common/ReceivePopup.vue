<template>
  <!-- 领红包-弹窗，被引入首页Home -->
  <div class="wrap_popup" v-if="showToast" @touchmove.prevent>
    <!--  v-if="showToast" -->
    <div class="shut_popup" @click="closed">
      <img src="../../assets/11.png" />
    </div>
    <div class="main">
      <div class="main_item1">
        <p>成功领取【4合一红包礼包①】</p>
        <p>{{item[0].type}}</p>
      </div>
      <div class="main_item2">
        <!-- 优惠券 -->

        <div class="coupon" v-for="(item,index) in red_box" :key="index">
          <div class="price">
            <span>￥</span>
            <span>{{item.Amount}}</span>
          </div>
          <div class="price1">
            <span>{{item.Name}}</span>
            <span>满{{item.Sum_Condition}}元可用</span>
          </div>
        </div>
      </div>
      <p class="main_item3">请打开饿了么App“我的-红包-店铺红包”查看</p>
      <p @click="charge_phone" class="main_item4">换个手机号继续领</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReceivePopup",
  data() {
    return {
      red_box: [
        {
          Amount: "",
          Name: "",
          Sum_Condition: ""
        }
      ],
      item: [{ type: "" }],
      showToast: false
    };
  },
  methods: {
    closed() {
      this.showToast = false;
    },
    charge_phone() {
      if (this.$router.push("../Home")) {
        this.showToast = false;
      }
    }
  }
};
</script>
<style>
.wrap_popup {
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  background-image: url(../../assets/14.png);
  background-repeat: no-repeat;
  background-size: 85%;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.shut_popup img {
  border-radius: 50%;
  border: 1px solid #7a8ab2;
  position: absolute;
  right: 7%;
  top: 17%;
  width: 1.7rem;
  height: 1.7rem;
}

.main {
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main_item1 {
  color: #f5ca91;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main_item1 :first-child {
  margin-top: 3rem;
  font-size: 15px;
}

.main_item1 :last-child {
  width: 52%;
  text-align: center;
  font-size: 12px;
  border-radius: 17px;
  border: 0.5px solid #f5ca91;
  margin: 0.45rem 0 1rem;
}

.main_item2 {
  width: 100%;
  height: 200px;
  margin-left: 30%;
  overflow: hidden;
}

.coupon {
  background-image: url(../../assets/15.png);
  background-repeat: no-repeat;
  background-size: 100% 60.5px;
  background-position: center;
  width: 70%;
  height: 60.5px;
  display: flex;
  align-items: center;
  margin-bottom: 1.5%;
}

.price {
  color: #d9452b;
  margin: 0 16% 0 6%;
}

.price :first-child {
  font-size: 12px;
  margin-right: 2.5px;
}

.price :last-child {
  font-size: 30px;
}

.price1 {
  display: flex;
  flex-direction: column;
}

.price1 :first-child {
  color: #262121;
  font-size: 14px;
  font-weight: bold;
}

.price1 :last-child {
  color: #979eaa;
  font-size: 12px;
}

.main_item3 {
  width: 100%;
  text-align: center;
  margin: 0.4rem 0 0.7rem;
  color: #f5ca91;
  font-size: 12px;
  white-space: nowrap;
}

.main_item4 {
  font-size: 15px;
  border-radius: 34px;
  width: 45%;
  height: 1.8rem;
  text-align: center;
  line-height: 1.8rem;
  background-image: linear-gradient(right, #faf1d0, #fdcf8b);
  color: #623c13;
}
</style>