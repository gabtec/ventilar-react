function VentilatorsItem(props) {
  console.log(props);
  return (
    <div className="box">
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://cdn.bimedis.com/img/vimg/1835150/big" />
            {/* <img src="../assets/trilogy-3000.png" /> */}
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{props.ventilator.brand}</strong>{' '}
              <small>@johnsmith</small> <small>31m</small>
              <br />
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small">
                  <i class="fas fa-reply"></i>
                </span>
              </a>
              <a class="level-item">
                <span class="icon is-small">
                  <i class="fas fa-retweet"></i>
                </span>
              </a>
              <a class="level-item">
                <span class="icon is-small">
                  <i class="fas fa-heart"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <button class="delete"></button>
        </div>
      </article>
    </div>
  );
}

export default VentilatorsItem;