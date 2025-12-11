<template>
  <div>
    <div>Option API</div>
    <input type="text" placeholder="First name" v-model="fName" />
    <input type="text" placeholder="Last name" v-model="lName" />
    <h2>Option Full Name - {{ fullName }}</h2>
  </div>

  <div>
    <div>Composition API</div>
    <input type="text" placeholder="First name" v-model="refFirstName" />
    <input type="text" placeholder="Last name" v-model="refLastName" />
    <h2>Composition Full Name - {{ refHeroName }}</h2>
  </div>

  <div>
    <div>Reactive API</div>
    <input type="text" placeholder="First name" v-model="reactFirstName" />
    <input type="text" placeholder="Last name" v-model="reactLastName" />
    <h2>Reactive Full Name - {{ reactHeroName }}</h2>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
export default {
  name: "VModel",
  data() {
    return {
      fName: "",
      lName: "",
    };
  },
  computed: {
    fullName() {
      return `${this.fName} ${this.lName}`;
    },
  },
  setup() {
    const refFirstName = ref("");
    const refLastName = ref("");

    const refHeroName = computed(function () {
      return `${refFirstName.value} ${refLastName.value}`;
    });

    const state = reactive({
      reactFirstName: "",
      reactLastName: "",
    });

    const reactHeroName = computed(function () {
      return `${state.reactFirstName} ${state.reactLastName}`;
    });

    return {
      refFirstName,
      refLastName,
      refHeroName,
      ...toRefs(state),
      reactHeroName,
    };
  },
};
</script>

<style scoped></style>
