import { useRef } from 'react';

function LoginForm({ submitEvent, error }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function submitHandler(evt) {
    evt.preventDefault();
    submitEvent(usernameRef.current.valueAsNumber, passwordRef.current.value);
  }

  return (
    <div className="box">
      {/* --- START FORM --- */}
      <form onSubmit={submitHandler}>
        {/* -- username */}
        <div className="field">
          <label id="gt-label" className="label" htmlFor="username">
            Utilizador:
          </label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="username"
              id="username"
              placeholder="nº mecanográfico"
              ref={usernameRef}
            />
          </div>
        </div>
        {/* --password--- */}
        <div className="field">
          <label className="label" htmlFor="password">
            Password:
          </label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              ref={passwordRef}
            />
          </div>
          {/* --Validation feedback --- */}
          {error && <p className="help has-text-danger">{error}</p>}
        </div>
        {/* --submit btn--- */}
        <div className="field">
          <div className="control">
            <button
              className="button is-fullwidth is-link is-outlined"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      {/* --- END FORM --- */}
    </div>
  );
}

export default LoginForm;
