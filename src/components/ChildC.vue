<template>
  <div>
    <h2>Child C component</h2>
    <h3>Child C component userName - {{ userName }}</h3>
    <h3>Child C Composition component userName - {{ c_userName }}</h3>

    <h3>Count - {{ count }}</h3>
    <h3>Reactive Hero - {{ firstName }} {{ lastName }}</h3>
  </div>
  <h3>Count - {{ count }}</h3>
  <button @click="incrementCount">Increment Child Count</button>
</template>

<script>
import { inject, toRefs } from "vue";

export default {
  name: "ChildC",
  inject: ["userName"],
  setup() {
    const c_userName = inject("c_userName", "Default username"); // Always returns a string
    console.log("c_userName", c_userName);

    const count = inject("c_count", 0);
    const hero = inject("c_hero", {});

    const incrementCount = inject("c_incrementCount");

    return {
      c_userName,
      count,
      ...toRefs(hero),
      incrementCount,
    };
  },
};
</script>

<style scoped></style>
