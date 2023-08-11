import React, { useState } from 'react';
import * as Auth from '../Auth';


function Register(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const {name, value} = event.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const {email, password} = formValue;
    Auth.register(email, password)
    .then((data) => {
      props.successRegister();
      props.showCheckResult();
    })
    .catch((error) => {
      console.error(`Ошибка при регистрации: ${error}`);
      props.unsuccessRegister();
      props.showCheckResult();
      setFormValue({
        email: '',
        password: ''
      });
    })
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <input 
            className="login__input"
            value={formValue.email}
            onChange={handleChange} 
            id="email" 
            autoComplete="off" 
            type="email" name="email" 
            placeholder="Email" 
            required 
          />
          <input 
            className="login__input"
            value={formValue.password}
            onChange={handleChange} 
            id="password" 
            autoComplete="off" 
            type="password" name="password" 
            placeholder="Пароль" 
            required 
          />
          <button className="login__save-button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="login__caption">Уже зарегистрированы? Войти</p>
      </div>
      
    </div>
  )
}

export default Register;