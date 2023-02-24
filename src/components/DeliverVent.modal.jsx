import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function DeliverVentModal({
  isActive,
  ventilator,
  closeModalEvent,
  returnVentEvent,
}) {
  const modalClasses = isActive ? ['modal', 'is-active'] : ['modal'];

  const title = `Devolução do ventilador:`;

  return (
    <>
      {ReactDOM.createPortal(
        <dialog data-cy="add-order-modal" className={modalClasses.join(' ')}>
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
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot is-justify-content-flex-end">
              <button className="button" onClick={closeModalEvent}>
                Cancelar
              </button>
              <button className="button is-info" onClick={returnVentEvent}>
                Devolver
              </button>
            </footer>
          </div>
        </dialog>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

export default DeliverVentModal;

export function printVentilatorName(vent) {
  if (!vent) return '';

  return `${vent.brand} ${vent.model} [s/n: ${vent.serial}]`;
}
