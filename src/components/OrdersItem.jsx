import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderStoreActions } from '../store/order/order.store';
import OrderStatusTag from './OrderStatus-tag';

function OrdersItem({ order, deliverEvent }) {
  const hasVentilator = order.ventilator ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(props);
  function editHandler() {
    console.log('on editar');
    console.log(order);
    dispatch(orderStoreActions.storeSelectedOrder(order));
    navigate(`/spa/orders/edit/${order.id}`);
  }

  function returnHandler() {
    dispatch(orderStoreActions.storeSelectedOrder(order));
    deliverEvent(order);
  }

  return (
    <div className="box">
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://cdn.bimedis.com/img/vimg/1835150/big" />
            {/* <img src="../assets/trilogy-3000.png" /> */}
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{order.patient_name}</strong>{' '}
              <small>@cama [{order.patient_bed}]</small> <br />
              <strong>{order.category}</strong>
              {!hasVentilator && (
                <small className="is-italic">Aguarda atribuição...</small>
              )}
              {hasVentilator && (
                <>
                  <small className="is-italic">
                    {order.ventilator.brand + ' ' + order.ventilator.model}
                  </small>
                  <br />
                  <small className="is-size-7 is-italic">
                    S/N: {order.ventilator.serial}
                  </small>
                </>
              )}
            </p>
            <div className="columns">
              <div className="column is-2">
                <OrderStatusTag status={order.status}></OrderStatusTag>
                {/* <span className="tag is-warning">{order.status}</span> */}

                {/* {!isPending && (
                  <span className="tag is-success">{order.status}</span>
                )} */}
              </div>
              <div className="column is-offset-6 is-8">
                <button
                  className="button is-small is-outlined is-info mr-2"
                  onClick={editHandler}
                >
                  Editar
                </button>
                <button
                  className="button is-small is-outlined is-info"
                  onClick={returnHandler}
                  disabled={order.status !== 'DISPATCHED'}
                >
                  Devolver
                </button>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10">
                <strong>Observações:</strong>
                <p>{order.obs}</p>
              </div>
            </div>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fas fa-reply"></i>
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fas fa-retweet"></i>
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fas fa-heart"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
}

export default OrdersItem;
