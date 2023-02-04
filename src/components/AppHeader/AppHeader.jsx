import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, useMatch } from 'react-router-dom';
import appHeaderStyles from "./AppHeader.module.css";
import { menuClassifier } from '../../utils/utils';

export default function AppHeader() {
  const rootLink = useMatch('/');
  const feedLink = useMatch('/feed');
  const profileLink = useMatch('/profile');

  return (
    <header className={`${appHeaderStyles.header} mt-5`}>
      <nav className={appHeaderStyles.nav}>
        <Link className={appHeaderStyles.logo} to='/'><Logo /></Link>
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
            <NavLink to='/feed' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <ListIcon type={menuClassifier('icon', feedLink)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', feedLink)}`}>
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
