import { ref } from "vue";

export default function useFetch(url) {
  //data
  const data = ref(null);
  //loading
  const loading = ref(true);
  //error
  const error = ref(null);

  // function fetchData
  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("Error while fetching...");
      data.value = await resp.json();
    } catch (err) {
      error.value = err.message;
    }
    finally {
      loading.value = false;
    }
  }

  fetchData();

  return {
    data,
    loading,
    error,
    fetchData
  }
}