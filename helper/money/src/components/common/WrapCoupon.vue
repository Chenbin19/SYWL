<template>
  <div class="coupon">
    <a href="javascript:;">
    <div class="price">
      <span>￥</span>
      <span>5</span>
    </div>
    <div class="price1">
      <span>品质联盟专享红包</span>
      <span>满30元可用</span>
    </div></a>
  </div>
</template>
<script>
export default {
  name: "WrapCoupon"
};
</script>
<style>
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

.coupon a{
  width: 100%;
  text-decoration: none;
  display: flex
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

.price1{
  display: flex;
  flex-direction: column;
}

.price1 :first-child{
  color: #262121;
  font-size: 14px;
  font-weight: bold
}

.price1 :last-child{
  color: #979EAA;
  font-size: 12px
}
</style>