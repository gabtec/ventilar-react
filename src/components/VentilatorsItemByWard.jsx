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
      <div className="columns">
        <div className="column is-one-third">
          <span>
            <strong>{ventilator.wardName}</strong>
          </span>
        </div>
        <div className="column is-one-third">
          <span className="tag is-primary">
            <span className="is-size-4 mr-2">{ventilator.ventsAvailable}</span>{' '}
            disponíveis
          </span>
        </div>
        <div className="column is-offset-1 is-one-third">
          <button
            className="button is-outlined is-info is-small"
            onClick={selectParkHandler}
          >
            <box-icon color="blue" name="list-check" />
            <span className="ml-2 is-small">Requisitar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VentilatorsItemByWard;
