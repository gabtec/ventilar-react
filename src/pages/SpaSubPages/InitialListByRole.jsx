import { useState } from 'react';
import useAuthUser from '../../hooks/useAuthUser';

import SelectVentCatModal from '../../components/Consumer-select-category.modal';

import AdminHomeList from '../../components/AdminHomeList';
import DispatcherHomeList from '../../components/DispatcherHomeList';
import ConsumerHomeList from '../../components/ConsumerHomeList';
/**
 * Events - selectVentCat
 * @returns jsx component
 */
function InitialListByRole() {
  const user = useAuthUser();

  const [modalIsActive, setModalIsActive] = useState(false);

  function ventSelectionHandler(event) {
    const ventCat = event.target.getAttribute('data-vent-cat');
    setSelectedVentCat(ventCat);
  }

  function toggleModal() {
    setModalIsActive((prev) => !prev);
  }

  function getProperContent(role) {
    if (role === 'admin') return <AdminHomeList />;
    if (role === 'dispatcher')
      return <DispatcherHomeList openModalEvent={toggleModal} />;
    return <ConsumerHomeList openModalEvent={toggleModal} />;
  }

  return (
    <>
      <div className="columns is-centered pt-5">
        {user && getProperContent(user.role)}
      </div>
      <SelectVentCatModal
        isActive={modalIsActive}
        closeModalEvent={toggleModal}
      />
    </>
  );
}

export default InitialListByRole;
