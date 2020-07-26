<template>
  <!-- 首页，被引入Home组件 -->
  <div class="phone_popup">
    <span class="phone_txt">请输入饿了么手机号领取</span>
    <input v-model="phone" type="text" placeholder="请输入手机号" />
    <!-- 领取按钮 -->
    <button @click="Ancestors">{{list[index].info}}</button>
    <p class="phone_txt1">领取规则</p>
    <div v-for="(item,index) in list[index].recive_info" :key="index">
      <p class="phone_txt2">{{item.info1}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "PhonePopup",
  data() {
    return {
      phone: "",
      list: [
        {
          info: "立即领取",
          recive_info: [
            { info1: "1.该类型红包每日仅可领取一次" },
            { info1: "2.该类型红包风控账户将会领取失败。" }
          ]
        },
        {
          info: "立即领取",
          recive_info: [
            { info1: "1.该类型红包每日仅可领取一次" },
            { info1: "2.该类型红包风控账户将会领取失败。" }
          ]
        },
        {
          info: "活动暂不可用",
          recive_info: [
            { info1: "1.该类型红包为组合包共四张优惠卷。" },
            { info1: "2.该类型红包每天仅可领取一次。" },
            { info1: "3.该类型红包无视风控账户。" }
          ]
        },
        {
          info: "活动暂不可用",
          recive_info: [
            { info1: "1.该类型红包为组合包共四张优惠卷。" },
            { info1: "2.该类型红包每天仅可领取一次。" },
            { info1: "3.该类型红包无视风控账户。" }
          ]
        },
        {
          info: "活动暂不可用",
          recive_info: [
            { info1: "1.该类型红包金额约在4~10元。" },
            { info1: "2.领取如出现'3.2'系统将自动在5分钟内返还积分。" },
            { info1: "3.该类型红包每天可领5次。" }
          ]
        },
        {
          info: "立即领取",
          recive_info: [
            { info1: "1.该类型红包每日仅可领取一次" },
            { info1: "2.该类型红包风控账户将会领取失败。" }
          ]
        }
      ],
      index: 0
    };
  },
  methods: {
    Ancestors() {
      //  孙子组件传事件给爷爷组件
      this.$listeners.test1(this.phone);
    }
  },
  created() {
    let login = JSON.parse(sessionStorage.getItem("login"));
    this.phone =login.result.user.mobile ;
  }
};
</script>
<style>
.phone_popup {
  width: 21.8rem;
  height: 15.6rem;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 11px;
  padding-bottom: 0.75rem;
}

.phone_txt {
  color: #333333;
  font-size: 13px;
  margin: 1rem 0 1.25rem 0.63rem;
}

.phone_popup input {
  margin: 0 0.63rem 1rem;
  height: 2.7rem;
  background: #eef3f7;
  border-radius: 8px;
  color: #979eaa;
  font-size: 13px;
  outline: none;
  padding-left: 0.63rem;
  border: none;
}

.phone_popup button {
  height: 2.66rem;
  background: #3863f1;
  border-radius: 45px;
  margin: 0 0.63rem;
  color: #ffffff;
  font-size: 15px;
  border: none;
  outline: none;
}

.phone_txt1 {
  color: #333333;
  font-size: 14px;
  margin: 0.8rem 0 0.6rem 0.63rem;
}

.phone_txt2 {
  color: #333333;
  font-size: 13px;
  margin: 0 0 2px 1.3rem;
}
</style>