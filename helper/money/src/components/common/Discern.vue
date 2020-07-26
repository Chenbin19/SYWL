<template>
  <div class="discern" v-show="noService">
    <div class="discern1">
      <div class="close_discern" @click="closePop">
        <img src="../../assets/11.png" />
      </div>
      <div class="discern2">
        <div class="discern3">
          <p>长按识别下方二维码</p>
          <p>添加客服微信</p>
        </div>
        <img src="../../assets/12.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Discern",
  data() {
    return { noService: false };
  },
  methods: {
    // 关闭客服二维码弹窗
    closePop() {
      this.noService = false;
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.discern {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.discern1 {
  width: 100%;
  height: 24rem;
  background: #ffffff;
  position: fixed;
  bottom: 0;
}

.close_discern img {
  float: right;
  width: 0.9rem;
  height: 0.9rem;
  margin: 1rem 1rem 0.6rem;
}

.discern2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.discern3 {
  color: #262121;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.discern3 :first-child {
  font-size: 18px;
  font-weight: bold;
}

.discern3 :last-child {
  font-size: 14px;
  margin: 0.63rem 0 2.2rem;
}

.discern2 img {
  width: 12.5rem;
  height: 12.5rem;
}
</style>