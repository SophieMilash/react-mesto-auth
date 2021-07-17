import React from 'react';
import { useHistory } from "react-router-dom";
import AuthorizationForm from './AuthorizationForm';
import * as auth from '../utils/auth';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailValidityError, setEmailValidityError] = React.useState('');
  const [passwordValidityError, setPasswordValidityError] = React.useState('');
  // const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const isSubmitDisabled = emailValidityError || passwordValidityError;
  const history = useHistory();

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

  // function checkSubmitDisabled() {
  //   if (emailValidityError || passwordValidityError) {
  //     setIsSubmitDisabled(true);
  //   } else {
  //     setIsSubmitDisabled(false);
  //   }
  // }

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
      .then((data) => {
        if (data.token){
          props.handleLogin();
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }


  return (
    <AuthorizationForm onSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled} name="login" title="Вход" buttonText="Войти">
      <input type="email" name="email" value={email} onChange={handleEmailChange} required className="authorization__input" placeholder="E-mail" />
      {emailValidityError && <span className="form__input-error">{emailValidityError}</span>}
      <input type="password" name="password" value={password} onChange={handlePasswordChange} required minLength="6" className="authorization__input" placeholder="Пароль" />
      {passwordValidityError && <span className="form__input-error">{passwordValidityError}</span>}
    </AuthorizationForm>
  )
};

export default Login;
