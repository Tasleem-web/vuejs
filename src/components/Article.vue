<template>
  <div>
    <div>Article component</div>
    <h2 v-bind="$attrs">{{ title }}</h2>
    <h2 :class="customClass">{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: "Article-Component",
  props: {
    title: String,
    name: String,
    customClass: String,
  },
  inheritAttrs: false,
};
</script>

<style scoped>
#article-id {
  color: goldenrod;
}
</style>
