import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useMatch } from 'react-router-dom';
import appHeaderStyles from "./AppHeader.module.css";
import { menuClassifier } from '../../utils/utils';

export default function AppHeader() {
  const rootLink = useMatch('/');
  const ordersLink = useMatch('/orders-feed');
  const profileLink = useMatch('/profile');

  return (
    <header className={`${appHeaderStyles.header} mt-10`}>
      <nav className={appHeaderStyles.nav}>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <ul className={appHeaderStyles.list}>
          <li className={appHeaderStyles.item}>
            <NavLink to='/' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <BurgerIcon type={menuClassifier('icon', rootLink)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', rootLink)}`}>
                Конструктор
              </p>
            </NavLink>
          </li>
          <li className={appHeaderStyles.item}>
            <NavLink to='/orders-feed' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <ListIcon type={menuClassifier('icon', ordersLink)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', ordersLink)}`}>
                Лента заказов
              </p>
            </NavLink>
          </li>
          <li className={appHeaderStyles.item}>
            <NavLink to='/profile' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <ProfileIcon type={menuClassifier('icon', profileLink)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', profileLink)}`}>
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
