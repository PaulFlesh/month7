import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartItemStyles from "./CartItem.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT, DELETE_INGREDIENT, SET_TOTAL_PRICE } from "../../../services/actions/cart";
import { dragInsideCart, deleteIngredient, decreaseCounter, getTotal } from "../../../utils/utils";
import { DECREASE_COUNTER } from "../../../services/actions/menu";
import { useDrag, useDrop } from "react-dnd";
import { itemPropTypes } from "../../../utils/propTypes";
import PropTypes from "prop-types";

export default function CartItem({ index, ingredient }) {
  const dispatch = useDispatch();
  const menuItems = useSelector(store => store.menu.items);
  const bun = useSelector(store => store.cart.bun);
  const constructorList = useSelector(store => store.cart.ingredients);
  const ref = useRef(null);

  function moveIngredient(ingredient) {
    dispatch({
      type: MOVE_INGREDIENT,
      ingredients: dragInsideCart(constructorList, ingredient._id, index)
    })
  };

  const [, drop] = useDrop({
    accept: "constructorItems",
    collect: (monitor) => ({
      item: monitor.getItem()
    }),
    drop(itemId) {
      moveIngredient(itemId);
    },
  });

  const [, drag] = useDrag({
    type: "constructorItems",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  drag(drop(ref));

  const onDelete = (index, id) => {
    dispatch({
      type: DELETE_INGREDIENT,
      ingredients: deleteIngredient(constructorList, index)
    });
    dispatch({
      type: DECREASE_COUNTER,
      items: decreaseCounter(menuItems, id)
    });
    dispatch({
      type: SET_TOTAL_PRICE,
      totalPrice: getTotal(bun, constructorList)
    })
  };

  return (
    <li className={`${cartItemStyles.item} mr-2`} ref={ref} key={ingredient.key}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onDelete(index, ingredient._id)}
      />
    </li>
  );
};

CartItem.propTypes = {
  index: PropTypes.number,
  ingredient: itemPropTypes
}
