import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    }
  }
})

export const { setCartItems } = productSlice.actions;
export default productSlice.reducer;
