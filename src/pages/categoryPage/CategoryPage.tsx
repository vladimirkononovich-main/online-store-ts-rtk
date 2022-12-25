import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ErrorHandler from "../../components/ErrorHandler";
import ProductPrice from "../../components/ProductPrice";
import { GET_CATEGORY_PRODUCTS } from "../../queries/onlineStoreData";
import { useAppSelector } from "../../redux/hooks/hooks";
import "./categoryPage.css";
// import { IProduct, Price } from "../../models/dataModels";

function CategoryPage() {
  const { categoryId } = useParams();
  // const [products, setProducts] = useState([]);
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {
      categoryId: categoryId || "",
    },
  });

  // useEffect(() => {
  //   if (!loading) {
  //     setProducts(data?.category?.products);
  //   }
  // });

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
        <ErrorHandler
          errorMessage={error?.message}
          loading={loading}
          loadingMessage="Loading products..."
        />
        {data?.category?.products.map((product) => {
          return (
            <Link to={product!.id} className="category__card" key={product!.id}>
              <img
                src={product?.gallery![0]!}
                alt="Img not loaded"
                className="category__card-img"
              />
              <h3 className="category__card-name">
                {product!.brand}&nbsp;{product!.name}
              </h3>
              <ProductPrice
                prices={product!.prices}
                className="category"
                view="normal"
              />
              <button className="category__card-btn"></button>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default CategoryPage;
