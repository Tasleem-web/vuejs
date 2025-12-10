<template>
  <input type="text" v-model="movie" />
  <div>
    <input type="text" v-model.lazy="movieInfo.title" />
    <input type="text" v-model.lazy="movieInfo.actor" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      firstName: "M",
      lastName: "Tasleem",
      items: [
        {
          id: 1,
          title: "TV",
          price: 100,
        },
        {
          id: 2,
          title: "Phone",
          price: 200,
        },
        {
          id: 3,
          title: "Laptop",
          price: 300,
        },
      ],
      country: "",
      movie: "test",
      movieInfo: {
        title: "",
        actor: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Form submitted with values:", this.formValues);
    },
    getTotal() {
      console.log("get total");
      return this.items.reduce(
        (total, curr) => (total = total + curr.price),
        0
      );
    },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    total() {
      console.log("total computed");
      return this.items.reduce(
        (total, curr) => (total = total + curr.price),
        0
      );
    },
    expensiveItem() {
      console.log("total computed");

      return this.items.filter((item) => item.price > 100);
    },
  },
  watch: {
    movie: {
      handler(newValue) {
        console.log(`API Calling = ${newValue}`);
      },
      immediate: true,
    },
    movieInfo: {
      handler(newValue) {
        console.log(
          `Watching api calls for movie info = ${newValue.title} - ${newValue.actor}`
        );
      },
      deep: true,
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
