import axios from "axios"

export const getProducts = async ({ commit }) => {
  const response = await axios('http://localhost:3000/products');
  commit("SET_PRODUCTS", response.data)
}

export const getProduct = async ({ commit }, productId) => {
  const response = await axios(`http://localhost:3000/products/${productId}`);
  commit("GET_PRODUCT", response.data);
}