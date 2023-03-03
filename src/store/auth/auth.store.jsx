import { createSlice } from '@reduxjs/toolkit';

const state = {
  authUser: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'authStore',
  initialState: state,
  reducers: {
    storeAuthData(state, action) {
      state.authUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    clearAuthData(state, action) {
      state.authUser = {};
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isLoggedIn = false;
    },
  },
});

// export const { storeAuthData, clearAuthData } = authSlice.actions;
export const authStoreActions = authSlice.actions;
export default authSlice.reducer;
