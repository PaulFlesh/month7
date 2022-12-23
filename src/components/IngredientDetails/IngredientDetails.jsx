import ingredientDetailsStyles from './IngredientDetails.module.css';
import { itemPropTypes } from "../../utils/propTypes";

export default function IngredientDetails({ ingredient }) {
  return (
    <div className={`${ingredientDetailsStyles.container}`} >
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={`${ingredientDetailsStyles.image} mb-4`}
      />
      <h3 className={`mb-8 text text_type_main-medium`}>
        {ingredient.name}
      </h3>
      <ul className={ingredientDetailsStyles.nutrients} >
        <li className={`${ingredientDetailsStyles.nutrient} ml-5`}>
          <p className={`text text_type_main-default mb-2`} >
            Калории,&nbsp;ккал
          </p>
          <p className={`text text_type_digits-default`} >
            {ingredient.calories}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.nutrient} ml-5`}>
          <p className={`text text_type_main-default mb-2`} >
            Белки, г
          </p>
          <p className={`text text_type_digits-default`} >
            {ingredient.proteins}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.nutrient} ml-5`}>
          <p className={`text text_type_main-default mb-2`} >
            Жиры, г
          </p>
          <p className={`text text_type_digits-default`} >
            {ingredient.fat}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.nutrient} ml-5`}>
          <p className={`text text_type_main-default mb-2`} >
            Углеводы, г
          </p>
          <p className={`text text_type_digits-default`} >
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: itemPropTypes
};
