import React from 'react';
import classes from './HomePage.module.css';
import css from './Error404.module.css';

function NotFound() {
  return (
    <div className={css.gt_404_container}>
      <section className="hero">
        <div className=" mt-6">
          <p className={'title ' + classes.gt_title_5r}>ventil≋AR</p>
          <p className="subtitle">sponsored by</p>
          <div className={classes.gt_logo}></div>
        </div>
      </section>
      <section className={'section ' + css.gt_error_section}>
        <div className="columns  is-centered">
          <div className="column is-2 ">
            <strong className={css.gt_404}>404</strong>
          </div>
          <div className="column is-6">
            <strong>Not Found!</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
