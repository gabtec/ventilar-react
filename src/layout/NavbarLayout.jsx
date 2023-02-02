import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSubmit } from 'react-router-dom';
import { authStoreActions } from '../store/auth/auth.store';

function NavbarLayout(props) {
  const [burgerClasses, setBurgerClasses] = useState(['navbar-burger']);
  const [menuClasses, setMenuClasses] = useState(['navbar-menu']);

  const submit = useSubmit();
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(authStoreActions.clearAuthData(''));
    submit(null, { method: 'post', action: '/logout' });
  }

  function toggleMenu() {
    setBurgerClasses((prev) => {
      return prev.length === 1
        ? ['navbar-burger', 'is-active']
        : ['navbar-burger'];
    });

    setMenuClasses((prev) => {
      return prev.length === 1 ? ['navbar-menu', 'is-active'] : ['navbar-menu'];
    });
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            /> */}
          <strong className="is-size-3">ventil≋AR</strong>
        </a>

        <a
          role="button"
          className={burgerClasses.join(' ')}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={menuClasses}>
        <div className="navbar-start">
          {/* <Link to="/" className="navbar-item">
            Home
          </Link> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* user info */}
              {props.username && (
                <a className="button is-primary is-outlined" disabled>
                  <strong>{props.username}</strong>
                </a>
              )}

              <button className="button is-primary" onClick={logoutHandler}>
                <strong>Log out</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLayout;
