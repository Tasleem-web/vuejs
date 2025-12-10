<template>
  <div><b>Hi </b>{{ name }}</div>
  <template v-for="item in items" :key="item.id">
    <h2>{{ item.title }} - {{ item.price }}</h2>
  </template>
</template>

<script>
export default {
  name: "Greet-App",
  data() {
    return {
      fullName: "Tasleem",
    };
  },
  props: ["name", "items"],
};
</script>
