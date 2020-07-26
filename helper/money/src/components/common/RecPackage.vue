<template>
<!-- 被引入首页FirstPage组件 -->
  <div>
    <a v-if="item.show" href="javascript:;" class="red_envelope3">
      <div>
        <span>每日免费红包</span>
        <span>（推荐）</span>
      </div>
      <span>免积分/次</span>
    </a>
    <div v-else>
      <recpacks></recpacks>
    </div>
  </div>
</template>
<script>
import RecPacks from "./RecPacks";

export default {
  name: "RecPackage",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  components: {
    recpacks: RecPacks
  }
};
</script>
<style>
.red_envelope3 {
  text-decoration: none;
  width: 19.6rem;
  height: 2.8rem;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0 0.63rem;
}

.red_envelope3 div {
  color: #333333;
  font-size: 15px;
}

.red_envelope3 span {
  font-size: 14px;
}
</style>