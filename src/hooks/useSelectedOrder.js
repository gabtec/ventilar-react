import { store } from '../store/index.jsx';

function useSelectedOrder() {
  const order = store.getState().order.selectedOrder;
  return order;
}

export default useSelectedOrder;
