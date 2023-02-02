import categoryContainerStyles from "./CategoryContainer.module.css";
import { useLocation, Link } from "react-router-dom";
import SingleIngredient from "../SingleIngredient/SingleIngredient";
import { itemPropTypes } from "../../../utils/propTypes";
import PropTypes from "prop-types";

export default function CategoryContainer({ sortedIngredients, openIngredientDetails }) {
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

CategoryContainer.propTypes = {
  sortedIngredients: PropTypes.arrayOf(itemPropTypes),
  openIngredientDetails: PropTypes.func
}
