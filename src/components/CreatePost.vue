<template>
  <div>
    <form @submit.prevent="createPost">
      <div>
        <label for="userId">User Id: </label>
        <input
          type="text"
          id="userId"
          v-model="formData.userId"
          ref="inputRefs"
        />
      </div>
      <div>
        <label for="title">Title: </label>
        <input type="text" id="title" v-model="formData.title" />
      </div>
      <div>
        <label for="body">Body: </label>
        <input type="text" id="body" v-model="formData.body" />
      </div>
      <div>
        <button type="submit">Create post</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreatePost",
  data() {
    return {
      formData: {
        userId: "",
        title: "",
        body: "",
      },
    };
  },
  mounted() {
    this.$refs.inputRefs.focus();
  },
  methods: {
    async createPost() {
      console.log(this.formData);
      try {
        const resp = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          this.formData
        );
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
