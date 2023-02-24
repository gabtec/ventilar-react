import { useEffect, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import useSelectedOrder from '../hooks/useSelectedOrder';
import useToken from '../hooks/useToken';

import ListWithoutItems from './ListWithoutItems';
import OrdersItem from './OrdersItem';
import UserWithoutWardNotif from './UserWithoutWardNotif';
import DeliverVentModal from './DeliverVent.modal';
import api from '../apiConnector/axios';
import { useNavigate } from 'react-router-dom';

function ConsumerHomeList({ openModalEvent }) {
  const user = useAuthUser();
  // const token = useToken();
  const navigate = useNavigate();

  const [modalIsActive, setModalIsActive] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  // const [isEmpty, setIsEmpty] = useState(true);
  // const [refreshPage, setRefreshPage] = useState(false);
  const selectedOrder = useSelectedOrder();

  // const { response, error, loading, refetch } = useAxios({
  //   method: 'get',
  //   url: `/orders/?src=${user.workplace_id}`,
  // });

  useEffect(() => {
    // (async () => {
    //   try {
    //     const resp = await getData(user.workplace_id);
    //     setOrders(resp.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
    getData(user.workplace_id, setOrders, setError);
  }, []);

  useEffect(() => {
    if (!error || error === '') return;

    window.alert(error);
  }, [error]);
  // useEffect(() => {
  //   if (!refreshPage) return;

  //   getData(user.workplace_id, token).then((resp) => {
  //     if (resp.error) {
  //       console.log(resp.error);
  //       // setIsEmpty(true);
  //     } else {
  //       console.log(orders);
  //       setOrders(resp.data);
  //       // setIsEmpty(false);
  //     }
  //   });

  //   setRefreshPage(false);
  // }, [refreshPage]);

  async function refreshListHandler() {
    getData(user.workplace_id, setOrders, setError);
    // console.log('requested update');
    // // setRefreshPage(true);
    // try {
    //   const resp = await getData(user.workplace_id);
    //   console.log(resp.data);
    //   setOrders(resp.data);
    // } catch (error) {
    //   console.error(error);
    //   console.log('resposta falhada do refresh');
    //   navigate('/');
    //   // console.error(error.response.data);
    // }
  }

  function returnVentHandler() {
    setModalIsActive(true);
  }

  function confirmDeliveryHandler() {
    // console.log(selectedOrder);
    // // console.log('delivery dispatched');
    // returnVentilatorToPark(selectedOrder, token)
    //   .then((resp) => {
    //     if (resp.error) {
    //       console.log('sdsadasd');
    //       console.log(resp.error);
    //     } else {
    //       setRefreshPage(true);
    //       setModalIsActive(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    setModalIsActive(false);
    returnVentilatorToPark(selectedOrder, setOrders, setError);
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
              id="btn-add"
              className="button is-success is-pulled-right"
              data-cy="add-order-btn"
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

// async function returnVentilatorToPark(order, token) {
//   try {
//     const resp = await fetch(`http://localhost:3002/api/orders/${order.id}`, {
//       method: 'PATCH',
//       // method: 'put',
//       headers: {
//         authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: order.id,
//         status: 'RETURNED',
//         obs: order.obs,
//         ventilator_id: '' + order.ventilator_id,
//       }),
//     });

//     if (!resp.ok) {
//       return foundNothing();
//     }

//     return foundData(await resp.json());
//   } catch (error) {
//     console.log(error);
//     return foundError(error.message);
//   }
// }

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
