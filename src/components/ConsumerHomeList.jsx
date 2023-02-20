import { useEffect, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import useSelectedOrder from '../hooks/useSelectedOrder';
import useToken from '../hooks/useToken';

import ListWithoutItems from './ListWithoutItems';
import OrdersItem from './OrdersItem';
import UserWithoutWardNotif from './UserWithoutWardNotif';
import DeliverVentModal from './DeliverVent.modal';

function ConsumerHomeList({ openModalEvent }) {
  const user = useAuthUser();
  const token = useToken();

  const [orders, setOrders] = useState([]);
  // const [isEmpty, setIsEmpty] = useState(true);
  const [refreshPage, setRefreshPage] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);
  const selectedOrder = useSelectedOrder();

  useEffect(() => {
    if (!refreshPage) return;

    getData(user.workplace_id, token).then((resp) => {
      if (resp.error) {
        console.log(resp.error);
        // setIsEmpty(true);
      } else {
        console.log(orders);
        setOrders(resp.data);
        // setIsEmpty(false);
      }
    });

    setRefreshPage(false);
  }, [refreshPage]);

  function refreshListHandler() {
    console.log('requested update');
    setRefreshPage(true);
  }

  function returnVentHandler() {
    setModalIsActive(true);
  }

  function confirmDeliveryHandler() {
    console.log(selectedOrder);
    // console.log('delivery dispatched');
    returnVentilatorToPark(selectedOrder, token)
      .then((resp) => {
        if (resp.error) {
          console.log('sdsadasd');
          console.log(resp.error);
        } else {
          setRefreshPage(true);
          setModalIsActive(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function toggleDeliverVentModal() {
    setModalIsActive((prev) => !prev);
  }

  if (user.workplace == null) {
    return <UserWithoutWardNotif />;
  }

  return (
    <>
      <DeliverVentModal
        isActive={modalIsActive}
        ventilator={selectedOrder?.ventilator || {}}
        closeModalEvent={toggleDeliverVentModal}
        returnVentEvent={confirmDeliveryHandler}
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
              className="button is-success is-pulled-right"
              onClick={openModalEvent}
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
                    deliverEvent={returnVentHandler}
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
async function returnVentilatorToPark(order, token) {
  try {
    const resp = await fetch(`http://localhost:3002/api/orders/${order.id}`, {
      method: 'PATCH',
      // method: 'put',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: order.id,
        status: 'RETURNED',
        obs: order.obs,
        ventilator_id: '' + order.ventilator_id,
      }),
    });

    if (!resp.ok) {
      return foundNothing();
    }

    return foundData(await resp.json());
  } catch (error) {
    console.log(error);
    return foundError(error.message);
  }
}

async function getData(serviceID, token) {
  try {
    const resp = await fetch(
      `http://localhost:3002/api/orders/?src=${serviceID}`,
      {
        method: 'get',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resp.ok) {
      return foundNothing();
    }

    return foundData(await resp.json());
  } catch (error) {
    return foundError(error.message);
  }
}

/**
 * Helper Functions
 */
function myResponse(isEmpty, data = [], error = null) {
  return {
    isEmpty,
    data,
    error,
  };
}
function foundNothing() {
  return myResponse(true);
}
function foundError(error) {
  return myResponse(true, null, error);
}
function foundData(data) {
  return myResponse(false, data, null);
}
