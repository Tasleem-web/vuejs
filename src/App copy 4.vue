<template>
  <div>
    <button @click="activeTab = 'tabA'">Tab A</button>
    <button @click="activeTab = 'tabB'">Tab B</button>
    <button @click="activeTab = 'tabC'">Tab C</button>
    <button @click="activeTab = 'child-Style'">Child style</button>
  </div>
  <div>
    <keep-alive>
      <component :is="activeTab" />
    </keep-alive>
    <!-- <TabA v-if="activeTab === 'tabA'" />
    <TabB v-if="activeTab === 'tabB'" />
    <TabC v-if="activeTab === 'tabC'" /> -->
  </div>
</template>

<script>
import TabA from "./components/TabA.vue";
import ChildStyle from "./components/ChildStyle.vue";
import TabB from "./components/TabB.vue";
import TabC from "./components/TabC.vue";

export default {
  name: "App",
  data() {
    return {
      activeTab: "tabA",
    };
  },
  components: {
    TabA,
    ChildStyle,
    TabB,
    TabC,
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
  margin-top: 60px;
}

h4 {
  color: orange !important;
}
</style>
