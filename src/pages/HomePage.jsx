import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();

  function goTo() {
    navigate('/login');
  }

  return (
    <>
      <div className="container has-text-centered">
        <section className="hero">
          <div className={'hero-body ' + classes['gt-hero']}>
            <p className={'title is-size-1 ' + classes['gt-title']}>
              ventil≋AR
            </p>
            <p className="subtitle">sponsored by</p>
            <div className={classes['gt-logo']}></div>
          </div>
        </section>
      </div>
      <footer className={'footer ' + classes['gt-footer']}>
        <button className="button is-info is-large is-fullwidth" onClick={goTo}>
          ENTR≋AR
        </button>
      </footer>
    </>
  );
}

export default HomePage;
