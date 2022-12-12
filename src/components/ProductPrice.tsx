import classNames from "classnames";
import _ from "lodash";
import React from "react";
import "./components.css";
import { Currency, Price } from "../models/dataModels";
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

  return (
    <h3
      className={classNames("price", className, {
        price_view_normal: view === "normal",
        price_view_bold: view === "bold",
      })}
    >
      {price[0].currency.symbol}
      {price[0].amount.toFixed(2)}
    </h3>
  );
}

export default ProductPrice;
