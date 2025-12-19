import axios from "axios"

export const getProducts = async ({ commit }) => {
  const response = await axios('http://localhost:3000/products');
  commit("SET_PRODUCTS", response.data)
}

export const getProduct = async ({ commit }, productId) => {
  const response = await axios(`http://localhost:3000/products/${productId}`);
  commit("GET_PRODUCT", response.data);
}

export const addToCart = async ({ commit }, product) => {
  commit("ADD_TO_CART", product);
  axios.post("http://localhost:3000/cart", {
    product_id: product.product.id,
    quantity: product.quantity
  })
}

export const removeProduct = ({ commit }, productId) => {
  commit("REMOVE_PRODUCT", productId);
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
        product: productResponse.data,
        quantity: item.quantity,
      };
    })
  );
  commit("GET_CART_ITEMS", enrichedCartItems);
};