<template>
  <!-- <PostList /> -->
  <div class="tab">
    <button class="tablinks" @click="activeTab = 'postList'">View Post</button>
    <button class="tablinks" @click="activeTab = 'createPost'">
      Create Post
    </button>
  </div>

  <div>
    <keep-alive>
      <component :is="activeTab"></component>
    </keep-alive>
  </div>
</template>

<script>
import PostList from "./components/PostList.vue";
import CreatePost from "./components/CreatePost.vue";

export default {
  name: "App",
  data() {
    return {
      showModal: false,
      activeTab: "postList",
    };
  },
  components: {
    PostList,
    CreatePost,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  -webkit-animation: fadeEffect 1s;
  animation: fadeEffect 1s;
}

/* Fade in tabs */
@-webkit-keyframes fadeEffect {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeEffect {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
