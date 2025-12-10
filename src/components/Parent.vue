<template>
  <div>Parent Component</div>
  <div>
    <button @click="showChild = !showChild">Toggle button</button>
  </div>
  <Child v-if="showChild" />
</template>

<script>
import Child from "./Child.vue";
export default {
  name: "ParentComponent",
  data() {
    return {
      showChild: true,
    };
  },
  beforeCreate() {
    console.log("Parent Component beforeCreated()");
  },
  created() {
    console.log("Parent Component created()");
  },
  beforeMount() {
    console.log("Parent Component beforeMount()");
  },
  mounted() {
    console.log("Parent Component mounted()");
  },
  beforeUpdate() {
    console.log("Parent Component beforeUpdate()");
  },
  updated() {
    console.log("Parent Component updated()");
  },
  beforeUnmount() {
    console.log("Parent Component beforeUnmount()");
  },
  unmounted() {
    console.log("Parent Component unmounted()");
  },
  components: {
    Child,
  },
};
</script>

<style scoped></style>
