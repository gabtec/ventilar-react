import classes from './LoginPage.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authStoreActions } from '../store/auth/auth.store';

function LoginPage() {
  console.log('on login routes');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [hasErrors, setHasErrors] = useState(false);
  const errorMsg = 'Credênciais inválidas. Tente novamente.';

  function login(username, password) {
    return fetch('http://localhost:3002/api/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    const username = '4000';
    const password = 'sofia';
    // const username = usernameRef.current?.value;
    // const password = usernameRef.current?.value;

    try {
      const resp = await login(username, password);
      if (!resp.ok) {
        // console.log('deu error');
        // console.log(resp.status);
        setHasErrors(true);
        usernameRef.current?.focus();
        return;
      }

      // 200 OK
      setHasErrors(false);
      const data = await resp.json();

      // localStorage.setItem('isIN', 'true');
      dispatch(authStoreActions.storeAuthData(data));
      console.log('store updated');
      navigate('/spa');
    } catch (error) {
      setHasErrors(true);
      console.log('inside catch');
      console.log(error.message);
    }
  }

  return (
    <div className={classes.gt_login_container}>
      <section className="hero">
        <div className=" mt-6">
          <p className={'title ' + classes.gt_title_5r}>ventil≋AR</p>
          <p className="subtitle">sponsored by</p>
          <div className={classes.gt_logo}></div>
        </div>
      </section>

      <div className="columns is-centered ">
        <div className="column is-half">
          <div className="box">
            {/* --- START FORM --- */}
            <form onSubmit={submitHandler}>
              {/* -- username */}
              <div className="field">
                <label className="label" htmlFor="username">
                  Utilizador:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    name="username"
                    id="username"
                    placeholder="nº mecanográfico"
                    ref={usernameRef}
                  />
                </div>
              </div>
              {/* --password--- */}
              <div className="field">
                <label className="label" htmlFor="password">
                  Password:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    ref={passwordRef}
                  />
                </div>
                {/* --Validation feedback --- */}
                {hasErrors && (
                  <p className="help has-text-danger">{errorMsg}</p>
                )}
              </div>
              {/* --submit btn--- */}
              <div className="field">
                <div className="control">
                  <button
                    className="button is-fullwidth is-link is-outlined"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            {/* --- END FORM --- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
