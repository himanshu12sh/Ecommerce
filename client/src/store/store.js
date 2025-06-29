import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"; 
import adminProductReducer from "./admin/product-slice"
const store = configureStore({
  reducer: {
    auth: authReducer,
     adminProduct: adminProductReducer,
  },
});

export default store;
