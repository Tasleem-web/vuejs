<template>
  <div>
    <AppHeader />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style scoped></style>
