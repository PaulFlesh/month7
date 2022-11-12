import React from "react";
import PropTypes from "prop-types";
import { itemPropTypes } from "../utils/propTypes";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  isBun,
  selectBun,
  getTypesList
} from "../utils/utils";

function Item({ obj, onIngredientClick }) {
  const [state, setState] = React.useState({
    display: false
  });

  const onItemClick = () => {
    const ingredientsArr = [];
    onIngredientClick(obj);
    if (!isBun(obj)) {
      setState({ display: true });
      ingredientsArr.push(obj);
    } else {
      if (ingredientsArr.some((item) => isBun(item))) {
        ingredientsArr.splice(
          ingredientsArr.indexOf(selectBun(ingredientsArr)),
          1
        );
        ingredientsArr.push(obj);
      } else {
        ingredientsArr.push(obj);
      }
    }
  };

  return (
    <li className={burgerIngredientsStyles.item} onClick={onItemClick}>
      <div className={
        state.display
          ? `${burgerIngredientsStyles.counter} ${burgerIngredientsStyles.counter_active}`
          : `${burgerIngredientsStyles.counter}`
      }>
        <Counter count={1} size="default" />
      </div>
      <img src={obj.image} className={`ml-4 mr-4`} />
      <div className={`${burgerIngredientsStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default mr-1`}>{obj.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${burgerIngredientsStyles.name} text text_type_main-default`}>{obj.name}</p>
    </li>
  );
};

function Category({ arr, handleClick }) {
  const [current, setCurrent] = React.useState({});
  const handleIngredientClick = React.useCallback((obj) => {
    handleClick(obj)
    setCurrent({ current: obj._id });
  }, [current]);
  return (
    <ul className={`${burgerIngredientsStyles.grid} ml-4 mr-2`}>
      {arr.map((item) => (
        <Item
          obj={item}
          value={current}
          key={item._id}
          onIngredientClick={handleIngredientClick}
        />
      ))}
    </ul>
  );
};

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={burgerIngredientsStyles.tabs}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Начинки
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Соусы
      </Tab>
    </div>
  );
};

export default function BurgerIngredients({ extData, handleOpenModal }) {
  const [data, setData] = React.useState([]);

  function getTypesList(data) {
    const types = Array.from(data, (item) => item.type).sort();
    for (let i = 0; i < types.length; i = i + 1) {
      while (types[i] === types[i + 1]) {
        types.splice(i, 1);
      }
    }
    return types;
  };

  function getOneTypeArr(data, type) {
    const arr = [];
    data.forEach((item) => {
      if (item.type === type) {
        arr.push(item);
      }
    });
    return arr;
  };

  function sortByTypes(data) {
    const arr = [];
    const types = getTypesList(data);
    types.forEach((type) => {
      arr.push(getOneTypeArr(data, type));
    });
    return arr;
  };

  function getTabTitle(arr) {
    if (arr[0].type === "bun") {
      return "Булки";
    } else if (arr[0].type === "main") {
      return "Начинки";
    } else if (arr[0].type === "sauce") {
      return "Соусы";
    }
  };

  React.useEffect(() => {
    setData(sortByTypes(extData))
  }, [extData]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <h2 className={`${burgerIngredientsStyles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h2>
      <Tabs />
      <div className={`${burgerIngredientsStyles.menu} scrollbar`}>
        {data.map((sortedArr, index) => (
          <div key={index} className={`${burgerIngredientsStyles.container} mt-10`}>
            <h3 className={`${burgerIngredientsStyles.container__title} text text_type_main-medium mb-6`}>
              {getTabTitle(sortedArr)}
            </h3>
            <Category arr={sortedArr} handleClick={handleOpenModal} />
          </div>
        ))}
      </div>
    </section>
  );
};

Category.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes).isRequired,
};

Item.propTypes = {
  obj: itemPropTypes.isRequired,
  value: PropTypes.object.isRequired
};