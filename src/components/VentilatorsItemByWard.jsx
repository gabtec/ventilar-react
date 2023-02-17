import { useNavigate } from 'react-router-dom';
import { store } from '../store';

import { useDispatch } from 'react-redux';
import { orderStoreActions } from '../store/order/order.store';

function VentilatorsItemByWard({ ventilator }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function selectParkHandler() {
    dispatch(orderStoreActions.storeSelectedPark(ventilator));
    navigate(`/spa/orders/create/${ventilator.ventCategory}`);
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
            <div className="columns">
              <div className="column is-12">
                <p>
                  <strong>{ventilator.wardName}</strong>{' '}
                </p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-12">
                <p>
                  <span>Available: {ventilator.ventsAvailable}</span>
                </p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-9 is-2">
                <button
                  className="button is-outlined is-info"
                  onClick={selectParkHandler}
                >
                  <box-icon color="blue" name="list-check" />
                  <span className="ml-2">Requisitar</span>
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

export default VentilatorsItemByWard;
