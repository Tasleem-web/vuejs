<template>
  <div>
  <div>Component C</div>
    <ComponentE />
  </div>
</template>

<script>
import ComponentE from "./ComponentE.vue";


export default {
  name: "Component-C",
  components: {
    ComponentE,
  },
};
</script>

<style scoped></style>
