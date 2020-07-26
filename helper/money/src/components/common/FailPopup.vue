<template>
  <!-- 充值失败弹窗 -->
  <div class="content1" v-show="nopop">
    <div class="popup">
      <p class="success">支付失败</p>
      <div>
        <span>支付被取消，如需充值请重新</span>
        <span>发起订单</span>
      </div>
      <button class="know" @click="closePop">知道啦</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "FailPopup",
  data() {
    return { nopop: false };
  },
  methods: {
    // 关闭支付失败弹窗
    closePop() {
      this.nopop = false;
    }
  }
};
</script>
<style scoped>
.content1 {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1.7rem;
  position: absolute;
  top:0
}

.popup {
  width: 100%;
  height: 12.5rem;
  padding-top: 1.5rem;
  border-radius: 32px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success {
  color: #262121;
  font-size: 18px;
  font-weight: Bold;
}

.success,
.popup div {
  margin-bottom: 1.9rem;
}

.popup div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
}

span {
  color: #262121;
  font-size: 15px;
}

.know {
  width: 15rem;
  height: 2.8rem;
  background: #3863f1;
  border: none;
  outline: none;
  border-radius: 50px;
  font-size: 15px;
  text-align: center;
  color: #ffffff;
}
</style>