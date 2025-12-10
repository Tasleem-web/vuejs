<template>
  <div>
    <!-- The Modal -->
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <h2>This is Popup Modal</h2>
        <span class="close" @click="$emit('close', name)">&times;</span>
        <p>Some text in the Modal..</p>
        <input type="text" v-model="name" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pop-up",
  // emits: ["close"],
  emits: {
    close: (name) => {
      if (!name) return false;
      return true;
    },
  },
  data() {
    return {
      name: "",
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
    };
  },
};
</script>

<style scoped>
/* The Modal (background) */
.modal {
  display: initial !important;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  position: relative;
  border-radius: 4px;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  right: 19px;
  top: 10px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
