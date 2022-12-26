import _ from "lodash";
import React, { useState } from "react";
import ProductAttribute from "../../components/ProductAttributes";
import ProductPrice from "../../components/ProductPrice";
import ProductQuantity from "../../components/ProductQuantity";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Maybe, Scalars } from "../../__generated__/graphql";
import "./cartPage.css";

type Gallery = Maybe<Array<Maybe<Scalars["String"]>>>;

function ProductImg({ gallery }: { gallery: Gallery }) {
  const [index, setIndex] = useState(0);

  const changeCurrentImg = (gallery: Gallery, arg: number): void => {
    if (gallery!.length - 1 === index && arg === +1) {
      setIndex(0);
      return;
    }
    if (index === 0 && arg === -1) {
      setIndex(gallery!.length - 1);
      return;
    }
    setIndex(index + arg);
  };

  return (
    <>
      <img
        className="cart__product-img"
        src={gallery![index]!}
        alt="not loaded"
      />
      {gallery!.length > 1 && (
        <>
          <button
            className="cart__prev-img-btn"
            onClick={() => changeCurrentImg(gallery!, -1)}
          ></button>
          <button
            className="cart__next-img-btn"
            onClick={() => changeCurrentImg(gallery!, +1)}
          ></button>
        </>
      )}
    </>
  );
}

function CartPage() {
  const { cartProducts, currentCurrency } = useAppSelector(
    (state) => state.onlineStoreData
  );

  const cartProductsQuantity = cartProducts.reduce(
    (sum, current) => sum + current.quantity,
    0
  );

  const productPrices = cartProducts.map((p) => {
    const currentPrice = p.product.prices.filter((price) => {
      return _.isEqual(price.currency, currentCurrency);
    });
    return currentPrice[0].amount * p.quantity;
  });

  const totalPrice = productPrices.reduce((sum, current) => sum + current, 0);

  return (
    <div className="cart">
      <h2 className="cart__title">cart</h2>
      {!cartProducts.length && (
        <h2 style={{ marginLeft: 95 }}>Cart is empty</h2>
      )}

      <div className="cart__products">
        {cartProducts.map((product, index) => {
          const { gallery, brand, name, prices, attributes } = product.product;
          return (
            <div className="cart__product" key={index}>
              <div className="cart__product-info">
                <h3 className="cart__product-brand">{brand}</h3>
                <h3 className="cart__product-name">{name}</h3>
                <ProductPrice
                  prices={prices}
                  view="uncondensed"
                  className="cart"
                />
                {attributes!.map((attr, index) => {
                  return (
                    <ProductAttribute
                      key={index}
                      attribute={attr!}
                      attributes={product.selectedAttrs}
                      className="cart"
                      view="uncondensed"
                    />
                  );
                })}
              </div>
              <ProductQuantity
                cartProduct={product}
                quantity={product.quantity}
                className="cart"
                view="uncondensed"
              />
              <ProductImg gallery={gallery!} />
            </div>
          );
        })}
      </div>
      {cartProductsQuantity > 0 && (
        <>
          <div className="cart__product-checks">
            <div className="cart__product-check-titles">
              <p className="cart__check-title">Tax 21%:</p>
              <p className="cart__check-title">Quantity:</p>
              <p className="cart__check-title">Total:</p>
            </div>
            <div className="cart__product-check-counts">
              <p className="cart__check-count">
                {currentCurrency?.symbol}
                {(totalPrice * (21 / 100)).toFixed(2)}
              </p>
              <p className="cart__check-count">{cartProductsQuantity}</p>
              <p className="cart__check-count">
                {currentCurrency?.symbol}
                {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <button className="cart__order-btn">order</button>
        </>
      )}
    </div>
  );
}

export default CartPage;
