<template>
  <!-- <div>
    <Greet name="Tasleem" :items="items" />
    <Greet name="M" :items="items" />
    <Greet name="Ummer Rubab" :items="items" />
  </div> -->
  <!-- <Article id="article-id" title="123" name="New Article" class="test123" /> -->
  <!-- <input type="text" v-model="state.username" /> -->
  <!-- <button class="btn btn-primary" @click="showModal = true">Open Modal</button>
  <Popup v-show="showModal" @close="closePopup" /> -->
  <!-- <ComponentC /> -->

  <div class="container">
    <Input
      :name="'Email'"
      placeholder="Enter email"
      id="email"
      v-model="email"
      :required="true"
    />

    <Input
      :name="'Password'"
      placeholder="Enter password"
      id="password"
      v-model="password"
      :required="false"
    />
  </div>
</template>

<script>
// import ComponentC from "./components/ComponentC.vue";
// import Article from "./components/Article.vue";
// import Popup from "./components/Popup.vue";
import Input from "./components/Input.vue";

export default {
  name: "App",
  data() {
    return {
      state: {
        username: "test",
      },
      email: "",
      password: "",
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
      showModal: false,
    };
  },
  components: {
    // Greet,
    // Article,
    // ComponentC,
    // Popup,
    Input,
  },
  provide() {
    return {
      usersName: this.state,
    };
  },
  methods: {
    closePopup(value) {
      console.log(value);
      this.showModal = false;
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
