import { useRef } from 'react';
import ReactDOM from 'react-dom';

export default function DispatcherReceiveVentilatorModal({
  isActive,
  ventilator,
  closeModalEvent,
  receiveVentEvent,
}) {
  const obsRef = useRef();

  const modalClasses = isActive ? ['modal', 'is-active'] : ['modal'];

  const title = `Recepção de ventilador:`;

  function handleSave() {
    receiveVentEvent(ventilator, obsRef.current.value);
  }

  function handleClose() {
    obsRef.current.value = '';
    closeModalEvent();
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div data-cy="receive-order-modal" className={modalClasses.join(' ')}>
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
                  <span>{printVentilatorName(ventilator)}</span>
                  <form action="" className="form">
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
                        ref={obsRef}
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot is-justify-content-flex-end">
              <button
                className="button"
                onClick={handleClose}
                data-cy="dispatch-modal-receive-vent-cancel"
              >
                Cancelar
              </button>
              <button
                className="button is-success"
                onClick={handleSave}
                data-cy="dispatch-modal-receive-vent-save"
              >
                Receber
              </button>
            </footer>
          </div>
        </div>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

// export default DispatcherReceiveVentilatorModal;

export function printVentilatorName(vent) {
  if (!vent) return '';

  return `${vent.brand} ${vent.model} [s/n: ${vent.serial}]`;
}
