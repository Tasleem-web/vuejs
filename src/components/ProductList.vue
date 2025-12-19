<template>
  <div class="row g-3 mt-3">
    <ProductCart
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCart from "./ProductCart.vue";
export default {
  name: "ProductList",
  components: {
    ProductCart,
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style scoped></style>
