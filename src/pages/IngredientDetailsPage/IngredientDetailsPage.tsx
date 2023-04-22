import { FC } from 'react';
import { useSelector } from '../../hooks/useSelector';
import { useParams } from 'react-router-dom';
import styles from './IngredientDetailsPage.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

const IngredientDetailsPage: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(store => store.menu.items);
  const ingredient = ingredients.find(item => item._id === id);

  return (
    <>
      {ingredient && (
        <div className={`${styles.container} pt-10 pr-10 pb-15 pl-10`} >
          <div className={`${styles.text} text text_type_main-large`} >
            Детали ингредиента
          </div>
          <IngredientDetails ingredient={ingredient} />
        </div>
      )}
    </>
  )
};

export default IngredientDetailsPage;
