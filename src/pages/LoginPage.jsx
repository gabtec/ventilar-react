import classes from './LoginPage.module.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginBanner from '../components/LoginPage-Banner';
import LoginForm from '../components/LoginForm';
import { authStoreActions } from '../store/auth/auth.store';

import api, { setAuthorizationHeader } from '../apiConnector/axios';
/**
 * COMPONENT
 */
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState(null);

  async function handleSubmmit(username, password) {
    if (isNaN(username) || password === '') {
      setLoginError('Deve inserir as credênciais!');
      return;
    }

    try {
      const resp = await api.post('/auth/login', { username, password });
      setAuthorizationHeader(resp.data.accessToken);
      dispatch(authStoreActions.storeAuthData(resp.data));
      navigate(`/spa/${resp.data.user.role}`);
    } catch (error) {
      setLoginError('Credênciais inválidas. Tente novamente.');
    }
  }

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
