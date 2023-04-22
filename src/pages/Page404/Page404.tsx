import { FC } from 'react';
import Page404Styles from './Page404.module.css';

const Page404: FC = () => {
  return (
    <h3 className={`text text_type_main-large mt-10 ${Page404Styles.error_text}`}>
      Такой страницы не существует
    </h3>
  )
};

export default Page404;
