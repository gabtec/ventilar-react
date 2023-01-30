import React from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import * as classes from './SpaPage.module.css';
import ListWithoutItems from '../components/ListWithoutItems';

function SpaPage() {
  console.log('starting spa...');
  const navigate = useNavigate();

  const authUser = store.getState().auth.authUser;

  return (
    <>
      <section
        className={'section  has-background-danger ' + classes.gt_spa_container}
      >
        <h1 className="title">Section</h1>
        <h2 className="subtitle">
          A simple container to divide your page into <strong>sections</strong>,
          like the one you're currently reading.
        </h2>

        <div className="columns is-centered ">
          <div className="column is-half">
            <h1 className="title is-4">Lista de Ventiladores</h1>
            <h2 className="subtitle is-6">Serviço Medicina</h2>
            <h2>SpaPage</h2>
            <h4>Olá {authUser.name}</h4>
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-half">
            <div>
              <ListWithoutItems></ListWithoutItems>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SpaPage;
