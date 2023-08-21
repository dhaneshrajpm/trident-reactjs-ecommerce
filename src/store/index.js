import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cartSlice";
import ProductSlice from "./productSlice";
import UserSlice from "./userSlice";

export default configureStore({
  reducer: {
    cart: CartSlice,
    product: ProductSlice,
    user: UserSlice,
  }
})