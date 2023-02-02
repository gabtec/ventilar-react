import { createSlice } from '@reduxjs/toolkit';

const state = {
  selectedPark: null,
  selectedOrder: null,
};

export const orderSlice = createSlice({
  name: 'orderStore',
  initialState: state,
  reducers: {
    storeSelectedPark(state, action) {
      // console.log('writting to store');
      console.log(action.payload);
      state.selectedPark = action.payload;
    },
    clearOrderData(state, action) {
      // console.log('call clear');
      state.selectedPark = null;
    },
    storeSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder(state, action) {
      // console.log('call clear');
      state.selectedOrder = null;
    },
  },
});

export const orderStoreActions = orderSlice.actions;
export default orderSlice.reducer;
