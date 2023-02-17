function VentilatorsItem({ ventilator }) {
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
              <strong>{ventilator.brand}</strong>{' '}
              <span>{ventilator.model}</span>
              <span>
                {' '}
                <strong>---{'>'}</strong> Localização: {ventilator.park.name}
              </span>
            </p>
            <p>
              <strong>
                <small>S/N: [{ventilator.serial}]</small> <br />
              </strong>
            </p>
            <p>
              <small>
                <strong>Categoria: </strong>
                <span>{ventilator.category}</span>
              </small>
            </p>
            <p className="is-pulled-right">
              <button className="button is-small is-outlined is-info">
                <box-icon color="blue" name="list-check" />
                <span className="ml-2">Requisitar</span>
              </button>
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

export default VentilatorsItem;
