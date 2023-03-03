import { useEffect, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';

import ListWithoutItems from './ListWithoutItems';
import UserWithoutWardNotif from './UserWithoutWardNotif';
import DispatcherOrdersItem from './Dispatcher-OrdersItem';
import DispatcherParkItem from './Dispatcher-ParkItem';
import DispatcherDispacthModal from './Dispatcher-Dispatch.modal';
import DispatcherReceiveVentilatorModal from './Dispatcher-receive-ventilator.modal';
import api from '../apiConnector/axios';

function DispatcherHomeList() {
  const user = useAuthUser();

  const [orders, setOrders] = useState([]);
  const [ventilators, setVentilators] = useState([]);
  const [availableVents, setAvailableVents] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [activateReceiveVentModal, setActivateReceiveVentModal] =
    useState(false);
  const [error, setError] = useState('');

  function refreshListHandler() {
    getOrders(user.workplace_id, setOrders, setError);
    getVentilators(user.workplace_id, setVentilators, setError);
  }

  // on 1st render
  useEffect(() => {
    refreshListHandler();
  }, []);

  async function answerHandler(orderID) {
    setSelectedOrder(orderID);

    const resp = await api.get(`/wards/${user.workplace_id}/ventilators`);

    setAvailableVents(resp.data[0].ventilators);

    setModalIsActive((prev) => !prev); // TODO: remane to setOpenModal
  }

  function closeModalHandler() {
    setModalIsActive((prev) => !prev);
  }

  async function saveModalHandler(ventID, obs) {
    try {
      const resp = await api.patch(`/orders/${selectedOrder}`, {
        id: selectedOrder,
        ventilator_id: ventID,
        obs,
        action: 'DISPATCH',
      });

      setModalIsActive(false);
      refreshListHandler();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  function handleCloseReceiveVentModal() {
    setActivateReceiveVentModal(false);
  }

  async function handleReceiveVentilator(order) {
    // will open a modal
    setSelectedOrder(order);
    setActivateReceiveVentModal(true);
  }

  async function handleSaveReceiveVentModal(vent, obs) {
    console.log(vent);
    console.log(obs);
    try {
      const resp = await api.patch(`/orders/${selectedOrder.id}`, {
        action: 'RECEIVE',
        obs,
      });

      console.log(resp.data);

      setActivateReceiveVentModal(false);
      refreshListHandler();
      return;
    } catch (error) {
      console.log('on catch');
      console.log(error);
    }
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
      <DispatcherReceiveVentilatorModal
        isActive={activateReceiveVentModal}
        ventilator={selectedOrder?.ventilator || {}}
        closeModalEvent={handleCloseReceiveVentModal}
        receiveVentEvent={handleSaveReceiveVentModal}
      ></DispatcherReceiveVentilatorModal>
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
            <div className="columns">
              <div className="column is-12">
                <section>{orders.length === 0 && <ListWithoutItems />}</section>
              </div>
            </div>
            <div className="columns">
              <div className="column is-12">
                {/* <section> */}
                {orders.length !== 0 &&
                  orders.map((item) => (
                    <DispatcherOrdersItem
                      key={item.id}
                      order={item}
                      answerEvent={answerHandler}
                      receiveEvent={handleReceiveVentilator}
                    />
                  ))}
                {/* </section> */}
              </div>
            </div>
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

async function getOrders(serviceID, setResult, setError) {
  try {
    const resp = await api.get(`/orders/?dest=${serviceID}`);

    setResult(resp.data);
  } catch (error) {
    console.log(error);
    setError(error.message);
  }
}

async function getVentilators(serviceID, setResult, setError) {
  try {
    const resp = await api.get(`/wards/${serviceID}/ventilators`);
    setResult(resp.data[0].ventilators);
  } catch (error) {
    setError(error.message);
  }
}
