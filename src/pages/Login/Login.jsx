import React, { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import loginStyles from './Login.module.css';
import { STORE_PASSWORD, login } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  function onChange(e) {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  function onButtonClick(e) {
    e.preventDefault();
    dispatch({
      type: STORE_PASSWORD,
      password: loginState.password
    });
    dispatch(login(loginState));
  };

  const isAuthorized = useSelector(store => store.auth.isAuthorized);

  return (
    <div className={loginStyles.container}>
      {isAuthorized
        ? (<Navigate to='/' />)
        : (
          <div className={loginStyles.content}>
            <div className={`text text_type_main-medium ${loginStyles.label}`}>Вход</div>
            <Input type='email' name='email' placeholder='E-mail' value={loginState.email} onChange={onChange} />
            <PasswordInput name='password' value={loginState.password} onChange={onChange} />
            <Button htmlType='button' size='medium' type='primary' onClick={onButtonClick}>Войти</Button>

            <div className={`text text_type_main-default ${loginStyles.tips}`}>
              <p className={loginStyles.tip}>Вы новый пользователь? <Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link></p>
              <p className={loginStyles.tip}>Забыли пароль? <Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link></p>
            </div>
          </div>
        )
      }
    </div>
  )
}
