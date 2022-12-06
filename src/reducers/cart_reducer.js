import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, mainColor: color, product } = action.payload;

    const tempItem = state.cart.find((i) => {
      return i.id === id + color;
    });
    if (tempItem) {
      const tempcart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = (cartItem.amount += amount);
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          } else {
            return { ...cartItem, amount: newAmount };
          }
        } else {
          return { ...cartItem };
        }
        return { ...cartItem };
      });
      return { ...state, cart: tempcart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  if (action.type === COUNT_CART_TOTALS) {
    let { totalItems, totalAmount } = state.cart.reduce(
      (total, item) => {
        total.totalItems += item.amount;
        total.totalAmount += item.price * item.amount;
        return total;
      },
      { totalItems: 0, totalAmount: 0 }
    );
    return { ...state, totalItems, totalAmount };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE_CART_ITEM) {
    let tempCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload
    );

    return { ...state, cart: tempCart };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    let tempCart = state.cart.map((itemCart) => {
      if (itemCart.id === id) {
        if (value === "inc") {
          console.log("inc");
          let newAmount = itemCart.amount + 1;
          if (newAmount > itemCart.max) {
            newAmount = itemCart.max;
          }
          return { ...itemCart, amount: newAmount };
        } else if (value === "dec") {
          let newAmount = itemCart.amount - 1;

          if (newAmount <= 1) {
            newAmount = 1;
          }
          return { ...itemCart, amount: newAmount };
        }
      }
      return itemCart;
    });
    return { ...state, cart: tempCart };
  }
};
export default cart_reducer;
