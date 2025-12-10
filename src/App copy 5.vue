<template>
  <button id="myBtn" @click="showModal = true">Open Modal</button>

  <teleport v-if="showModal" to="#portal-root">
    <PortalModal @closeModal="showModal = false" />
  </teleport>
</template>

<script>
import PortalModal from "./components/Portal-Modal.vue";

export default {
  name: "App",
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    PortalModal,
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
