import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  isCartOpen: false,
  user: null,
  token: null,
  cart: [],
  // cart: [{id, count, price}]
  items: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = state.isCartOpen === true ? false : true;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const existingCartItem = state.cart.find((cartItem) => cartItem._id === action.payload.item._id);
      if (existingCartItem) {
        const newCart = state.cart.map((cartItem) => (cartItem._id === action.payload.item._id ? { ...cartItem, count: cartItem.count + action.payload.item.count } : cartItem));
        state.cart = [...newCart];
        return;
      }
      state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
  },
});

export const { setMode, setLogin, setLogout, setItems, addToCart, removeFromCart, increaseCount, decreaseCount, setIsCartOpen } = authSlice.actions;
export default authSlice.reducer;
