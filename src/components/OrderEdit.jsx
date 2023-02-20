import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { store } from '../store';
import useSelectedOrder from '../hooks/useSelectedOrder';
import useFetch from '../hooks/useFetch';

function OrderEdit() {
  const selectedOrder = useSelectedOrder();

  const navigate = useNavigate();

  // const { cat } = useParams();
  // const selectedPark = store.getState().order.selectedPark;
  // const authUser = store.getState().auth.authUser;
  const token = store.getState().auth.accessToken;

  const [patient, setPatient] = useState(selectedOrder.patient_name);
  const [bed, setBed] = useState(selectedOrder.patient_bed);
  const [obs, setObs] = useState(selectedOrder.obs);

  const [canExit, setCanExit] = useState(false);
  const [errors, setErrors] = useState(null);

  /**
   * HANDLERS
   */
  function patientFormHandler(e) {
    setPatient(e.target.value);
  }
  function bedFormHandler(e) {
    setBed(e.target.value);
  }
  function obsFormHandler(e) {
    setObs(e.target.value);
  }

  function navBackHandler() {
    // const choice = confirm('Deseja mesmo sair?');
    // if (choice) {
    //   navigate('/spa');
    // }
    navigate('/spa'); //BYPASS
  }

  function cancelOrderHandler() {
    console.log(
      'TODO: cancel order --- update status to closed, obs: canceled by issuer'
    );
    // window.alert('Not implemented yet');
    updateOrderStatus(selectedOrder.id, { status: 'CLOSED', obs: obs });
  }

  function updateOrderHandler() {
    console.log('TODO: send PATCH update');
    window.alert('Not implemented yet');
  }

  function formSubmitHandler(event) {
    event.preventDefault();

    const order = {
      order_type: cat,
      patient_name: patient,
      patient_bed: parseInt(bed, 10),
      obs: obs,
      to_id: selectedPark.wardID,
      from_id: authUser.workplace_id,
      requested_by: `(${authUser.mec}) ${authUser.name}`, //'(3429) Pedro Martins',
      ventilator_id: 0, // to be null. Who dispacthes, selects
    };
    console.log('form handler');
    console.log(order);
    saveOrder(order);
  }

  async function updateOrderStatus(orderID, data) {
    const url = `http://localhost:3002/api/orders/${orderID}`;
    try {
      const resp = await fetch(
        url,
        {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
        [url]
      );

      if (!resp.ok) {
        console.log('deu erro');
        const erro = await resp.json();
        console.log(erro.message);
        setErrors(erro.message);
        return;
      }
      const resData = await resp.json();
      console.log(resData);
      setCanExit(true);
    } catch (error) {
      console.log(error.message);
      setErrors(error.message);
    }
  }
  // async function saveOrder(order) {
  //   // SEND to API
  //   const url = `http://localhost:3002/api/orders/`;

  //   try {
  //     const resp = await fetch(
  //       url,
  //       {
  //         method: 'post',
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(order),
  //       },
  //       [url]
  //     );

  //     if (!resp.ok) {
  //       console.log('deu erro');
  //       const erro = await resp.json();
  //       console.log(erro.message);
  //       setErrors(erro.message);
  //       return;
  //     }
  //     const resData = await resp.json();
  //     console.log(resData);
  //     setCanExit(true);
  //   } catch (error) {
  //     console.log(error.message);
  //     setErrors(error.message);
  //   }
  // }

  useEffect(() => {
    if (canExit) {
      navigate('/spa');
    }
  }, [canExit]);

  return (
    <div className="columns is-centered pt-5 mt-5">
      <div className="column is-three-quarters has-background-white">
        <div className="title">Editar Requisição de Ventilador: </div>

        <form className="form " onSubmit={formSubmitHandler}>
          {/* to type  */}
          <div className="field">
            <label htmlFor="vtype" className="label">
              Categoria:
            </label>
            <div className="control">
              <input
                id="vtype"
                name="vtype"
                type="text"
                className="input"
                defaultValue={selectedOrder.order_type}
                disabled
              />
            </div>
          </div>
          {/* to type  */}
          <div className="field">
            <label htmlFor="status" className="label">
              Status:
            </label>
            <div className="control">
              <input
                id="status"
                name="status"
                type="text"
                className="input"
                defaultValue={selectedOrder.status}
                disabled
              />
            </div>
          </div>
          {/* to ward  */}
          <div className="field">
            <label htmlFor="to-ward" className="label">
              Requisitado a:
            </label>
            <div className="control">
              <input
                id="to-ward"
                name="wardID"
                type="text"
                className="input"
                defaultValue={selectedOrder.to_id}
                disabled
              />
            </div>
          </div>
          {/* patient-name  */}
          <div className="field">
            <label htmlFor="patient-name" className="label">
              Paciente:
            </label>
            <div className="control">
              <input
                id="patient-name"
                name="patientName"
                type="text"
                className="input"
                placeholder="Maria Cheia de Dores"
                value={patient}
                onChange={patientFormHandler}
              />
            </div>
          </div>
          {/* patient-bed  */}
          <div className="field">
            <label htmlFor="patient-bed" className="label">
              Cama Nº:
            </label>
            <div className="control">
              <input
                id="patient-bed"
                name="patientBed"
                type="number"
                className="input"
                min={0}
                max={99}
                value={bed}
                onChange={bedFormHandler}
              />
            </div>
          </div>
          {/* observations  */}
          <div className="field">
            <label htmlFor="obs" className="label">
              Observações:
            </label>
            <div className="control">
              <textarea
                className="textarea"
                name="obs"
                id="obs"
                cols="20"
                rows="5"
                placeholder="observações"
                value={obs}
                onChange={obsFormHandler}
              ></textarea>
            </div>
          </div>
          {/* feedback */}
          <div className="field">
            {errors && <p className="help has-text-danger">{errors}</p>}
          </div>

          {/* control buttons */}
          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                className="button is-info mr-2"
                onClick={navBackHandler}
              >
                Voltar
              </button>
            </div>

            <div className="control is-expanded">
              <div className="buttons is-right">
                <button
                  type="button"
                  className="button is-warning mr-2"
                  onClick={cancelOrderHandler}
                >
                  Anular Pedido
                </button>

                <button
                  type="submit"
                  className="button is-success"
                  onClick={updateOrderHandler}
                >
                  Guardar Alterações
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderEdit;
