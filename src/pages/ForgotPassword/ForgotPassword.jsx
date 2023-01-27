import React, { useState } from 'react';
import forgotPasswordStyles from './ForgotPassword.module.css';
import { restorePassword } from '../../services/actions/auth';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function ForgotPassword() {
  const [emailState, setEmailState] = useState({ email: '' });
  const dispatch = useDispatch();

  const onEmailChange = (e) => {
    setEmailState({ ...emailState, email: e.target.value });
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    dispatch(restorePassword(emailState));
  };

  const restoreRequest = useSelector(store => store.auth.restoreRequest);
  const isAuthorized = useSelector(store => store.auth.isAuthorized);
  
  if (restoreRequest) {
    return <Navigate to='/reset-password' />
  };

  return (
    <div className={forgotPasswordStyles.container}>
      {isAuthorized
        ? (<Navigate to='/' />)
        : (
          <div className={forgotPasswordStyles.content}>
            <h3 className={`text text_type_main-medium ${forgotPasswordStyles.title}`}>Восстановление пароля</h3>
            <Input type='email' placeholder='Укажите e-mail' value={emailState.email} onChange={onEmailChange} />
            <Button htmlType='button' size='medium' type='primary' onClick={onButtonClick}>Восстановить</Button>
            <div className={`text text_type_main-default ${forgotPasswordStyles.tips}`}>
              <p className={forgotPasswordStyles.tip}>Вспомнили пароль? <Link className={forgotPasswordStyles.link} to='/login'>Войти</Link></p>
            </div>
          </div>
        )
      }
    </div>
  )
}
