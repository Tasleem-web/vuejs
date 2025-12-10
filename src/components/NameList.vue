<template>
  <h2 v-for="name of names" :key="name.firstName">
    <slot :firstName="name.firstName" :lastName="name.lastName"></slot>
  </h2>
</template>

<script>
export default {
  name: "Name-List",
  data() {
    return {
      names: [
        {
          firstName: "Bruce",
          lastName: "Wayne",
        },
        {
          firstName: "Clert",
          lastName: "Kent",
        },
        {
          firstName: "Princess",
          lastName: "Diana",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
