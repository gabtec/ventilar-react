import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.store';
import orderReducer from './order/order.store';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
  },
});
