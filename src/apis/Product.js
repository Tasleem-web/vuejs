import Api from "./Api";
const END_POINT = 'products';

export default {
  all() {
    return Api.get(END_POINT)
  },
  find(productId) {
    console.log("Fetching product with ID:", productId);
    return Api.get(`${END_POINT}/${productId}`)
  }

}