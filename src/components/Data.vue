<template>
  <div>Optional - First name {{ o_firstName }}</div>
  <div>
    Optional - {{ o_firstName }} {{ o_LastName }} <b>a.k.a</b> {{ o_heroName }}
  </div>
  <hr />
  <div>Composit - First name {{ c_firstName }}</div>
  <div>Greet Composit - First name {{ greet }}</div>
  <hr />
  <div>
    Composit - {{ state.firstName }} - {{ state.lastName }} -
    {{ state.heroName }}
  </div>
  <div>Greeting composite - {{ greetingReactiveState }}</div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "DataComponent",
  setup() {
    const c_firstName = ref("Mohammad");
    console.log(c_firstName);
    c_firstName.value = "Setup Tasleem";

    const greet = `Hi ${c_firstName.value}`;
    console.log(greet);

    const state = reactive({
      firstName: "Princes",
      lastName: "Diana",
      heroName: "Wonder woman",
    });

    const greetingReactiveState = `Hi ${state.firstName} - ${state.lastName} a.k.a ${state.heroName}`;

    return {
      c_firstName,
      greet,
      state,
      greetingReactiveState,
    };
  },
  data() {
    return {
      o_firstName: "Bruce",
      o_LastName: "Wayne",
      o_heroName: "Batman",
    };
  },
};
</script>

<style scoped></style>
