<template>
  <div>Mouse position is at: {{ x }}, {{ y }}</div>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>

  <ul v-else style="list-style: decimal">
    <li v-for="post in slicedData" :key="post.id">{{ post.title }}</li>
  </ul>

  <button @click="fetchData">Reload</button>
</template>

<script>
import { computed } from "vue";
import useFetch from "./composable/useFetch";
import useMouse from "./composable/useMouse";
export default {
  name: "App",
  setup() {
    const { data, loading, error, fetchData } = useFetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const { x, y } = useMouse();

    const slicedData = computed(() => {
      return data.value.slice(0, 20);
    });

    return { data, loading, error, fetchData, x, y, slicedData };
  },
};
</script>

<style scoped></style>
