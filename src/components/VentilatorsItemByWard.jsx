import { useNavigate } from 'react-router-dom';
import { store } from '../store';

import { useDispatch } from 'react-redux';
import { orderStoreActions } from '../store/order/order.store';

function VentilatorsItemByWard({ ventilator }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function selectParkHandler() {
    dispatch(orderStoreActions.storeSelectedPark(ventilator));
    navigate(`/spa/orders/new/${ventilator.ventCategory}`);
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
              <strong>{ventilator.wardName}</strong>{' '}
              <span>Available: {ventilator.ventsAvailable}</span>
            </p>
            <p className="is-pulled-right">
              <button
                className="button is-small is-outlined is-info"
                onClick={selectParkHandler}
              >
                Requisitar
              </button>
              {/* <Link
                to={`/spa/orders/new/${ventilator.ventCategory}_${ventilator.wardID}`}
                className="button is-small is-outlined is-info"
              >
                Requisitar
              </Link> */}
            </p>
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
