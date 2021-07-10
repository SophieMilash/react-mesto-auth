import React from 'react';
import AuthorizationForm from './AuthorizationForm';

function Login(props) {
  return (
    <AuthorizationForm name="Login" title="Вход" buttonText="Войти">
      <input type="email" name="email" required className="authorization__input" placeholder="E-mail" />
      {/* { && <span className="form__input-error">{}</span>} */}
      <input type="password" name="password" required className="authorization__input" placeholder="Пароль" />
       {/* { && <span className="form__input-error">{}</span>} */}
    </AuthorizationForm>
  )
};

export default Login;
