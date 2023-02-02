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
    example(state, action) {
      console.log('dispatch example');
      // we can mutate state here....
      // state.value += action.payload;
    },
    storeAuthData(state, action) {
      // console.log('writting to store');
      // console.log(action.payload); // payload = {user, accessToken, refreshToken}
      state.authUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    clearAuthData(state, action) {
      // console.log('call clear');
      state.authUser = {};
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isLoggedIn = false;
    },
  },
});

// export const { example } = authSlice.actions;
export const authStoreActions = authSlice.actions;
export default authSlice.reducer;
