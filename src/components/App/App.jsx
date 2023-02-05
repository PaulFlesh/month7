import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from "./App.module.css";
import { getCookie } from "../../utils/utils";
import { getUser } from "../../services/actions/auth";
import { getMenu } from "../../services/actions/menu";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage/IngredientDetailsPage";
import Feed from "../../pages/Feed/Feed";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import ProtectedRoute from "../ProtectedRoute";
import Page404 from "../../pages/Page404/Page404";
import SingleOrderPage from "../../pages/SingleOrderPage/SingleOrderPage";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <Routes location={background ?? location}>
          <Route path="/" element={
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          } />
          <Route path='/feed' element={<Feed />} />
          <Route path="/feed/:id" element={<SingleOrderPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedRoute children={<Profile />} />} />
          <Route path="/profile/orders" element={<ProtectedRoute children={<Profile />} />} />
          <Route path="/profile/orders/:id" element={<ProtectedRoute children={<SingleOrderPage />} />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </main>
    </>
  )
}
