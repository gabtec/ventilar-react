import { useState } from 'react';
import ReactDOM from 'react-dom';
import SelectVentilatorItem from './Dispatcher-select-ventilator-to-dispatch.modal';

function DispatcherDispacthModal({
  isActive,
  ventilators,
  closeEvent,
  saveEvent,
}) {
  const [vent, setVent] = useState(0);
  const [obs, setObs] = useState('');
  const modalClasses = isActive ? ['modal', 'is-active'] : ['modal'];

  const title = `Empréstimo de ventilador:`;

  function selectVentilatorHandler(event) {
    console.log(event.target.value);
    setVent(event.target.value);
  }

  function obsHandler(event) {
    console.log(event.target.value);
    setObs(event.target.value);
  }

  function closeHandler() {
    clearModal();
    closeEvent();
  }

  function saveHandler() {
    saveEvent(vent, obs);
    clearModal();
  }

  function clearModal() {
    setVent(null);
    setObs('');
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className={modalClasses.join(' ')}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                <strong>{title}</strong>
              </p>
            </header>
            <section className="modal-card-body has-background-light">
              <div className="columns is-centered">
                <div className="column is-three-quarters">
                  {ventilators.length === 0 && (
                    <p>Sem ventiladores disponíveis</p>
                  )}
                  {ventilators.length !== 0 && (
                    <form action="" className="form">
                      <div className="control">
                        <label className="label is-underlined">
                          Seleccione o ventilador:
                        </label>
                      </div>
                      {/* loop to list available vents */}

                      {ventilators.map((vent) => {
                        return (
                          <SelectVentilatorItem
                            key={vent.id}
                            ventilator={vent}
                            selectVentilatorEvent={selectVentilatorHandler}
                          ></SelectVentilatorItem>
                        );
                      })}
                      {/* end loop */}
                      <br />
                      <div className="control">
                        <label htmlFor="" className="label">
                          Observações:
                        </label>
                        <textarea
                          className="textarea"
                          name="obs"
                          id="obs"
                          cols="30"
                          rows="10"
                          value={obs}
                          onChange={obsHandler}
                        ></textarea>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </section>
            <footer className="modal-card-foot is-justify-content-flex-end">
              <button
                className="button"
                onClick={closeHandler}
                data-cy="dispatch-modal-btn-cancel"
              >
                Cancelar
              </button>
              {ventilators.length !== 0 && (
                <button
                  className="button is-info"
                  onClick={saveHandler}
                  data-cy="dispatch-modal-btn-save"
                >
                  Gravar
                </button>
              )}
            </footer>
          </div>
        </div>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

export default DispatcherDispacthModal;

export function printVentilatorName(vent) {
  if (!vent) return '';

  return `${vent.brand} ${vent.model} [s/n: ${vent.serial}]`;
}
