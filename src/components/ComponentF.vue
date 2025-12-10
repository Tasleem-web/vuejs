<template>
  <div>Component F username - {{ usersName.username }}</div>
</template>

<script>
export default {
  name: "Component-F",
  inject: ["usersName"],
};
</script>

<style scoped></style>
