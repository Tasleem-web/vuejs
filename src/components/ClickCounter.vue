<template>
  <div>
    <button @click="incrementCounter">Clicked {{ count }} times</button>
  </div>
</template>

<script>
import useCounter from "../composable/useCounter";
// import CounterMixin from "../mixins/Counter";
//
export default {
  name: "ClickCounter",
  // data() {
  //   return {
  //     count: 100,
  //   };
  // },
  setup() {
    const { count, incrementCounter } = useCounter(100, 10);

    return {
      count,
      incrementCounter,
    };
  },
  // mixins: [CounterMixin],
};
</script>

<style scoped></style>
