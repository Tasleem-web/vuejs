<template>
  <div>
    <button @mouseover="incrementCounter">Hovered {{ count }} times</button>
  </div>
</template>

<script>
// import CounterMixin from "../mixins/Counter";
import useCounter from "../composable/useCounter";
export default {
  name: "ClickCounter",
  setup() {
    const { count, incrementCounter } = useCounter();

    return {
      count,
      incrementCounter,
    };
  },
  // mixins: [CounterMixin],
};
</script>

<style scoped></style>
