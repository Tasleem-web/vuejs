export const SET_PRODUCTS = (state, products) => {
  state.products = products
}

export const GET_PRODUCT = (state, product) => {
  console.log(state)

  state.product = product;
}
