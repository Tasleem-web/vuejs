<template>
  <h3 v-if="errorMsg">{{ errorMsg }}</h3>
  <div v-for="(post, index) in posts" :key="index">
    <h3>{{ post.id }} - {{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <hr />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostList",
  data() {
    return {
      posts: [],
      errorMsg: "",
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        const resp = await axios("https://jsonplaceholder.typicode.com/posts");
        console.log(resp.data);
        this.posts = resp.data;
      } catch (error) {
        console.error(error);
        this.errorMsg = "Error while fetching data!";
      }
    },
  },
};
</script>

<style scoped></style>
