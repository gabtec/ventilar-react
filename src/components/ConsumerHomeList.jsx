import { useEffect, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import useSelectedOrder from '../hooks/useSelectedOrder';
import useToken from '../hooks/useToken';

import ListWithoutItems from './ListWithoutItems';
import OrdersItem from './OrdersItem';
import UserWithoutWardNotif from './UserWithoutWardNotif';
import SelectVentCatModal from './SelectVentCat.modal';
import DeliverVentModal from './DeliverVent.modal';
import api from '../apiConnector/axios';
import { useNavigate } from 'react-router-dom';

function ConsumerHomeList() {
  const user = useAuthUser();
  // const token = useToken();
  const navigate = useNavigate();

  const [modalIsActive, setModalIsActive] = useState(false);
  const [selectCatDialogIsOpen, setSelectCatDialogIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const selectedOrder = useSelectedOrder();

  // on 1st render
  useEffect(() => {
    getData(user.workplace_id, setOrders, setError);
  }, []);

  // listen for errors
  useEffect(() => {
    if (!error || error === '') return;

    window.alert(error);
    // TODO: replace by toast notification
  }, [error]);

  function refreshListHandler() {
    getData(user.workplace_id, setOrders, setError);
  }

  function openReturnVentilatorDialogHandler() {
    setModalIsActive(true);
  }

  function confirmReturnVentilatorHandler() {
    setModalIsActive(false);
    returnVentilatorToPark(selectedOrder, setOrders, setError);
  }

  function toggleReturnVentilatorDialog() {
    setModalIsActive((prev) => !prev);
  }

  function toggleSelectVentilatorDialog() {
    setSelectCatDialogIsOpen((prev) => !prev);
  }

  if (user.workplace == null) {
    return <UserWithoutWardNotif />;
  }

  return (
    <>
      <SelectVentCatModal
        isActive={selectCatDialogIsOpen}
        closeModalEvent={toggleSelectVentilatorDialog}
      />
      <DeliverVentModal
        isActive={modalIsActive}
        ventilator={selectedOrder?.ventilator || {}}
        closeModalEvent={toggleReturnVentilatorDialog}
        returnVentEvent={confirmReturnVentilatorHandler}
      ></DeliverVentModal>
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="title">
              Lista de Requisições:
              <span className="is-italic is-size-5 ml-2">
                [{user.workplace || ''}]
              </span>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <button
              id="btn-add"
              className="button is-success is-pulled-right"
              data-cy="add-order-btn"
              onClick={toggleSelectVentilatorDialog}
              // onClick={openModalEvent}
            >
              <box-icon color="white" name="plus-circle" />{' '}
              <span className="ml-2">Adicionar</span>
            </button>
            <button
              className="button is-success is-pulled-right mr-2"
              onClick={refreshListHandler}
            >
              <box-icon color="white" name="refresh" />
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <section>{orders.length === 0 && <ListWithoutItems />}</section>
            <section>
              {orders.length !== 0 &&
                orders.map((item) => (
                  <OrdersItem
                    key={item.id}
                    order={item}
                    deliverEvent={openReturnVentilatorDialogHandler}
                  />
                ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConsumerHomeList;

/**
 * Helper functions
 */
async function returnVentilatorToPark(order, setResult, setError) {
  try {
    const resp = await api.patch(`/orders/${order.id}`, {
      id: order.id,
      status: 'RETURNED',
      obs: order.obs,
      ventilator_id: '' + order.ventilator_id,
    });
    console.log(resp.data);
    // setResult(resp.data);
    getData(order.from_id, setResult, setError);
  } catch (error) {
    console.log(error);
    setError(error.message);
  }
}

async function getData(serviceID, setResult, setError) {
  try {
    const resp = await api.get(`/orders/?src=${serviceID}`);
    console.log(resp.data);
    setResult(resp.data);
  } catch (error) {
    console.log(error);
    setError(error.message);
  }
}

// function myResponse(isEmpty, data = [], error = null) {
//   return {
//     isEmpty,
//     data,
//     error,
//   };
// }
// function foundNothing() {
//   return myResponse(true);
// }
// function foundError(error) {
//   return myResponse(true, null, error);
// }
// function foundData(data) {
//   return myResponse(false, data, null);
// }
