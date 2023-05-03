import { useState, FC, SyntheticEvent } from "react";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "../../hooks/useSelector";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useDrop } from "react-dnd";
import { ADD_BUN, ADD_INGREDIENTS, CLEAR_CART } from "../../services/actions/cart";
import { getOrderData } from "../../services/actions/order";
import { isBun, getTotal } from "../../utils/utils";
import { SET_BUN } from "../../services/actions/menu";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from "../../utils/utils";
import { useNavigate } from 'react-router-dom';
import CartItem from "./CartItem/CartItem";
import Modal from "../Modal/Modal";
import OrderDetails from '../OrderDetails/OrderDetails';
import total_currency from "../../images/total_currency.svg";
import { IIngredient } from "../../constants/constants";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorList = useSelector(store => store.cart.ingredients);
  const bun = useSelector(store => store.cart.bun);
  const order = useSelector(store => store.order.order);
  const isAuthorized = useSelector(store => store.auth.isAuthorized);

  function addItemToCart(item: IIngredient): void {
    if (!isBun(item)) {
      if (bun) {
        dispatch({
          type: ADD_INGREDIENTS,
          ingredients: constructorList.concat(item)
        })
      } else {
        alert("Как же без булок?");
      }
    } else {
      dispatch({
        type: SET_BUN,
        id: item._id,
        ingredientType: item.type
      });
      dispatch({
        type: ADD_BUN,
        bun: item
      });
    }
  };

  function getOrderIds(): string[] {
    const arr: string[] = [];
    if (bun) {
      const orderArray = constructorList.concat(bun);
      orderArray.forEach(item => arr.push(item._id));
    }
    return arr;
  };

  const [opened, setOpened] = useState(false);

  function postOrder(e: SyntheticEvent): void {
    e.preventDefault();
    if (getCookie('accessToken') && isAuthorized) {
      setOpened(true);
      dispatch(getOrderData(getOrderIds()));
    } else {
      navigate('/login')
    }
  };

  const [, drop] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      item: monitor.getItem(),
    }),
    drop(ingredient: IIngredient | any) { // any
      addItemToCart({ ...ingredient, key: uuidv4() });
    }
  });

  function closeOrderDetails(): void {
    setOpened(false);
    dispatch({ type: CLEAR_CART });
  };

  if (bun === null) {
    return (
      <section className={`${burgerConstructorStyles.section} mt-25`} ref={drop}>
        <p className={`${burgerConstructorStyles.empty} text text_type_main-medium`}>Перетащите ингредиенты сюда</p>
      </section>
    );
  } else {
    return (
      <section className={`${burgerConstructorStyles.section} mt-25`} ref={drop}>
        <ul className={burgerConstructorStyles.container}>
          <ConstructorElement
            key={bun._id}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            isLocked={true}
            price={bun.price}
            type='top'
            extraClass="ml-5"
          />
          <ul className={burgerConstructorStyles.ingredients__container}>
            {constructorList.map((element, index) => {
              return (
                <CartItem
                  index={index}
                  ingredient={element}
                  key={element.key}
                />);
            })}
          </ul>
          <div >
            <ConstructorElement
              text={bun.name + ' (низ)'}
              thumbnail={bun.image}
              price={bun.price}
              isLocked={true}
              type="bottom"
              extraClass="ml-5"
            />
          </div>
        </ul>
        <div className={`mr-4 mt-10 ${burgerConstructorStyles.total}`}>
          <p className="text text_type_digits-medium mr-2">{getTotal(bun, constructorList)}</p>
          <img className="mr-10 ml-1" src={total_currency} alt="Межгалактические кредиты" />
          <Button htmlType='button'
            type="primary"
            size="large"
            onClick={postOrder}
          >
            Оформить заказ
          </Button>
        </div>
        {opened && (
          <Modal title={order?.number} onClose={closeOrderDetails}>
            <OrderDetails />
          </Modal>
        )}
      </section>
    )
  };
};

export default BurgerConstructor;
