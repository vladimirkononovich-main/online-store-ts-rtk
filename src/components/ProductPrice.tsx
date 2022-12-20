import classNames from "classnames";
import _ from "lodash";
import React from "react";
import "./components.css";
import { Price } from "../models/dataModels";
import { useAppSelector } from "../redux/hooks/hooks";

interface IPrices {
  prices: Price[];
  className?: string;
  view: string;
}

function ProductPrice({ prices, className, view }: IPrices) {
  const { currentCurrency } = useAppSelector((state) => state.onlineStoreData);

  const price = prices.filter((p) => {
    return _.isEqual(p.currency, currentCurrency);
  });

  const classes = {
    price: className + "__product-price"
  }

  return (
    <h3
      className={classNames("price", classes.price, {
        price_normal: view === "normal",
        price_bold: view === "bold",
        price_condensed: view === "condensed",
      })}
    >
      {price[0]?.currency.symbol}
      {price[0]?.amount.toFixed(2)}
    </h3>
  );
}

export default ProductPrice;
