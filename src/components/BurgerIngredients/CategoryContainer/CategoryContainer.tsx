import { FC } from "react";
import categoryContainerStyles from "./CategoryContainer.module.css";
import { useLocation, Link } from "react-router-dom";
import SingleIngredient from "../SingleIngredient/SingleIngredient";
import { IIngredient } from "../../../constants/constants";

interface ICategoryContainerProps {
  sortedIngredients: IIngredient[],
  openIngredientDetails(item: IIngredient): void
}

const CategoryContainer: FC<ICategoryContainerProps> = ({ sortedIngredients, openIngredientDetails }) => {
  const location = useLocation();
  
  return (
    <ul className={`${categoryContainerStyles.grid} ml-4 mr-2`}>
      {sortedIngredients.map(item => (
        <li className={categoryContainerStyles.item}
          key={item._id}
          onClick={() => {openIngredientDetails(item)}}
        >
          <Link to={`/ingredients/${item._id}`}
            state={{ background: location }}
            className={categoryContainerStyles.link}>
            <SingleIngredient ingredient={item} key={item._id} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryContainer;
