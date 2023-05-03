import { SyntheticEvent, FC, useMemo, useEffect } from 'react';
import profileStyles from './Profile.module.css';
import { logout, patchUser, CLEAR_LOGOUT_STATE } from '../../services/actions/auth';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useMatch } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { menuClassifier } from '../../utils/utils';
import { useForm } from '../../hooks/useForm';
import OrderHistory from '../../components/OrderHistory/OrderHistory';

const Profile: FC = () => {
  const { user, password, logoutRequest, logoutSuccess } = useSelector(store => store.auth);
  const { values, setValues, handleChange } = useForm({ name: user.name, email: user.email, password: '' });

  const isProfileChanged = useMemo(() => user.email !== values.email
    || user.name !== values.name, [user, values]
  );

  const buttonClass = useMemo(() =>
    isProfileChanged ? '' : profileStyles.hidden, [isProfileChanged]
  );

  const profileLink = useMatch('/profile');
  const ordersLink = useMatch('/profile/orders');
  const dispatch = useDispatch();

  function saveChanges(e: SyntheticEvent): void {
    e.preventDefault();
    dispatch(patchUser(values))
  };

  function resetChanges(): void {
    setValues({
      ...values,
      name: user?.name ? user.name : '',
      email: user?.email ? user.email : ''
    })
  };

  function onLogout(): void {
    dispatch(logout());
  };

  useEffect(() => {
    if (isProfileChanged) {
      setValues({
        ...values,
        name: user?.name || '',
        email: user?.email || ''
      })
    }
  }, [isProfileChanged, setValues, values, user, password]);

  if (logoutRequest) {
    return (
      <h3 className="text text_type_main-large mt-10">
        Загрузка...
      </h3>
    )
  };

  if (logoutSuccess) {
    dispatch({ type: CLEAR_LOGOUT_STATE })
    return <Navigate to='/login' />
  };

  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.menu}>
        <ul className={`text text_type_main-medium ${profileStyles.links}`}>
          <li className={`text_color_inactive ${profileStyles.link}`}>
            <Link to='/profile' className={menuClassifier('text', profileLink?.pathname)}>Профиль</Link>
          </li>
          <li className={`text_color_inactive ${profileStyles.link}`}>
            <Link to='/profile/orders' className={menuClassifier('text', ordersLink?.pathname)}>История заказов</Link>
          </li>
          <li className={`text_color_inactive ${profileStyles.link}`}><span onClick={onLogout}>Выход</span></li>
        </ul>
        <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      {profileLink && (
        <div className={profileStyles.auth_fields}>
          <Input name='name' placeholder='Имя' value={values.name || ''} onChange={handleChange} />
          <Input name='email' placeholder='Логин' value={values.email || ''} onChange={handleChange} />
          <PasswordInput name='password' value={values.password || ''} onChange={handleChange} />
          <div className={`${profileStyles.buttons} ${buttonClass}`}>
            <span onClick={resetChanges}
              className={`text text_type_main-small ${profileStyles.link}`}>Отмена</span>
            <Button htmlType='submit' size='medium' type='primary' onClick={saveChanges}>Сохранить</Button>
          </div>
        </div>
      )}
      {ordersLink && (
        <OrderHistory />
      )}
    </div>
  )
};

export default Profile;
