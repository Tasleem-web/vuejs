<template>
  <div>
    <input type="text" placeholder="Enter first name" v-model="firstName" />
    <input type="text" placeholder="Enter last name" v-model="lastName" />
  </div>
  <PersonGreeting
    :firstName="firstName"
    :lastName="lastName"
    @callHero="callHero"
  />
</template>

<script>
import { ref } from "vue";
import PersonGreeting from "./PersonGreeting.vue";

export default {
  name: "PersonComponent",
  components: {
    PersonGreeting,
  },
  setup() {
    const firstName = ref("");
    const lastName = ref("");

    function callHero(context) {
      console.log(context);
    }
    return {
      firstName,
      lastName,
      callHero,
    };
  },
};
</script>

<style scoped></style>
