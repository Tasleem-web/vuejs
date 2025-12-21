import Api from "./Api";
const END_POINT = 'products';

export default {
  all() {
    return Api.get(END_POINT)
  },
  find(productId) {
    return Api.get(`${END_POINT}/${productId}`)
  }

}