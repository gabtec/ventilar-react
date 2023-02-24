import classes from './LoginPage.module.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginBanner from '../components/LoginPage-Banner';
import LoginForm from '../components/LoginForm';
import { authStoreActions } from '../store/auth/auth.store';

import api, { setAuthorizationHeader } from '../apiConnector/axios';
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
    setUsername(2000);
    setPassword('gabriel');
    // console.log('login is bypassed');

    // if (username === '' || password === '') {
    //   setLoginError('Deve inserir as credênciais!');
    //   return;
    // }
    // setUsername(username);
    // setPassword(password);
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
  try {
    const resp = await api.post('/auth/login', { username, password });

    setAuthorizationHeader(resp.data.accessToken);
    return {
      isLoggedIn: true,
      data: resp.data,
      error: null,
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      authUser: null,
      error: 'Credênciais inválidas. Tente novamente.',
      details: error.response.data,
    };
  }
}
