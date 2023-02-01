import React from 'react';
import forgotPasswordStyles from './ForgotPassword.module.css';
import { restorePassword } from '../../services/actions/auth';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../components/Form/Form';
import { useForm } from '../../hooks/useForm';

export default function ForgotPassword() {
  const {values, handleChange } = useForm({ email: '' });
  const location = useLocation();
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(restorePassword(values));
  };

  const restoreSuccess = useSelector(store => store.auth.restoreSuccess);
  const isAuthorized = useSelector(store => store.auth.isAuthorized);

  if (restoreSuccess) {
    return <Navigate to='/reset-password' />
  };

  return (
    <div className={forgotPasswordStyles.container}>
      {isAuthorized
        ? (<Navigate to={location?.state?.from || '/'} />)
        : (
          <>
            <Form
              title={'Восстановление пароля'}
              buttonText={'Восстановить'}
              onSubmit={onSubmit}
            >
              <Input name='email' type='email' placeholder='Укажите e-mail' value={values.email} onChange={handleChange} />
            </Form>
            <div className={`text text_type_main-default ${forgotPasswordStyles.tips}`}>
              <p className={forgotPasswordStyles.tip}>Вспомнили пароль? <Link className={forgotPasswordStyles.link} to='/login'>Войти</Link></p>
            </div>
          </>
        )
      }
    </div>
  )
}
