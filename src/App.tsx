import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import Header from "./pages/header/Header";
import ProductPage from "./pages/productPage/ProductPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/category/:categoryId/:productId" element={<ProductPage />} />

      </Routes>
    </>
  );
}

export default App;
