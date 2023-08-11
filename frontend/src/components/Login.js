import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Auth from '../Auth';


function Login(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

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
    
    Auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        props.setUserEmail(email);
        localStorage.setItem("jwt", data.token);
        props.handleLogin();
        navigate("/", {replace: true});
      }
    })
    .catch((error) => {
      props.unsuccessRegister();
      props.showCheckResult();
      console.error(`Ошибка при авторизации: ${error}`);
      setFormValue({
        email: '',
        password: ''
      });
    }) 
  }

   return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
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
          <button className="login__save-button" type="submit">Войти</button>
        </form>
        <p className="login__caption_hidden"></p>
      </div>
    </div>
  )
}

export default Login;