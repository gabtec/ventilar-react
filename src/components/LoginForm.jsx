import { useRef } from 'react';

function LoginForm() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="columns is-centered ">
      <div className="column is-half">
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
              {hasErrors && <p className="help has-text-danger">{errorMsg}</p>}
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
      </div>
    </div>
  );
}

export default LoginForm;
