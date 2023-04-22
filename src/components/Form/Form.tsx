import { FC, ReactNode, FormEvent } from 'react';
import formStyles from './Form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

interface IForm {
  title: string,
  buttonText: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  children: ReactNode
};

const Form: FC<IForm> = ({ title, buttonText, onSubmit, children }) => {
  return (
    <>
      {title
      ? <h3 className={`text text_type_main-medium ${formStyles.title}`}>{title}</h3>
      : null
      }
      <form onSubmit={onSubmit} className={formStyles.form}>
        {children}
        {buttonText
        ? <Button htmlType='submit' size='medium' type='primary'>{buttonText}</Button>
        : null
        }
      </form>
    </>
  )
};

export default Form;
