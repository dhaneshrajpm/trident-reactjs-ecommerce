import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch } from "react-redux";

import styles from './App.module.scss';
import { getCollectionFromStore } from "./firestore/firestore.utils";
import { setProducts } from "./store/productSlice";

const Navigation = lazy(() => import('./components/Navigation'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NoMatch = lazy(() => import('./pages/NoMatch'));
const Shop = lazy(() => import('./pages/Shop'));
const Catagories = lazy(() => import('./pages/Shop/Category'));
const CategoryPreview = lazy(() => import('./pages/Shop/CategoryPreview'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCollectionFromStore().then((products) => dispatch(setProducts(products)));
  }, [dispatch]);

  return (
    <Suspense fallback={<div className={styles.loading}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />}>
            <Route index element={<Catagories />} />
            <Route path=':categoryId' element={<CategoryPreview />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="signin" element={<Login />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Suspense>
  )
};

export default App;

