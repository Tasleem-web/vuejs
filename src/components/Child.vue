<template>
  <div>Child Component</div>
</template>

<script>
export default {
  name: "ChildComponent",
  beforeCreate() {
    console.log("Child Component beforeCreated()");
  },
  created() {
    console.log("Child Component created()");
  },
  beforeMount() {
    console.log("Child Component beforeMount()");
  },
  mounted() {
    console.log("Child Component mounted()");
  },
  beforeUpdate() {
    console.log("Child Component beforeUpdate()");
  },
  updated() {
    console.log("Child Component updated()");
  },
  beforeUnmount() {
    console.log("Child Component beforeUnmount()");
  },
  unmounted() {
    console.log("Child Component unmounted()");
  },
};
</script>

<style scoped></style>
