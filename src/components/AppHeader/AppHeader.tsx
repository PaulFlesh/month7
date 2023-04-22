import { FC } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, useMatch } from 'react-router-dom';
import appHeaderStyles from "./AppHeader.module.css";
import { menuClassifier } from '../../utils/utils';

const AppHeader: FC = () => {
  const rootLink = useMatch('/');
  const feedLink = useMatch('/feed/*');
  const profileLink = useMatch('/profile/*');
  const registerLink = useMatch('/register');
  const loginLink = useMatch('/login');
  const forgotPassLink = useMatch('/forgot-password');
  const resetPassLink = useMatch('/reset-password');
  const profileLinks = profileLink || registerLink || loginLink || forgotPassLink || resetPassLink;

  return (
    <header className={`${appHeaderStyles.header} mt-5`}>
      <nav className={appHeaderStyles.nav}>
        <Link className={appHeaderStyles.logo} to='/'><Logo /></Link>
        <ul className={appHeaderStyles.list}>
          <li className={appHeaderStyles.item}>
            <NavLink to='/' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <BurgerIcon type={menuClassifier('icon', rootLink?.pathname)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', rootLink?.pathname)}`}>
                Конструктор
              </p>
            </NavLink>
          </li>
          <li className={appHeaderStyles.item}>
            <NavLink to='/feed' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <ListIcon type={menuClassifier('icon', feedLink?.pathname)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', feedLink?.pathname)}`}>
                Лента заказов
              </p>
            </NavLink>
          </li>
          <li className={appHeaderStyles.item}>
            <NavLink to='/profile' className={`${appHeaderStyles.link} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
              <ProfileIcon type={menuClassifier('icon', profileLinks?.pathname)} />
              <p className={`ml-2 text text_type_main-default ${menuClassifier('text', profileLinks?.pathname)}`}>
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
