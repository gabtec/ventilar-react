import ListWithoutItems from './ListWithoutItems';
import VentilatorsItem from './VentilatorsItem';
import SelectVentCatModal from './SelectVentCat.modal';

import { store } from '../store/';
import { useEffect, useState, useCallback } from 'react';

function VentilatorsList() {
  console.log(' on ventilators list');
  const authStore = store.getState().auth;
  console.log(authStore.authUser);
  const wardName = authStore.authUser.workplace;

  const [vents, setVents] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);
  // const vents = [
  //   // { id: 1, brand: 'Philips' },
  //   // { id: 2, brand: 'Zoll' },
  // ];

  // function getList(serviceID) {
  const getList = useCallback(async (serviceID) => {
    let check = vents.length === 0 ? true : false;
    setIsEmpty(check);
    try {
      const res = await fetch(
        `http://localhost:3002/api/orders/?src=${serviceID}`,
        {
          headers: {
            authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );

      const data = await res.json();

      setVents(data);
      check = data.length === 0 ? true : false;
      setIsEmpty(check);
    } catch (error) {
      console.log('bummm');
      if (error.status === 401) {
        console.log(' no auth');
      }

      console.log(error.message);
    }
  });

  useEffect(() => {
    getList(3);
    // getList(authStore.authUser.workplace_id);
  }, []);

  function toggleModal() {
    setModalIsActive((prev) => !prev);
  }

  function ventSelectionHandler(event) {
    const vent = event.target.getAttribute('data-vent-cat');
    console.log('selected ' + vent);
  }

  return (
    <>
      <div className="columns is-centered pt-5">
        <div className="column is-three-quarters">
          <div className="title">
            Lista de Ventiladores:{' '}
            <span className="is-italic is-size-5">[{wardName}]</span>
          </div>
          {isEmpty && <ListWithoutItems />}

          {!isEmpty &&
            vents.map((item) => (
              <VentilatorsItem key={item.id} ventilator={item} />
            ))}
          <button
            className="button is-info is-pulled-right"
            onClick={toggleModal}
          >
            Adicionar
          </button>
        </div>
      </div>
      <SelectVentCatModal
        isActive={modalIsActive}
        closeModalEvent={toggleModal}
        getModalSelectionEvent={ventSelectionHandler}
      />
    </>
  );
}

export default VentilatorsList;
