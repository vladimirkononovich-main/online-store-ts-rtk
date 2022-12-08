import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import Header from "./pages/header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default App;
