<template>
<!-- 红包类型组件，被引入RecPackage组件 -->
  <div class="recommend_rackage">
    <a class="recommend_rackage1" href="javascript:;">
      <div class="recommend_rackage2">
        <div>
          <span>每日免费红包</span>
          <span>（推荐）</span>
        </div>
        <span>免积分/次</span>
      </div>
      <p>该红包类型每天可领取一次，最低2元，最高20元，活跃用户必出30-5，风控用户将会领取失败。</p>
    </a>
  </div>
</template>
<script>
export default {
  name: "RecPacks"
};
</script>
<style>
.recommend_rackage {
  width: 19.6rem;
  height: 4.5rem;
  background: #F6F8FE;
  border-radius: 11px;
  border: 0.5px solid #3863f1;
  margin: 0 .63rem .63rem;
  padding: 0.78rem 0.63rem 0;
}

.recommend_rackage a {
  text-decoration: none;
}

.recommend_rackage2{
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem
}

.recommend_rackage2 div {
  font-weight: bold;
  color: #3863f1;
  font-size: 16px;
}

.recommend_rackage2 span {
  font-size: 14px
}

.recommend_rackage1 p{
  color: #979EAA;
  font-size: 12px
}


</style>