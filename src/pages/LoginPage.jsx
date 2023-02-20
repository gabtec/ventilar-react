import classes from './LoginPage.module.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginBanner from '../components/LoginPage-Banner';
import LoginForm from '../components/LoginForm';
import { authStoreActions } from '../store/auth/auth.store';

/**
 * COMPONENT
 */
function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleSubmmit(username, password) {
    // bypass
    // setUsername('3428');
    // setPassword('gabriel');
    // setUsername('4000');
    // setPassword('simao');
    // console.log('login is bypassed');

    if (username === '' || password === '') {
      setLoginError('Deve inserir as credênciais!');
      return;
    }
    setUsername(username);
    setPassword(password);
  }

  useEffect(() => {
    if (username === '' && password === '') {
      return;
    }

    sendLogin(username, password).then((res) => {
      if (res.error) {
        setLoginError(res.error);
      } else {
        dispatch(authStoreActions.storeAuthData(res.data));
        navigate('/spa');
      }
    });
  }, [username, password]);

  return (
    <div className={classes.gt_home_container}>
      <div className="columns is-vcentered">
        <div className="column is-8">
          <div className="columns is-centered">
            <LoginBanner></LoginBanner>
          </div>
        </div>
        <div className="column is-4">
          <div className="columns is-centered">
            <LoginForm
              submitEvent={handleSubmmit}
              error={loginError}
            ></LoginForm>
          </div>
        </div>
      </div>
    </div>
    // <div className={classes.gt_home_container}>
    //   <section className="hero">
    //     <div className=" mt-6">
    //       <p className={'title ' + classes.gt_title_5r}>ventil≋AR</p>
    //       <p className="subtitle">sponsored by</p>
    //       <div className={classes.gt_logo}></div>
    //     </div>
    //   </section>
    //   <footer className="footer">
    //     <button className="button is-info is-large is-fullwidth" onClick={goTo}>
    //       ENTR≋AR
    //     </button>
    //   </footer>
    // </div>
  );
}

export default HomePage;

/**
 * Helper functions
 * @param {string} username
 * @param {string} password
 * @returns
 */
async function sendLogin(username, password) {
  const resp = await fetch('http://localhost:3002/api/auth/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!resp.ok) {
    return {
      isLoggedIn: false,
      authUser: null,
      error: 'Credênciais inválidas. Tente novamente.',
    };
  }

  return {
    isLoggedIn: true,
    data: await resp.json(),
    error: null,
  };
}
