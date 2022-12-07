import classNames from "classnames";
import * as _ from "lodash";
import React from "react";
import { Currencies, setCurrentCurrency } from "../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import "./dropDownCurrencies.css";

interface IDropDownCurrenciesProps {
  currencies: Currencies[];
  dropDown: {
    dropDownCurrencies: boolean;
  };
  setDropDown: (value: { dropDownCurrencies: boolean }) => void;
}

function DropDownCurrencies({
  currencies,
  setDropDown,
  dropDown,
}: IDropDownCurrenciesProps) {
  const { currentCurrency } = useAppSelector((state) => state.onlineStoreData);
  const dispatch = useAppDispatch();

  return (
    <>
      <h3 className="currency-label">{currentCurrency?.symbol}</h3>
      <button
        className={classNames("currency-switcher-btn", {
          "currency-switcher-btn_active": dropDown.dropDownCurrencies,
        })}
        onClick={() =>
          setDropDown({
            ...dropDown,
            dropDownCurrencies: !dropDown.dropDownCurrencies,
          })
        }
      ></button>
      {dropDown.dropDownCurrencies && (
        <div className="drop-down-currencies">
          {currencies.map((currency, index) => {
            return (
              <div
                className={classNames("drop-down-currencies__btn", {
                  "drop-down-currencies__btn_active": _.isEqual(
                    currency,
                    currentCurrency
                  ),
                })}
                key={index}
                onClick={() => {
                  dispatch(setCurrentCurrency(currency));
                  setDropDown({
                    ...dropDown,
                    dropDownCurrencies: false,
                  });
                }}
              >
                {currency.symbol}&nbsp;
                {currency.label}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default DropDownCurrencies;
