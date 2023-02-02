import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function SelectVentCatModal({
  isActive,
  closeModalEvent,
  getModalSelectionEvent,
}) {
  const modalClasses = isActive ? ['modal', 'is-active'] : ['modal'];

  const title = 'Seleccione o tipo de ventilador a requisitar:';

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
            <section className="modal-card-body is-justify-content-center">
              {/* <button
                data-vent-cat="VI"
                className="button is-large"
                onClick={getModalSelectionEvent}
              >
                VI
              </button>
              <button
                data-vent-cat="VNI"
                className="button is-large ml-2"
                onClick={getModalSelectionEvent}
              >
                VNI
              </button> */}
              <Link
                to="/spa/ventilators/available/vi"
                className="button is-large"
              >
                VI
              </Link>
              <Link
                to="/spa/ventilators/available/vni"
                className="button is-large"
              >
                VNI
              </Link>
            </section>
            <footer className="modal-card-foot is-justify-content-flex-end">
              <button className="button" onClick={closeModalEvent}>
                Cancelar
              </button>
            </footer>
          </div>
        </div>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

export default SelectVentCatModal;
