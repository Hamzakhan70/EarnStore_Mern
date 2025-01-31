import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopSearchSlice from "./shop/search-slice/";
import shopAddressSlice from "./shop/address-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";
import shopOrderSlice from "./shop/order-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopSearch: shopSearchSlice,
    shopAddress: shopAddressSlice,
    shopReview: shopReviewSlice,
    shopOrder: shopOrderSlice,
    commonFeature: commonFeatureSlice,
  },
});
export default store;
