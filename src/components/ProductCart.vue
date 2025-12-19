<template>
  <div class="col-3">
    <div class="card h-100 text-left">
      <img :src="product.image" class="card-img-top w-100" alt="..." />
      <div class="card-body">
        <h5 class="card-title">
          <router-link :to="{ name: 'product', params: { id: product.id } }"
            >{{ product.title }}
          </router-link>
        </h5>
        <strong>${{ product.price }}</strong>
        <p class="card-text">{{ product.description }}</p>
      </div>
      <div class="px-3 pb-3">
        <button class="btn btn-secondary">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCart",
  props: ["product"],
};
</script>

<style scoped></style>
