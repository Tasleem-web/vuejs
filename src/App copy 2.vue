<template>
  <!-- <div>
    <Card />
    <Card> Card content </Card>
    <Card>
      <h2>Card content</h2>
    </Card>

    <Card> <img src="https://picsum.photos/200" loading="lazy" /> </Card>
  </div> -->

  <!-- <div>
    <Card>
      <template v-slot:header>
        <h3>Header</h3>
      </template>
      <template v-slot:default>
        <img src="https://picsum.photos/200" />
      </template>
      <template v-slot:footer>
        <button>Default</button>
      </template>
    </Card>
  </div> -->
  <NameList>
    <template v-slot:default="slotProps">
      {{ slotProps.firstName }} {{ slotProps.lastName }}
    </template>
  </NameList>

  <hr />

  <NameList>
    <template v-slot:default="slotProps">
      {{ slotProps.firstName }}
    </template>
  </NameList>

  <hr />

  <NameList>
    <template v-slot:default="slotProps">
      {{ slotProps.lastName }}
    </template>
  </NameList>
</template>

<script>
import NameList from "./components/NameList.vue";
// import Card from "./components/Card.vue";

export default {
  name: "App",
  components: {
    // Card,
    NameList,
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
