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
      state.selectedPark = action.payload;
    },
    clearOrderData(state, action) {
      state.selectedPark = null;
    },
    storeSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder(state, action) {
      state.selectedOrder = null;
    },
  },
});

export const orderStoreActions = orderSlice.actions;
export default orderSlice.reducer;
