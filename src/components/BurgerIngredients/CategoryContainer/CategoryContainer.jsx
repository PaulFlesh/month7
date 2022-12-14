import categoryContainerStyles from "./CategoryContainer.module.css";
import SingleIngredient from "../SingleIngredient/SingleIngredient";
import { itemPropTypes } from "../../utils/propTypes";
import PropTypes from "prop-types";

export default function CategoryContainer({ sortedIngredients, openIngredientDetails }) {
  return (
    <ul className={`${categoryContainerStyles.grid} ml-4 mr-2`}>
      {sortedIngredients.map(item => (
        <li className={categoryContainerStyles.item}
          key={item._id}
          onClick={() => openIngredientDetails(item)}
        >
          <SingleIngredient ingredient={item} key={item._id} />
        </li>
      ))}
    </ul>
  );
};

CategoryContainer.propTypes = {
  sortedIngredients: PropTypes.arrayOf(itemPropTypes),
  openIngredientDetails: PropTypes.func
}
