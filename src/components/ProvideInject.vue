<template>
  <div>
    <h3>Parent Component {{ name }}</h3>
    <ChildA />
  </div>
  <h3>Count - {{ count }}</h3>
  <button @click="incrementCount">Increment Parent Count</button>
</template>

<script>
import ChildA from "./ChildA.vue";
import { provide, reactive, ref, toRefs } from "vue";

export default {
  name: "ProvideInject",
  components: {
    ChildA,
  },
  data() {
    return {
      name: "Tasleem",
    };
  },
  setup() {
    provide("c_userName", "Tasleem");

    const count = ref(0);

    const state = reactive({
      firstName: "Mohammad",
      lastName: "Tasleem",
    });

    provide("c_count", count);
    provide("c_hero", state);
    provide("c_incrementCount", incrementCount);

    function incrementCount() {
      count.value++;
    }

    return {
      count,
      ...toRefs(state),
      incrementCount,
    };
  },
  provide() {
    return {
      userName: this.name,
    };
  },
};
</script>

<style scoped></style>
