import React from 'react';
import { store } from '../store';
import MainLayout from '../layout/MainLayout';

function SpaPage() {
  console.log('starting spa...');

  const authUser = store.getState().auth.authUser;

  return <MainLayout></MainLayout>;
}

export default SpaPage;
