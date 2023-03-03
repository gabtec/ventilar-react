import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelectedOrder from '../hooks/useSelectedOrder';
import useAuthUser from '../hooks/useAuthUser';
import api from '../apiConnector/axios';

function OrderEdit() {
  const navigate = useNavigate();

  const user = useAuthUser();
  const selectedOrder = useSelectedOrder();

  const [patient, setPatient] = useState(selectedOrder.patient_name);
  const [bed, setBed] = useState(selectedOrder.patient_bed);
  const [obs, setObs] = useState(selectedOrder.obs);

  const [errors, setErrors] = useState(null);

  /**
   * HANDLERS
   */
  function patientFormHandler(e) {
    setPatient(e.target.value);
  }
  function bedFormHandler(e) {
    const bed = parseInt(e.target.value, 10);
    setBed(bed);
  }
  function obsFormHandler(e) {
    setObs(e.target.value);
  }

  function navBackHandler() {
    // TODO: const choice = confirm('Deseja mesmo sair?');

    navigate(`/spa/${user.role}`);
  }

  function cancelOrderHandler() {
    window.alert('Deseja mesmo anular este pedido? \n Not implemented yet.');
    // TODO: updateOrderStatus(selectedOrder.id, { status: 'CLOSED', obs: obs });
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    const orderEdit = { ...selectedOrder };
    orderEdit.patient_name = patient;
    orderEdit.patient_bed = bed;
    orderEdit.obs = obs;

    const resp = await api.put(`/orders/${orderEdit.id}`, orderEdit);

    window.history.back();
  }

  return (
    <div className="column is-three-quarters has-background-white mt-5">
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
              defaultValue={selectedOrder.to.name}
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

              <button type="submit" className="button is-success">
                Guardar Alterações
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    // </div>
  );
}

export default OrderEdit;
