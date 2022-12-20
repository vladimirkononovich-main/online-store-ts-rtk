import _ from "lodash";
import React from "react";
import ProductAttribute from "../../../components/ProductAttributes";
import ProductPrice from "../../../components/ProductPrice";
import ProductQuantity from "../../../components/ProductQuantity";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { IDropDowns } from "../headerModels";
import "./dropDownCart.css";

interface IDropDownCartProps {
  dropDowns: IDropDowns;
  setDropDown: (value: IDropDowns) => void;
  hideDropDowns: () => void;
}

function DropDownCart({
  dropDowns,
  setDropDown,
  hideDropDowns,
}: IDropDownCartProps) {
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
    <>
      <button
        className="drop-down-cart-btn"
        onClick={(e) => {
          e.stopPropagation();
          // document.body.addEventListener("click", hideDropDowns);
          setDropDown({
            dropDownCurrencies: false,
            dropDownCart: !dropDowns.dropDownCart,
          });
        }}
      >
        {cartProductsQuantity > 0 && (
          <h3 className="drop-down-cart-btn__counter">
            {cartProductsQuantity}
          </h3>
        )}
      </button>
      {dropDowns.dropDownCart && (
        <>
          <div className="backdrop"></div>
          <div className="drop-down-cart">
            <h3 className="drop-down-cart__title">
              My Bag
              {cartProductsQuantity > 0 && (
                <span style={{ fontWeight: 500 }}>
                  , {cartProductsQuantity} items
                </span>
              )}
            </h3>

            {cartProductsQuantity > 0 && (
              <>
                <div className="drop-down-cart__products-wrapper">
                  {cartProducts.map((p, index) => {
                    return (
                      <div className="drop-down-cart__product" key={index}>
                        <div className="drop-down-cart__product-info">
                          <h3 className="drop-down-cart__product-brand">
                            {p.product.brand}
                          </h3>
                          <h3 className="drop-down-cart__product-name">
                            {p.product.name}
                          </h3>
                          <ProductPrice
                            prices={p.product.prices}
                            view="condensed"
                            className="drop-down-cart"
                            key={index}
                          />
                          {p.product.attributes.map((attr, index2) => {
                            return (
                              <ProductAttribute
                                attribute={attr}
                                attributes={p.selectedAttrs}
                                view="condensed"
                                className="drop-down-cart"
                                key={index2}
                              />
                            );
                          })}
                        </div>
                        <ProductQuantity
                          cartProduct={p}
                          quantity={p.quantity}
                          className="drop-down-cart"
                          view="condensed"
                        />
                        <img
                          className="drop-down-cart__product-img"
                          src={p.product.gallery[0]}
                          alt="not loaded"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="drop-down-cart__total-wrapper">
                  <h3 className="drop-down-cart__total-title">Total</h3>
                  <h3 className="drop-down-cart__total-price">
                    {currentCurrency?.symbol}
                    {totalPrice.toFixed(2)}
                  </h3>
                </div>
                <div className="drop-down-cart__btns-wrapper">
                  <button className="drop-down-cart__view-bag-btn">
                    view bag
                  </button>
                  <button className="drop-down-cart__check-out-btn">
                    check out
                  </button>
                </div>
              </>
            )}
            {cartProductsQuantity === 0 && <h1>Cart is empty</h1>}
          </div>
        </>
      )}
    </>
  );
}

export default DropDownCart;
