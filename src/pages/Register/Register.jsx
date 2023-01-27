import React, { useState } from 'react';
import registerStyles from './Register.module.css';
import { registerProfile } from '../../services/actions/auth';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Register() {
  const [regState, setRegState] = useState({ email: '', password: '', name: '' });
  const isAuthorized = useSelector(store => store.auth.isAuthorized);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setRegState({ ...regState, [e.target.name]: e.target.value });
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    dispatch(registerProfile(regState));
  };

  const registerSuccess = useSelector(store => store.auth.registerSuccess);
  
  if(registerSuccess) {
    return <Navigate to='/login' />
  };

  return (
    <div className={registerStyles.container}>
      {isAuthorized
        ? (<Navigate to='/' />)
        : (
          <div className={registerStyles.content}>
            <h3 className={`text text_type_main-medium ${registerStyles.title}`}>Регистрация</h3>
            <Input name='name' type='text' placeholder='Имя' value={regState.name} onChange={onChange} />
            <Input name='email' type='email' placeholder='E-mail' value={regState.email} onChange={onChange} />
            <PasswordInput name='password' placeholder='Пароль' value={regState.password} onChange={onChange} />
            <Button htmlType='button' size='medium' type='primary' onClick={onButtonClick}>Зарегистрироваться</Button>
            <div className={`text text_type_main-default ${registerStyles.tips}`}>
              <p className={registerStyles.tip}>Уже зарегистрированы? <Link className={registerStyles.link} to='/login'>Войти</Link></p>
            </div>
          </div>
        )
      }
    </div>
  )
}
