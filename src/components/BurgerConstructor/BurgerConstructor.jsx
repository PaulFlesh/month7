import React from "react";
import PropTypes from "prop-types";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { itemPropTypes } from "../utils/propTypes";
import { isBun, selectBun } from "../utils/utils";
import total_currency from "../../images/total_currency.svg";

function CartItem({ obj, position }) {
  const [state, setState] = React.useState({
    name: obj.name,
    price: obj.price,
    thumbnail: obj.image,
    type: "",
    isLocked: "",
  });

  function lockBun() {
    isBun(obj)
      ? setState({ ...state, isLocked: true })
      : setState({ ...state, isLocked: false });
  };

  function setBunState() {
    if (position === "first") {
      setState({ ...state, type: "top" });
    } else if (position === "last") {
      setState({ ...state, type: "bottom" });
    } else {
      setState({ ...state, type: undefined });
    }
  };

  React.useEffect(() => {
    lockBun();
  }, [state.type]);

  React.useEffect(() => {
    setBunState();
  }, []);

  function addTag() {
    if (state.type === "top") {
      return "(верх)";
    } else if (state.type === "bottom") {
      return "(низ)";
    } else {
      return "";
    }
  }

  return (
    <li className={`${burgerConstructorStyles.item} mr-4`}>
      {state.type === undefined && <DragIcon />}
      <ConstructorElement
        type={state.type}
        isLocked={state.isLocked}
        text={`${state.name} ${addTag()}`}
        price={state.price}
        thumbnail={state.thumbnail}
      />
    </li>
  );
};

function ConstructorContainer({ arr }) {
  function excludeBun(arr) {
    const newArr = JSON.parse(JSON.stringify(arr));
    const bun = newArr.find((el) => isBun(el));
    newArr.splice(newArr.indexOf(bun), 1);
    return newArr;
  };
  
  if (arr.length === 0) {
    return <span className={`${burgerConstructorStyles.span} text text_type_main-default`}>Добавьте ингредиенты</span>;
  } else {
    return (
      <ul className={burgerConstructorStyles.container}>
        <CartItem
          obj={selectBun(arr)}
          position={"first"}
          key={`${selectBun(arr)._id}-top`}
        />
        <ul className={burgerConstructorStyles.ingredients__container}>
          {excludeBun(arr).map((obj) => {
            return (
              <CartItem
                obj={obj}
                key={obj._id}
              />
            );
          })}
        </ul>
        <CartItem
          obj={selectBun(arr)}
          position={"last"}
          key={`${selectBun(arr)._id}-bottom`}
        />
      </ul>
    );
  }
};

export default function BurgerConstructor({ extData, handleOpenModal }) {
  const [data, setData] = React.useState([]);
  function mapCartList(arr) {
    if (arr.length !== 0) {
      const newArr = JSON.parse(JSON.stringify(arr));
      const bun = selectBun(newArr);
      const arrWithoutBun = newArr.filter((item) => !isBun(item));
      return arrWithoutBun.concat(bun);
    } else { return [] }
  };

  React.useEffect(() => {
    setData(mapCartList(extData));
  }, [extData]);

  function getTotal(cart) {
    if (cart.length !== 0) {
      const sumBunPrice = Array.from(cart, (el) => {
        if (isBun(el)) {
          return el.price * 2;
        } else {
          return el.price;
        }
      });
      return sumBunPrice.reduce((prev, res) => {
        return prev + res;
      }, 0);
    }
  };

  return (
    <section className={`${burgerConstructorStyles.section} mt-25`}>
      <ConstructorContainer arr={data} />
      <div className={`mr-4 mt-10 ${burgerConstructorStyles.total}`}>
        <p className={"text text_type_digits-medium mr-2"}>
          {getTotal(data)}
        </p>
        <img className="mr-10 ml-1" src={total_currency} alt="Межгалактические кредиты" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

ConstructorContainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes).isRequired
};

CartItem.propTypes = {
  obj: itemPropTypes.isRequired,
  position: PropTypes.string
};