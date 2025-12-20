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
import { mapActions, mapState } from "vuex";
import ProductCart from "./ProductCart.vue";
export default {
  name: "ProductList",
  components: {
    ProductCart,
  },
  computed: {
    ...mapState(["products"]),
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts"]),
  },
};
</script>

<style scoped></style>
