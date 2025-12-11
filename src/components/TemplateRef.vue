<template>
  <div>
    <h3>Template Ref</h3>
    <input type="text" ref="inputRef" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "TemplateRef",
  setup() {
    const inputRef = ref(null);

    onMounted(() => {
      inputRef.value.focus();
    });

    return {
      inputRef,
    };
  },
  // mounted() {
  //   this.$refs.inputRef.focus();
  // },
};
</script>

<style scoped></style>
