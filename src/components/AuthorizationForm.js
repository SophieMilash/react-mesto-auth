import React from 'react';
import { Link } from 'react-router-dom';

function AuthorizationForm(props) {
  return (
    <section className="authorization">
      <form className="form" onSubmit={props.onSubmit} name={props.name} noValidate >
        <fieldset className={`authorization__form`}>
          <legend className="authorization__title">{props.title}</legend>
          {props.children}
          <button type="submit" name="submit" className="button authorization__button" disabled={props.isSubmitDisabled ? true : ''}>{props.buttonText}
          </button>

          {props.name === 'register' &&
            <div className="authorization__login">
              <p className="authorization__login-paragraph">Уже зарегистрированы?&nbsp;</p>
              <Link to="/sign-in" className="authorization__login-link">Войти</Link>
            </div>
          }
        </fieldset>
      </form>
    </section>
  )
};

export default AuthorizationForm;
