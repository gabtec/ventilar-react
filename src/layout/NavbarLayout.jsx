import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useSubmit } from 'react-router-dom';
import { authStoreActions } from '../store/auth/auth.store';

/**
 *
 * @param props { isLoggedIn: boolean}
 * @returns
 */
function NavbarLayout(props) {
  const submit = useSubmit();
  const dispatch = useDispatch();
  const location = useLocation();

  function logoutHandler() {
    dispatch(authStoreActions.clearAuthData(''));
    submit(null, { method: 'post', action: '/logout' });
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
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {/* <Link to="/" className="navbar-item">
            Home
          </Link> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a> */}
              {props.isLoggedIn && (
                <a className="button is-primary is-outlined">
                  <strong>{props.username}</strong>
                </a>
              )}
              {props.isLoggedIn && (
                <a className="button is-primary" onClick={logoutHandler}>
                  <strong>Log out</strong>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLayout;
