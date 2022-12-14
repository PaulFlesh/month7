import { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartItemStyles from "./CartItem.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT, DELETE_INGREDIENT } from "../../../services/actions/cart";
import { isBun, setBunType } from "../../utils/utils";
import { DECREASE_COUNTER } from "../../../services/actions/menu";
import { useDrag, useDrop } from "react-dnd";
import { itemPropTypes } from "../../utils/propTypes";
import PropTypes from "prop-types";

export default function CartItem({ index, ingredient, isLocked }) {
  const dispatch = useDispatch();
  const menuItems = useSelector((store) => store.menu.items);
  const ref = useRef(null);

  function moveIngredient(ingredient) {
    dispatch({
      type: MOVE_INGREDIENT,
      id: ingredient._id,
      index: index,
    });
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

  const onDelete = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: ingredient._id
    });
    dispatch({
      type: DECREASE_COUNTER,
      id: ingredient._id,
      items: menuItems
    });
  };

  return (
    <li className={`${cartItemStyles.item} mr-2`} ref={ref}>
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

/*
export default function CartItem({ index, ingredient, position }) {
  const dispatch = useDispatch();
  const menuItems = useSelector(store => store.menu.items);
  const [state, setState] = useState({
    name: ingredient.name,
    price: ingredient.price,
    thumbnail: ingredient.image_mobile,
    type: "",
    isLocked: "",
  });

  const ref = useRef(null);

  function moveIngredient(ingredient) {
    dispatch({
      type: MOVE_INGREDIENT,
      id: ingredient._id,
      index: index
    })
  }

  const [, drop] = useDrop({
    accept: "constructorItems",
    collect: (monitor) => ({
      item: monitor.getItem()
    }),
    drop(id) {
      moveIngredient(id);
    },
  });

  const [, drag] = useDrag({
    type: "constructorItems",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  useMemo(() => {
    setState({
      ...state,
      isLocked: isBun(ingredient),
      type: setBunType(position)
    });
  }, [ingredient]);

  const onDelete = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: ingredient._id
    });
    dispatch({
      type: DECREASE_COUNTER,
      id: ingredient._id,
      items: menuItems
    });
  };

  return (
    <li className={`${cartItemStyles.item} mr-2`} ref={ingredient.type === "bun" ? null : ref} id={index}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={state.isLocked}
        text={state.name}
        price={state.price}
        thumbnail={state.thumbnail}
        handleClose={onDelete}
      />
    </li>
  );
};
*/
CartItem.propTypes = {
  index: PropTypes.number,
  ingredient: itemPropTypes,
  position: PropTypes.string
};
