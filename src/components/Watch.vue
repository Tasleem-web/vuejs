<template>
  <div>
    <h2>Option Watch API</h2>
    <input type="text" placeholder="Name" v-model="name" />
  </div>
  <div>
    <h2>Composition Watch API</h2>
    <input type="text" placeholder="First Name" v-model="firstName" />
    <input type="text" placeholder="Last Name" v-model="lastName" />
  </div>
  <div>
    <h2>Reactive Watch API</h2>
    <input type="text" placeholder="Reactive First Name" v-model="fName" />
    <input type="text" placeholder="Reactive  Last Name" v-model="lName" />
  </div>
</template>

<script>
import { reactive, ref, toRefs, watch } from "vue";

// Debounce helper function
// function debounce(func, delay) {
//   let timeoutId;
//   return function (...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// }

// Debounce helper function

function debounce(fn, delay = 500) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default {
  name: "WatchComponent",
  data() {
    return {
      name: "",
    };
  },
  watch: {
    name(newVal, oldVal) {
      console.clear();
      console.log(`newVal - ${newVal}`);
      console.log(`oldVal- ${oldVal}`);
    },
  },
  setup() {
    const firstName = ref("");
    const lastName = ref("Tasleem");

    const state = reactive({
      fName: "",
      lName: "",
    });

    // watch(
    //   () => ({ ...state }),
    //   (newValues, oldValues) => {
    //     console.clear();
    //     console.log(` fName old value -`, oldValues.fName);
    //     console.log(` fName new value -`, newValues.fName);
    //     console.log(` lName old value -`, oldValues.lName);
    //     console.log(` lName new value -`, newValues.lName);
    //   }
    // );

    // Debounced watcher for fName
    const debouncedFNameWatch = debounce((newVal, oldVal) => {
      console.log(`fName old value -`, oldVal);
      console.log(`fName new value -`, newVal);
    }, 500); // 500ms delay

    watch(() => state.fName, debouncedFNameWatch);

    watch(
      [firstName, lastName],
      (newValues, oldValues) => {
        console.clear();
        console.log(`firstName newValues - ${newValues[0]}`);
        console.log(`firstName oldValues- ${oldValues[0]}`);
        console.log(`lastName newValues - ${newValues[1]}`);
        console.log(`lastName oldValues- ${oldValues[1]}`);
      },
      {
        immediate: true,
      }
    );

    return {
      firstName,
      lastName,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped></style>
