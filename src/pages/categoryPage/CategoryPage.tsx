import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GET_CATEGORY_PRODUCTS } from "../../queries/onlineStoreData";
import { useAppSelector } from "../../redux/hooks/hooks";
import "./categoryPage.css";
import { IProduct, Price } from "./models";

function CategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const { currentCurrency } = useAppSelector((state) => state.onlineStoreData);
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {
      categoryId,
    },
  });

  useEffect(() => {
    if (!loading) {
      setProducts(data.category.products);
    }
  });

  if (loading) {
    return (
      <main className="category">
        <h2 className="category__name">{categoryId}</h2>
        <h3>Category is loading..</h3>
      </main>
    );
  }
  return (
    <main className="category">
      <h2 className="category__name">{categoryId}</h2>
      <div className="category-cards-wrapper">
        {loading && <h1>Products is loading..</h1>}
        {products?.map((product: IProduct) => {
          const price = product.prices.filter((p) => {
            return _.isEqual(p.currency, currentCurrency);
          });
          
          return (
            <div className="category__card" key={product.id}>
              <img
                src={product.gallery[0]}
                alt="Img not loaded"
                className="category__card-img"
              />
              <h3 className="category__card-name">
                {product.brand}&nbsp;{product.name}
              </h3>
              <h3 className="category__card-price">
                {price[0].currency.symbol}{(price[0].amount).toFixed(2)}
              </h3>
              <button className="category__card-btn"></button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default CategoryPage;
