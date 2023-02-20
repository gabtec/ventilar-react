import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderStoreActions } from '../store/order/order.store';

// function OrdersItem({ order, deliverEvent }) {
function OrdersItem({ order, answerEvent, acceptEvent }) {
  const hasVentilator = order.ventilator ? true : false;
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  function editHandler() {
    window.alert('TODO: editHandler');
    // console.log('on editar');
    // console.log(order);
    // dispatch(orderStoreActions.storeSelectedOrder(order));
    // navigate(`/spa/orders/edit/${order.id}`);
  }

  function respondHandler() {
    answerEvent(order.id);
  }

  function acceptHandler() {
    acceptEvent(order);
  }

  return (
    <div className="box">
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://cdn.bimedis.com/img/vimg/1835150/big" />
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
                <span className="tag is-warning">{order.status}</span>

                {/* {!isPending && (
                  <span className="tag is-success">{order.status}</span>
                )} */}
              </div>
              <div className="column">
                <div className="buttons is-right">
                  <button
                    className="button is-small is-outlined is-info mr-2"
                    onClick={editHandler}
                  >
                    Editar
                  </button>
                  <button
                    className="button is-small is-outlined is-info"
                    onClick={respondHandler}
                    disabled={order.status !== 'PENDING'}
                  >
                    Responder
                  </button>
                  <button
                    className="button is-small is-outlined is-info"
                    onClick={acceptHandler}
                    disabled={order.status !== 'RETURNED'}
                  >
                    Receber
                  </button>
                </div>
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
