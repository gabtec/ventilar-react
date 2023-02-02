import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderStoreActions } from '../store/order/order.store';

function VentilatorsItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(props);
  function editHandler() {
    console.log('on editar');
    console.log(props);
    dispatch(orderStoreActions.storeSelectedOrder(props.order));
    navigate(`/spa/orders/new/${ventilator.ventCategory}`);
  }

  function returnHandler() {
    console.log('on devolver');
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
              <strong>{props.ventilator.patient_name}</strong>{' '}
              <small>@cama [{props.ventilator.patient_bed}]</small> <br />
              <strong>{props.ventilator.category}</strong>
              <small>
                {/* {props.ventilator.brand + ' ' + props.ventilator.model} */}
                {'Philips' + ' ' + 'Trilogy 3000'}
              </small>
            </p>
            <div className="columns">
              <div className="column is-2">
                <button className="button is-small is-outlined is-warning">
                  <strong>Status: </strong>
                  {props.ventilator.status}
                </button>
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
                >
                  Devolver
                </button>
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

export default VentilatorsItem;
