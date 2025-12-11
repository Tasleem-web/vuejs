<template>
  <!-- <div>
    <h2>Name - {{ name }}</h2>
    <button @click="setName">Set new name</button>
  </div>
  <div>
    <h2>Count - {{ count }}</h2>
    <button @click="incrementCount">Increment Count</button>
  </div>

  <div>
    <h2>{{ first }} - {{ last }}</h2>
    <button @click="changeHero">Change Hero</button>
  </div> -->
  <div>
    <!-- <WatchComponent /> -->
    <ProvideInject />
  </div>
</template>

<script>
// import { reactive, ref, toRefs } from "vue";
// import VModel from "./components/VModel.vue";
// import Computed from "./components/Computed.vue";
// import WatchComponent from "./components/Watch.vue";
import ProvideInject from "./components/ProvideInject.vue";

export default {
  name: "App",
  components: {
    ProvideInject,
  },
  data() {
    return {
      name: "Tasleem",
    };
  },
  methods: {
    setName() {
      this.name = "Mohammad";
    },
  },

  // setup() {
  //   const count = ref(0);

  //   const state = reactive({
  //     first: "Tasleem",
  //     last: "Mohammad",
  //   });

  //   function incrementCount() {
  //     count.value++;
  //   }

  //   function changeHero() {
  //     (state.first = "Umme"), (state.last = "Rubab");
  //   }

  //   return {
  //     count,
  //     incrementCount,
  //     ...toRefs(state),
  //     changeHero,
  //   };
  // },
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
