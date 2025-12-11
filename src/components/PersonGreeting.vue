<template>
  <div>
    <h2>Hi {{ fullName }}</h2>
    <button @click="sendEvent">Call Heros</button>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "PersonGreeting",
  props: ["firstName", "lastName"],
  setup(props, context) {
    console.log(props);
    const fullName = computed(() => {
      return `${props.firstName} ${props.lastName}`;
    });

    function sendEvent() {
      context.emit("callHero", fullName);
    }

    return {
      fullName,
      sendEvent,
    };
  },
  // computed: {
  //   fullName() {
  //     return `${this.firstName} ${this.lastName}`;
  //   },
  // },
};
</script>

<style scoped></style>
