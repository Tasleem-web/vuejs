<template>
  <div>
    <button @click="incrementCounter">Clicked {{ count }} times</button>
  </div>
</template>

<script>
import CounterMixin from "../mixins/Counter";

export default {
  name: "ClickCounter",
  data() {
    return {
      count: 100,
    };
  },
  mixins: [CounterMixin],
};
</script>

<style scoped></style>
