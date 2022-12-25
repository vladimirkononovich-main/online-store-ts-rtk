import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ErrorHandler from "../../components/ErrorHandler";
import ProductPrice from "../../components/ProductPrice";
import { GET_CATEGORY_PRODUCTS } from "../../queries/onlineStoreData";
import { addProductToCart } from "../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import "./categoryPage.css";

function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {
      categoryId: categoryId!,
    },
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
        <ErrorHandler
          errorMessage={error?.message}
          loading={loading}
          loadingMessage="Loading products..."
        />
        {data?.category?.products.map((product) => {
          const selectedAttrs: { [key: string]: string } = {};

          const attrs = product?.attributes!.map((attr) => {
            return {
              [attr!.id]: attr!.items![0]!.id,
            };
          });
          attrs?.forEach((attr) => {
            const key = Object.keys(attr)[0];
            const value = Object.values(attr)[0];

            selectedAttrs[key] = value;
          });

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
              <button
                className="category__card-btn"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addProductToCart({
                      product: product!,
                      quantity: 1,
                      selectedAttrs,
                    })
                  );
                }}
              ></button>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default CategoryPage;
