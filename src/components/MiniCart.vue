<template>
  <div
    class="dropdown-menu dropdown-menu-end p-2"
    aria-labelledby="dropdownMenuButton1"
    @click.stop
  >
    <div>
      <div class="d-flex px-2 justify-content-between">
        <div>
          <strong>Product title</strong>
          <br />
          1 x $32
        </div>
        <div>
          <a class="badge bg-secondary text-decoration-none" href="#">remove</a>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between">
        <div>Total : $23</div>
        <div>
          <a href="#">Clear Cart</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniCart",
};
</script>

<style scoped>
.dropdown-menu {
  min-width: 320px;
}
</style>
