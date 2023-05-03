import { useRef, FC } from "react";
import { useDispatch } from "../../../hooks/useDispatch";
import { useSelector } from "../../../hooks/useSelector";
import cartItemStyles from "./CartItem.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT, DELETE_INGREDIENT } from "../../../services/actions/cart";
import { dragInsideCart } from "../../../utils/utils";
import { useDrag, useDrop } from "react-dnd";
import { IIngredient } from "../../../constants/constants";

interface ICartItemProps {
  index: number;
  ingredient: IIngredient;
}

const CartItem: FC<ICartItemProps> = ({ index, ingredient }) => {
  const dispatch = useDispatch();
  const constructorList = useSelector(store => store.cart.ingredients);
  const ref = useRef(null);

  function moveIngredient(ingredient: IIngredient | any): void { // any
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

  const onDelete = (item: IIngredient): void => {
    dispatch({
      type: DELETE_INGREDIENT,
      ingredients: constructorList.filter(ingredient => ingredient.key !== item.key)
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
        handleClose={() => onDelete(ingredient)}
      />
    </li>
  );
};

export default CartItem;
