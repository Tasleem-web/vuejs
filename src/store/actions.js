import axios from "axios"

export const getProducts = async ({ commit }) => {
  const response = await axios('http://localhost:3000/products');
  commit("SET_PRODUCTS", response.data)
}

export const getProduct = async ({ commit }, productId) => {
  const response = await axios(`http://localhost:3000/products/${productId}`);
  commit("GET_PRODUCT", response.data);
}

export const addProductToCart = ({ dispatch }, product) => {
  axios.post("http://localhost:3000/cart", {
    product_id: product.product.id,
    quantity: product.quantity
  }).then(() => {
    dispatch('getCartItems');
  })
}

export const removeProduct = ({ commit }, cartItemId) => {
  axios.delete(`http://localhost:3000/cart/${cartItemId}`)
    .then(() => {
      commit("REMOVE_PRODUCT", cartItemId);
    }).catch((err) => {
      console.error(err)
    });
}

export const getCartItems = async ({ commit }) => {
  const response = await axios.get("http://localhost:3000/cart");
  const cartItems = response.data;
  const enrichedCartItems = await Promise.all(
    cartItems.map(async (item) => {
      const productResponse = await axios.get(
        `http://localhost:3000/products/${item.product_id}`
      );
      return {
        id: item.id,
        product: productResponse.data,
        quantity: item.quantity,
      };
    })
  );
  commit("GET_CART_ITEMS", enrichedCartItems);
};

export const clearCartItems = async ({ commit }) => {
  try {
    // 1. Fetch all items from the resource (e.g., 'posts')
    const response = await axios.get('http://localhost:3000/cart');
    const items = response.data;

    // 2. Map through each item and send a DELETE request
    const deletePromises = items.map(item =>
      axios.delete(`http://localhost:3000/cart/${item.id}`)
    );

    // 3. Wait for all requests to finish
    await Promise.all(deletePromises);

    console.log('All items deleted successfully');
    commit("CLEAR_CART_ITEMS")
  } catch (error) {
    console.error('Error deleting items:', error);
  }
}