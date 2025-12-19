<template>
  <div
    class="dropdown-menu dropdown-menu-end p-2"
    aria-labelledby="dropdownMenuButton1"
    @click.stop
  >
    <div v-for="product in cart" :key="product.product.id">
      <div class="d-flex px-2 justify-content-between">
        <div>
          <strong>{{ product.product.title }}</strong>
          <br />
          {{ product.quantity }} x ${{ product.product.price }}
        </div>
        <div>
          <a
            class="badge bg-secondary text-decoration-none"
            href="#"
            @click="removeProduct(product)"
            >remove</a
          >
        </div>
      </div>
      <hr />
    </div>
    <div class="d-flex justify-content-between">
      <div>Total : ${{ totalItemCost }}</div>
      <div>
        <a href="#">Clear Cart</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniCart",
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalItemCost() {
      return this.cart.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
      }, 0).toFixed(2);
    },
  },
  methods: {
    removeProduct(product) {
      this.$store.dispatch("removeProduct", product.product.id);
    },
  },
  mounted() {
    this.$store.dispatch("getCartItems");
  },
};
</script>

<style scoped>
.dropdown-menu {
  min-width: 320px;
}
</style>
