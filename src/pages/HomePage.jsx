import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();

  function goTo() {
    navigate('/login');
  }

  return (
    <div className={classes.gt_home_container}>
      <section className="hero">
        <div className=" mt-6">
          <p className={'title ' + classes.gt_title_5r}>ventil≋AR</p>
          <p className="subtitle">sponsored by</p>
          <div className={classes.gt_logo}></div>
        </div>
      </section>
      <footer className="footer">
        <button className="button is-info is-large is-fullwidth" onClick={goTo}>
          ENTR≋AR
        </button>
      </footer>
    </div>
  );
}

export default HomePage;
