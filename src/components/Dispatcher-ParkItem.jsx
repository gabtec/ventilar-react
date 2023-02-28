import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderStoreActions } from '../store/order/order.store';

// function OrdersItem({ order, deliverEvent }) {
function ParkItem({ ventilator, answerEvent }) {
  function editHandler() {
    window.alert('editar pedido');
  }
  return (
    <div className="columns">
      <div className="column is-12">
        {/* <section> */}
        <div className="box has-background-link-light">
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src="https://cdn.bimedis.com/img/vimg/1835150/big" />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>
                    {ventilator.brand} {ventilator.model}
                  </strong>{' '}
                  <small>[{ventilator.serial}]</small> <br />
                  <strong>{ventilator.category}</strong>
                </p>
                <div className="columns">
                  <div className="column is-2">
                    <span
                      className={
                        ventilator.is_free ? 'tag is-success' : 'tag is-warning'
                      }
                    >
                      {ventilator.is_free ? 'disponível' : 'em uso'}
                    </span>
                  </div>
                  {/* <div className="column ">
                <button
                className="button is-small is-outlined is-info is-pulled-right"
                onClick={editHandler}
                >
                Editar
                </button>
              </div> */}
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
        {/* </section> */}
      </div>
    </div>
  );
}

export default ParkItem;
