<template>
  <div>
    <h3>Template Ref</h3>
    <input type="text" ref="templateRef" />
  </div>
</template>

<script>
export default {
  name: "TemplateRef",
  created() {
    console.log(this.templateRef);
  },
  mounted() {
    this.$refs.templateRef.focus();
  },
};
</script>

<style scoped></style>
