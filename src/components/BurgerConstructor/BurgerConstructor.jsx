import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useDrop } from "react-dnd";
import { ADD_BUN, ADD_INGREDIENTS, SET_TOTAL_PRICE } from "../../services/actions/cart";
import { getOrderData } from "../../services/actions/order";
import { isBun, getTotal } from "../../utils/utils";
import { SET_BUN, INCREASE_COUNTER } from "../../services/actions/menu";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from "../../utils/utils";
import { useNavigate } from 'react-router-dom';
import CartItem from "./CartItem/CartItem";
import Modal from "../Modal/Modal";
import OrderDetails from '../OrderDetails/OrderDetails';
import total_currency from "../../images/total_currency.svg";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector(store => store.menu.items);
  const constructorList = useSelector(store => store.cart.ingredients);
  const bun = useSelector(store => store.cart.bun);
  const selectedBun = Object.keys(bun).length !== 0;
  const orderNumber = useSelector(store => store.order.order.number);
  const isAuthorized = useSelector(store => store.auth.isAuthorized);

  function getOrderIds() {
    const arr = [];
    const orderArray = constructorList.concat(bun);
    orderArray.forEach((item) => {
      arr.push(item._id);
    });
    return arr;
  }

  function addItemToCart(item) {
    if (!isBun(item)) {
      if (bun !== undefined) {
        dispatch({
          type: ADD_INGREDIENTS,
          item: item
        });
        dispatch({
          type: INCREASE_COUNTER,
          id: item._id,
          items: ingredients
        });
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
    dispatch({
      type: SET_TOTAL_PRICE,
      totalPrice: getTotal(bun, constructorList)
    });
  };

  function TotalPrice() {
    const bunPrice = bun.price * 2;
    const ingredientsPrice = constructorList.reduce((acc, item) => acc + item.price, 0);
    const price = bunPrice + ingredientsPrice;
    return (
      <p className={"text text_type_digits-medium mr-2"}>{price.toFixed(0)}</p>
    );
  };

  const [opened, setOpened] = useState(false);

  function postOrder() {
    if (getCookie('accessToken') && isAuthorized) {
      dispatch(getOrderData(getOrderIds()));
      setOpened(true)
    } else {
      navigate('/login')
    }
  };

  const [, drop] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      item: monitor.getItem(),
    }),
    drop(ingredient) {
      addItemToCart({ ...ingredient, key: uuidv4() });
    }
  });

  function closeOrderDetails() {
    setOpened(false)
  };

  if (selectedBun === false) {
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
            ingredient={bun}
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
          <TotalPrice />
          <img className="mr-10 ml-1" src={total_currency} alt="Межгалактические кредиты" />
          <Button htmlType='button'
            type="primary"
            size="large"
            onClick={postOrder}
          >
            Оформить заказ
          </Button>
        </div>
        {orderNumber && (
          <Modal title={orderNumber} onClose={closeOrderDetails}>
            <OrderDetails />
          </Modal>
        )}
      </section>
    )
  };
};
