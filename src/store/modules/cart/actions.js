import Cart from "@/apis/Cart";

export const addProductToCart = async ({ commit }, { product, quantity }) => {
  try {
    // load current cart from API
    const res = await Cart.getCartItems();
    const cartItems = res.data || [];

    // try to find existing item by product id
    const existing = cartItems.find(
      (it) => (it.product && it.product.id === product.id) || it.productId === product.id
    );

    if (existing) {
      const newQuantity = (existing.quantity || 0) + quantity;

      // prefer an explicit update method if available, fall back to addToCart (upsert)
      if (typeof Cart.updateCartItem === "function") {
        await Cart.updateCartItem(existing.id, { quantity: newQuantity });
      } else {
        await Cart.addToCart({
          productId: product.id,
          product,
          quantity: newQuantity,
          id: existing.id
        });
      }
    } else {
      await Cart.addToCart({
        productId: product.id,
        product,
        quantity
      });
    }

    const updated = await Cart.getCartItems();
    commit("GET_CART_ITEMS", updated.data);
  } catch (err) {
    console.error(err);
  }
}

export const removeProduct = ({ commit }, cartItem) => {
  Cart.deleteFromCart(cartItem.id);
  commit("REMOVE_PRODUCT", cartItem.id);
}

export const getCartItems = async ({ commit }) => {
  Cart.getCartItems().then((result) => {
    commit("GET_CART_ITEMS", result.data);
  }).catch((err) => {
    console.error(err);
  });
};

export const clearCartItems = ({ commit }, cartItems) => {
  Cart.deleteAllFromCart(cartItems)
  commit("CLEAR_CART_ITEMS", [])
}