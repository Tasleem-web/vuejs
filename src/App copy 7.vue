<template>
  <div>
    <!-- <TemplateRef /> -->
    <!-- <input type="text" v-focus />
    <p v-color-change="'red'">This text will be red.</p> -->
    <!-- <ClickCounter />
    <hr />
    <HoveredCounter /> -->
    <DataComponent />
  </div>
</template>

<script>
// import TemplateRef from "./components/TemplateRef.vue";
// import ClickCounter from "./components/ClickCounter.vue";
// import HoveredCounter from "./components/HoveredCounter.vue";
import DataComponent from "./components/Data.vue";

export default {
  name: "App",
  components: {
    // TemplateRef,
    // ClickCounter,
    // HoveredCounter,
    DataComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
