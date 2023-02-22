import { useEffect, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import useToken from '../hooks/useToken';

import ListWithoutItems from './ListWithoutItems';
import UserWithoutWardNotif from './UserWithoutWardNotif';
import DispatcherOrdersItem from './Dispatcher-OrdersItem';
import DispatcherParkItem from './Dispatcher-ParkItem';
import DispatcherDispacthModal from './Dispatcher-Dispatch.modal';

function DispatcherHomeList() {
  const user = useAuthUser();
  const token = useToken();

  const [orders, setOrders] = useState([]);
  const [ventilators, setVentilators] = useState([]);
  const [availableVents, setAvailableVents] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);

  // function toggleDeliverVentModal() {
  //   setModalIsActive((prev) => !prev);
  // }

  function answerHandler(orderID) {
    console.log(orderID);
    setSelectedOrder(orderID);
    setAvailableVents(() => {
      return ventilators.filter((item) => item.is_available);
    });
    setModalIsActive((prev) => !prev);
  }

  async function acceptHandler(order) {
    console.log('accept ' + order);
    setSelectedOrder(order.id);
    await dispatchVentilatorRequest(
      {
        orderID: order.id,
        ventilator_id: '' + order.ventilator_id,
        // obs: obs,
        status: 'CLOSED',
      },
      token
    );
    setRefreshPage(true);
  }

  function closeModalHandler() {
    setModalIsActive((prev) => !prev);
  }

  async function saveModalHandler(ventID, obs) {
    console.log(
      `on save: orderID:${selectedOrder}, ventID: ${ventID}, obs: ${obs}`
    );
    await dispatchVentilatorRequest(
      {
        orderID: selectedOrder,
        ventilator_id: ventID,
        obs: obs,
        status: 'DISPATCHED',
      },
      token
    );
    setModalIsActive(false);
    setRefreshPage(true);
  }

  useEffect(() => {
    if (!refreshPage) return;

    getData(user.workplace_id, token).then((resp) => {
      if (resp.error) {
        console.log(resp.error);
      } else {
        setOrders(resp.data);
      }
    });

    getVentilators(user.workplace_id, token).then((resp) => {
      if (resp.error) {
        console.log(resp.error);
      } else {
        setVentilators(resp.data);
      }
    });
    setRefreshPage(false);
  }, [refreshPage]);

  function refreshListHandler() {
    console.log('will refresh');
    getData(user.workplace_id, token);
    setRefreshPage(true);
  }

  if (user.workplace == null) {
    return <UserWithoutWardNotif />;
  }

  return (
    <>
      <DispatcherDispacthModal
        isActive={modalIsActive}
        ventilators={availableVents}
        closeEvent={closeModalHandler}
        saveEvent={saveModalHandler}
      ></DispatcherDispacthModal>
      <div className="container">
        {/* btn actions group */}
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <button
              className="button is-success is-pulled-right mr-2"
              onClick={refreshListHandler}
            >
              <box-icon color="white" name="refresh" />
            </button>
          </div>
        </div>
        {/* lists */}
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
            <section>{orders.length === 0 && <ListWithoutItems />}</section>
            <section>
              {orders.length !== 0 &&
                orders.map((item) => (
                  <DispatcherOrdersItem
                    key={item.id}
                    order={item}
                    answerEvent={answerHandler}
                    acceptEvent={acceptHandler}
                  />
                ))}
            </section>
          </div>
        </div>

        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="title">
              Lista de Ventiladores:
              <span className="is-italic is-size-5 ml-2">
                [{user.workplace || ''}]
              </span>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-10 is-offset-1">
            <section>
              {ventilators.length === 0 && <ListWithoutItems />}
            </section>
            <section>
              {ventilators.length !== 0 &&
                ventilators.map((item) => (
                  <DispatcherParkItem key={item.id} ventilator={item} />
                ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default DispatcherHomeList;

async function getData(serviceID, token) {
  try {
    const resp = await fetch(
      `http://localhost:3002/api/orders/?dest=${serviceID}`,
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

// data { orderID, ventilatorID, obs }
async function dispatchVentilatorRequest(data, token) {
  try {
    const resp = await fetch(
      `http://localhost:3002/api/orders/${data.orderID}`,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

async function getVentilators(serviceID, token) {
  try {
    const resp = await fetch(
      `http://localhost:3002/api/ventilators/?parkId=${serviceID}`,
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
