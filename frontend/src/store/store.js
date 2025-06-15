import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductsSlice from './admin/products-slice';
import adminOrderSlice from "./admin/order-slice"

import shopProductsSlice from "./shop/products-slice"
import shopCartSlice from './shop/cart-slice/index'
import shopReviewSlice from './shop/review-slice';
import shopOrderSlice from './shop/order-slice'
import shopAddressSlice from './shop/address-slice'
import shopSearchSlice from './shop/search-slice'
import commonFeatureSlice from "./common-slice"
const store =configureStore({
        reducer:{
            auth:authReducer,
            adminProducts: AdminProductsSlice,
             adminOrder: adminOrderSlice,

            shopProducts: shopProductsSlice,
            shopCart: shopCartSlice,
            shopReview: shopReviewSlice,
            shopOrder: shopOrderSlice,
            shopAddress: shopAddressSlice,
            shopSearch: shopSearchSlice,
            commonFeature: commonFeatureSlice,
        }
    }
)

export default store;