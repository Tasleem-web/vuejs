import { ref } from "vue";

export default function useCounter(initialCount = 0, stepSize = 1) {

  const count = ref(initialCount);


  function incrementCounter() {
    count.value += stepSize;
  }

  return {
    count,
    incrementCounter
  }
}