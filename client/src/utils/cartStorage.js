const CART_KEY = 'cart';

export const getCart = () =>
  JSON.parse(sessionStorage.getItem(CART_KEY)) || [];

export const setCart = (items) =>
  sessionStorage.setItem(CART_KEY, JSON.stringify(items));

export const addToCart = (item) => {
  const cart = getCart();
  setCart([...cart, item]);
}

export const removeFromCart = (id) => {
  const cart = getCart().filter(i => i.id !== id);
  setCart(cart);
}

export const clearCart = () => {
  sessionStorage.removeItem(CART_KEY);
}
