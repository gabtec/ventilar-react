import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { store } from '../store';
import useFetch from '../hooks/useFetch';

function VentilatorOrder() {
  const navigate = useNavigate();

  const { cat } = useParams();
  const selectedPark = store.getState().order.selectedPark;
  const authUser = store.getState().auth.authUser;
  const token = store.getState().auth.accessToken;

  const [patient, setPatient] = useState('');
  const [bed, setBed] = useState(1);
  const [obs, setObs] = useState('');

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

  function cancelHandler() {
    // const choice = confirm('Deseja mesmo sair?');
    // if (choice) {
    //   navigate('/spa');
    // }
    navigate('/spa'); //BYPASS
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

  async function saveOrder(order) {
    // SEND to API
    const url = `http://localhost:3002/api/orders/`;

    try {
      const resp = await fetch(
        url,
        {
          method: 'post',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
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
  // useEffect(()=>{
  //   if(!loading){
  //     console.log(value);
  //   }else{
  //     console.log('still sending')
  //   }
  // }, [loading]);

  useEffect(() => {
    if (canExit) {
      navigate('/spa');
    }
  }, [canExit]);
  return (
    <div className="columns is-centered pt-5 mt-5">
      <div className="column is-three-quarters has-background-white">
        <div className="title">
          Requisição de Ventilador:{' '}
          <span className="has-text-info">{cat.toUpperCase()}</span>
        </div>

        <form className="form " onSubmit={formSubmitHandler}>
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
                value={selectedPark.wardName}
                disabled
              />
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
          <div className="field is-pulled-right">
            <button className="button is-info mr-2" onClick={cancelHandler}>
              Cancelar
            </button>
            {/* <button className="button is-success">Guardar</button> */}
            <button type="submit" className="button is-success">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VentilatorOrder;
