import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';

import MainLayout from '../layout/MainLayout';

function SpaPage() {
  const navigate = useNavigate();
  const user = useAuthUser();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []); // will run 1x

  return <MainLayout user={user || ''}></MainLayout>;
}

export default SpaPage;
