import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import singleIngredientStyles from "./SingleIngredient.module.css";
import { isBun } from "../../../utils/utils";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { itemPropTypes } from "../../../utils/propTypes";

export default function SingleIngredient({ ingredient }) {
  const [state, setState] = useState({
    display: false,
    count: 0
  });

  const selectedBun = useSelector(store => store.menu.selectedBunId);

  useMemo(() => {
    if (isBun(ingredient)) {
      setState({ display: ingredient._id === selectedBun ? true : false, count: 1 });
    } else {
      setState({ display: ingredient.count > 0 ? true : false, count: ingredient.count });
    }
  }, [ingredient, selectedBun]
  );

  const [, dragRef] = useDrag({
    type: 'items',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <>
      <div ref={dragRef}>
        <div className={
          ingredient.count > 0
            ? `${singleIngredientStyles.counter} ${singleIngredientStyles.counter_active}`
            : `${singleIngredientStyles.counter}`
        }
        >
          <Counter count={ingredient.count} size="default" />
        </div>
        <img src={ingredient.image} className={`ml-4 mr-4`} alt={ingredient.name} />
        <div className={`${singleIngredientStyles.price} mt-2 mb-2`}>
          <p className={`text text_type_digits-default mr-1`}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${singleIngredientStyles.name} text text_type_main-default`}>{ingredient.name}</p>
      </div>
    </>
  );
};

SingleIngredient.propTypes = {
  ingredient: itemPropTypes
}
