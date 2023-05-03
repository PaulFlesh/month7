import { FC, useEffect, useState, useRef, RefObject } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { useNavigate } from 'react-router-dom';
import { useInView } from "react-intersection-observer";
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../../services/actions/menu";
import Modal from "../Modal/Modal";
import Tabs from "./Tabs/Tabs";
import CategoryContainer from "./CategoryContainer/CategoryContainer";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IIngredient } from "../../constants/constants";
import { useSelector } from "../../hooks/useSelector";
import { useDispatch } from "../../hooks/useDispatch";

const BurgerIngredients: FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, ingredientDetailsModal } = useSelector(store => store.menu);
  const buns = items.filter(item => item.type === 'bun');
  const fills = items.filter(item => item.type === 'main');
  const sauces = items.filter(item => item.type === 'sauce');

  function openIngredientDetails(ingredient: IIngredient): void {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      ingredient: ingredient
    });
    setOpened(true)
  };

  function closeIngredientDetails(): void {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
    setOpened(false);
    navigate(-1)
  };

  useEffect(() => {
    let url = window.location.href;
    let sections = url.split('/');
    let lastSection = sections.pop() || sections.pop();
    const ingredient = items.find(item => item._id === lastSection);
    if (ingredient !== undefined) {
      openIngredientDetails(ingredient)
    }
  }, [dispatch, items]); // eslint-disable-line

  const {ref: bunsRef, inView: bunsInView} = useInView({threshold: 0});
  const {ref: mainsRef, inView: mainsInView} = useInView({threshold: 0});
  const {ref: saucesRef, inView: saucesInView} = useInView({threshold: 0});
  
  const bunsHeading: RefObject<HTMLDivElement> = useRef(null);
  const mainsHeading: RefObject<HTMLDivElement> = useRef(null);
  const saucesHeading: RefObject<HTMLDivElement> = useRef(null);

  const [currentTab, setCurrentTab] = useState("one");

  useEffect(() => {
    if (bunsInView) {
      setCurrentTab("one");
    } else if (mainsInView) {
      setCurrentTab("two");
    } else {
      setCurrentTab("three");
    }
  }, [bunsInView, mainsInView, saucesInView]);

  function setCategoryPosition(pos: RefObject<HTMLDivElement>): void {
    pos?.current?.scrollIntoView();
  };

  function setTabByClick(tab: string): void {
    setCurrentTab(tab);
    if (tab === "one") {
      setCategoryPosition(bunsHeading)
    } else if (tab === "two") {
      setCategoryPosition(mainsHeading)
    } else if (tab === "three") {
      setCategoryPosition(saucesHeading)
    }
  };

  return (
    <section className={burgerIngredientsStyles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h2>
      <Tabs currentTab={currentTab} setCurrentTab={setTabByClick} />
      <div className={`${burgerIngredientsStyles.menu} scrollbar`}>
        <div className="pt-3" ref={bunsRef}>
          <h2 className={'text text_type_main-medium pb-6 pt-7'} id='bun' ref={bunsHeading}>Булки</h2>
          <CategoryContainer sortedIngredients={buns} openIngredientDetails={openIngredientDetails} />
        </div>
        <div className="pt-3" ref={mainsRef}>
          <h2 className={'text text_type_main-medium pb-6 pt-7'} id='main' ref={mainsHeading}>Начинки</h2>
          <CategoryContainer sortedIngredients={fills} openIngredientDetails={openIngredientDetails} />
        </div>
        <div className="pt-3" ref={saucesRef}>
          <h2 className={'text text_type_main-medium pb-6 pt-7'} id='sauce' ref={saucesHeading}>Соусы</h2>
          <CategoryContainer sortedIngredients={sauces} openIngredientDetails={openIngredientDetails} />
        </div>
      </div>
      {opened ?
        <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
          <IngredientDetails ingredient={ingredientDetailsModal} />
        </Modal> : null
      }
    </section>
  )
};

export default BurgerIngredients;
