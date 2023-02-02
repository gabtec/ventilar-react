import React from 'react';
import css from './Error404.module.css';

function NotFound() {
  return (
    <div className={css.gt_404_container}>
      <section className="hero has-text-centered">
        <div className=" mt-6">
          <p className="title mt-6 is-size-1">ventil≋AR</p>
        </div>
      </section>
      <section className="section has-background-white">
        <div className="columns is-centered is-vcentered">
          <div className="column is-2 ">
            <strong
              style={{
                fontSize: '4rem',
                paddingRight: '1rem',
                borderRight: 'solid 1px black',
              }}
            >
              404
            </strong>
          </div>
          <div className="column is-6">
            <strong className="is-size-1">Not Found!</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
