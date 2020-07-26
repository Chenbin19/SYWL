<template>
  <div>
    <img class="imgstyle" :src="focused?selectedImage:normalImage" />
  </div>
</template>
<script>
export default {
  props: {
    focused: false,
    selectedImage: { default: "" },
    normalImage: { dafault: "" }
  }
};
</script>
<style>
.imgstyle {
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: .3rem;
}
</style>
