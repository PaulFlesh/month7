import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartItemStyles from "./CartItem.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT, DELETE_INGREDIENT } from "../../../services/actions/cart";
import { dragInsideCart, deleteIngredient } from "../../../utils/utils";
import { DECREASE_COUNTER } from "../../../services/actions/menu";
import { useDrag, useDrop } from "react-dnd";
import { itemPropTypes } from "../../../utils/propTypes";
import PropTypes from "prop-types";

export default function CartItem({ index, ingredient, isLocked }) {
  const dispatch = useDispatch();
  const menuItems = useSelector((store) => store.menu.items);
  const constructorList = useSelector(store => store.cart.ingredients);
  const ref = useRef(null);

  function moveIngredient(ingredient) {
    dispatch({
      type: MOVE_INGREDIENT,
      ingredients: dragInsideCart(constructorList, ingredient._id, index)
    })
  }

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

  const onDelete = (key) => {
    dispatch({
      type: DELETE_INGREDIENT,
      key: deleteIngredient(constructorList, ingredient.key)
    });
    dispatch({
      type: DECREASE_COUNTER,
      id: ingredient._id,
      items: menuItems
    });
  };

  return (
    <li className={`${cartItemStyles.item} mr-2`} ref={ref} key={ingredient.key}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={isLocked}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={onDelete}
      />
    </li>
  );
};

CartItem.propTypes = {
  index: PropTypes.number,
  ingredient: itemPropTypes,
  position: PropTypes.string
}
