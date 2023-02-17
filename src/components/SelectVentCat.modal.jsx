import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function SelectVentCatModal({ isActive, closeModalEvent }) {
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
            <section className="modal-card-body ">
              <div className="columns is-centered">
                <div className="column is-three-quarters">
                  <Link
                    to="/spa/ventilators/available/vi"
                    className="button is-outlined is-success is-large mr-2"
                    style={{ width: '150px' }}
                  >
                    <box-icon name="equalizer" />
                    <span className="mr-2">VI</span>
                  </Link>
                  <Link
                    to="/spa/ventilators/available/vni"
                    className="button is-outlined is-info is-large"
                    style={{ width: '150px' }}
                  >
                    <box-icon name="equalizer" />
                    <span className="mr-2">VNI</span>
                  </Link>
                </div>
              </div>
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
