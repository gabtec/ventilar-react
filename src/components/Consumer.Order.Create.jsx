import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { store } from '../store';
import api from '../apiConnector/axios';

function VentilatorOrder() {
  const navigate = useNavigate();

  const { cat } = useParams();
  const selectedPark = store.getState().order.selectedPark;
  const authUser = store.getState().auth.authUser;

  const [patient, setPatient] = useState('');
  const [bed, setBed] = useState(1);
  const [obs, setObs] = useState('');
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
    // TODO: const choice = confirm('Deseja mesmo sair?');
    navigate('/spa/consumer');
  }

  function formSubmitHandler(event) {
    event.preventDefault();

    // reset errors
    setErrors(null);
    let isFormValid = true;

    // validation
    if (!patient) {
      isFormValid = false;
      setErrors('Deve introduzir o nome do paciente.');
    }

    if (bed < 1 || bed > 50) {
      isFormValid = false;
      setErrors('Deve introduzir um número de cama válido.');
    }

    if (isFormValid) {
      const order = {
        patient_name: patient,
        patient_bed: parseInt(bed, 10),
        obs: obs,
        // automatic fields
        order_type: cat,
        to_id: selectedPark.wardID,
        from_id: authUser.workplace_id,
        requested_by: authUser.id,
      };

      saveOrder(order);
    }
  }

  async function saveOrder(order) {
    try {
      const resp = await api.post('/orders', order);
      navigate('/spa/consumer');
    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
    }
  }

  return (
    <div className="column is-three-quarters has-background-white mt-5">
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
        <div className="field" data-cy="error-feedback">
          {errors && <p className="help has-text-danger">{errors}</p>}
        </div>
        {/* control buttons */}
        <div className="field is-pulled-right">
          <button
            className="button is-info mr-2"
            data-cy="close-order-form"
            onClick={cancelHandler}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="button is-success"
            data-cy="save-order-form"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default VentilatorOrder;
