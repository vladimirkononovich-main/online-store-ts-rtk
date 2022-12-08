import classNames from "classnames";
import * as _ from "lodash";
import React, { useEffect } from "react";
import { Currencies, setCurrentCurrency } from "../../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { IDropDowns } from "../models";
import "./dropDownCurrencies.css";

interface IDropDownCurrenciesProps {
  currencies: Currencies[];
  dropDowns: IDropDowns;
  setDropDown: (value: IDropDowns) => void;
  hideDropDowns: () => void;
}

function DropDownCurrencies({
  currencies,
  setDropDown,
  dropDowns,
  hideDropDowns,
}: IDropDownCurrenciesProps) {
  const { currentCurrency } = useAppSelector((state) => state.onlineStoreData);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   document.body.addEventListener("click", hideDropDowns);
  // }, []);

  return (
    <>
      <h3
        className="currency-label"
        onClick={(e) => {
          e.stopPropagation();
          document.body.addEventListener("click", hideDropDowns);
          document.body.addEventListener("keydown", hideDropDowns);

          setDropDown({
            dropDownCart: false,
            dropDownCurrencies: !dropDowns.dropDownCurrencies,
          });
        }}
      >
        {currentCurrency?.symbol}
      </h3>
      <button
        className={classNames("currency-switcher-btn", {
          "currency-switcher-btn_active": dropDowns.dropDownCurrencies,
        })}
        onClick={(e) => {
          e.stopPropagation();
          document.body.addEventListener("click", hideDropDowns);
          setDropDown({
            dropDownCart: false,
            dropDownCurrencies: !dropDowns.dropDownCurrencies,
          });
        }}
      ></button>
      {dropDowns.dropDownCurrencies && (
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
                    ...dropDowns,
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
