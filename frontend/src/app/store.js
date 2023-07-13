import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAuthApi } from '../services/userAuthApi';
import { productApi } from '../services/productServiceApi';
import authSlice from '../features/authSlice';
import { cartApi } from '../services/cartServiceApi';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAuthApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware),
});

setupListeners(store.dispatch);
