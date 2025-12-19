export const SET_PRODUCTS = (state, products) => {
  state.products = products
}

export const GET_PRODUCT = (state, product) => {
  state.product = product;
}

export const ADD_TO_CART = (state, { product, quantity }) => {
  const itemInCart = state.cart.find(item => item.product.id === product.id);
  if (itemInCart) {
    itemInCart.quantity += quantity;
    return;
  }

  state.cart.push({ product, quantity });
}

export const REMOVE_PRODUCT = (state, productId) => {
  const removedProduct = state.cart.filter(product => product.product.id !== productId);
  state.cart = removedProduct;
}

export const GET_CART_ITEMS = (state, cartItems) => {
  state.cart = cartItems
}