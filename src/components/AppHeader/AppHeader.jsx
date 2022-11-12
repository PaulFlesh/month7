import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <header className={`${appHeaderStyles.header} mt-10`}>
      <nav className={appHeaderStyles.nav}>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <ul className={appHeaderStyles.list}>
          <li className={`${appHeaderStyles.item} pl-5 pr-5 pt-4 pb-4 mt-4 mr-2 mb-4`}>
            <BurgerIcon type="primary"/>
            <p className={`${appHeaderStyles.title} ml-2 text text_type_main-default`}>
              Конструктор
            </p>
          </li>
          <li className={`${appHeaderStyles.item} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
            <ListIcon type="secondary"/>
            <p className={`${appHeaderStyles.title} ml-2 text text_type_main-default text_color_inactive`}>
              Лента заказов
            </p>
          </li>
          <li className={`${appHeaderStyles.item} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
            <ProfileIcon type="secondary"/>
            <p className={`${appHeaderStyles.title} ml-2 text text_type_main-default text_color_inactive`}>
              Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
};
