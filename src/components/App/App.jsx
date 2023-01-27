import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from "./App.module.css";
import { getCookie } from "../../utils/utils";
import { getUser } from "../../services/actions/auth";
import { getMenu } from "../../services/actions/menu";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage/IngredientDetailsPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import Page404 from "../../pages/Page404/Page404";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);
  
  const isAuthorized = useSelector(store => store.auth.isAuthorized);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <Routes>
          <Route path="/" element={
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          } />
          <Route path='/orders' element={<Page404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" render={({ location })} element={ //ProtectedRoute не актуален, т.к. router 6 разрешает использовать только Route внутри Routes
            isAuthorized
              ? (<Profile />)
              : (<Navigate to={'/login'}
                state={{ from: location }}
              />)
          } />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </main>
    </>
  );
}
