import { FC } from "react";
import { useSelector } from "../../../hooks/useSelector";
import singleIngredientStyles from "./SingleIngredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { IIngredient } from "../../../constants/constants";

interface ISingleIngredientProps {
  ingredient: IIngredient
}

const SingleIngredient: FC<ISingleIngredientProps> = ({ ingredient }) => {
  const { selectedBunId } = useSelector(store => store.menu);
  const { ingredients } = useSelector(store => store.cart);

  function count(id: string): number {
    if (selectedBunId === id) {
      return 2;
    } else {
      return ingredients.filter(item => item._id === id).length;
    }
  };

  const [, dragRef] = useDrag({
    type: 'items',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <div ref={dragRef}>
      {count(ingredient._id) > 0 ?
        <Counter count={count(ingredient._id)} size='default' /> : null
      }
      <img src={ingredient.image} className={`ml-4 mr-4`} alt={ingredient.name} />
      <div className={`${singleIngredientStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default text_color_primary mr-1`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${singleIngredientStyles.name} text text_type_main-default text_color_primary`}>{ingredient.name}</p>
    </div>
  );
};

export default SingleIngredient;
