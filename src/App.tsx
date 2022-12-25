import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/cartPage/CartPage";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import Header from "./pages/header/Header";
import ProductPage from "./pages/productPage/ProductPage";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route
            path="category/:categoryId/:productId"
            element={<ProductPage />}
          />
          <Route path="category/:categoryId/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
