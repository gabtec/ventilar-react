import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.store';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
