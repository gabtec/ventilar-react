import ListWithoutItems from './ListWithoutItems';
import OrdersItem from './OrdersItem';
import SelectVentCatModal from './SelectVentCat.modal';

import { store } from '../store';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function VentilatorsList() {
  console.log(' on ventilators list');
  const navigate = useNavigate();

  const authStore = store.getState().auth;
  const wardName = authStore.authUser.workplace;

  const [vents, setVents] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);

  const [selectedVentCat, setSelectedVentCat] = useState('');
  // const { loading, error, availableVentsList } = useFetch(
  //   `http://localhost:3002/api/ventilators/?status=free&cat=${selectedVentCat}`,
  //   { headers: { authorization: `Bearer ${authStore.accessToken} ` } }, // TODO falta token
  //   [selectedVentCat]
  // );

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
    const ventCat = event.target.getAttribute('data-vent-cat');
    console.log('selected ' + ventCat);
    // navigate('/spa/new-order/' + vent);
    setSelectedVentCat(ventCat);
    console.log(availableVentsList);
    // setVents(availableVentsList.ventilator);
  }

  function showAvailabilitiesHandler() {
    navigate('/spa/ventilators/available/vni');
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
            vents.map((item) => <OrdersItem key={item.id} ventilator={item} />)}
          {/* <button
            className="button is-warning is-pulled-right"
            onClick={showAvailabilitiesHandler}
          >
            Temp Availabilities
          </button> */}
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
