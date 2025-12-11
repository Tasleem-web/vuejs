<template>
  <div>
    <ClickCounter />
    <hr />
    <HoveredCounter />
  </div>
</template>

<script>
import ClickCounter from "./components/ClickCounter.vue";
import HoveredCounter from "./components/HoveredCounter.vue";
export default {
  name: "App",
  components: {
    ClickCounter,
    HoveredCounter,
  },
};
</script>

<style scoped></style>
