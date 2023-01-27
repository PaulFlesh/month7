import React, { useState } from 'react';
import resetPasswordStyles from './ResetPassword.module.css';
import { resetPassword } from '../../services/actions/auth';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function ResetPassword() {
  const [resetState, setResetState] = useState({ password: '', token: '' });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setResetState({ ...resetState, [e.target.name]: e.target.value });
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    dispatch(resetPassword(resetState));
  };

  const restoreSuccess = useSelector(store => store.auth.restoreSuccess);
  const restoreRequest = useSelector(store => store.auth.restoreRequest);
  const isAuthorized = useSelector(store => store.auth.isAuthorized);
  
  if (restoreSuccess) {
    return <Navigate to='/login' />
  };

  if (!restoreRequest) {
    return <Navigate to='/forgot-password' />
  };

  return (
    <div className={resetPasswordStyles.container}>
      {isAuthorized
        ? (<Navigate to='/' />)
        : (
          <div className={resetPasswordStyles.content}>
            <h3 className={`text text_type_main-medium ${resetPasswordStyles.title}`}>Восстановление пароля</h3>
            <PasswordInput name='password' placeholder='Введите новый пароль' value={resetState.password} onChange={onChange} />
            <Input name='token' type='text' placeholder='Введите код из письма' value={resetState.token} onChange={onChange} />
            <Button onClick={onButtonClick} size='medium' type='primary'>Сохранить</Button>
            <div className={`text text_type_main-default ${resetPasswordStyles.tips}`}>
              <p>Вспомнили пароль? <Link className={resetPasswordStyles.link} to='/login'>Войти</Link></p>
            </div>
          </div>
        )
      }
    </div>
  )
}
