import React from 'react';
import AuthorizationForm from './AuthorizationForm';
import * as auth from '../utils/auth';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailValidityError, setEmailValidityError] = React.useState('');
  const [passwordValidityError, setPasswordValidityError] = React.useState('');
  const isSubmitDisabled = (emailValidityError || email === '') || (passwordValidityError || password === '');

  function handleEmailChange(e) {
    const emailInput = e.target;
    const {value, validity, validationMessage} = emailInput;
    setEmail(value);

    if (validity.valueMissing) {
      setEmailValidityError('Вы пропустили это поле');
    } else if (validity.typeMismatch) {
      setEmailValidityError('Введите адрес электронной почты');
    } else {
      setEmailValidityError(validationMessage);
    }
  }

  function handlePasswordChange(e) {
    const passwordInput = e.target;
    const {value, validity, validationMessage} = passwordInput;
    setPassword(value);

    if (validity.valueMissing) {
      setPasswordValidityError('Вы пропустили это поле');
    } else if (validity.tooShort) {
      setPasswordValidityError('Минимальня длина - 6 символов');
    } else {
      setPasswordValidityError(validationMessage);
    }
  }

  function handleSubmit(e){
    e.preventDefault();

    auth.authorize(email, password)
      .then((res) => {
        if (res.token){
          localStorage.setItem('jwt', res.token);
          auth.checkToken(res.token).then((res) => {
            props.onLogin(res.data.email);
          });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <AuthorizationForm onSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled} name="login" title="Вход" buttonText="Войти">
      <input type="email" name="email" value={email} onChange={handleEmailChange} required className="authorization__input" placeholder="E-mail" autoComplete="on" />
      {emailValidityError && <span className="form__input-error">{emailValidityError}</span>}
      <input type="password" name="current-password" value={password} onChange={handlePasswordChange} required minLength="6" className="authorization__input" placeholder="Пароль" autoComplete="on" />
      {passwordValidityError && <span className="form__input-error">{passwordValidityError}</span>}
    </AuthorizationForm>
  )
};

export default Login;
