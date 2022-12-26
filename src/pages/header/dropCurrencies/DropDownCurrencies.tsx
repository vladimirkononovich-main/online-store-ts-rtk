import { useQuery } from "@apollo/client";
import classNames from "classnames";
import * as _ from "lodash";
import React, { useEffect } from "react";
import ErrorHandler from "../../../components/ErrorHandler";
import { GET_CURRENCIES } from "../../../queries/onlineStoreData";
import { setCurrentCurrency } from "../../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { IDropDowns } from "../headerModels";
import "./dropDownCurrencies.css";

interface IDropDownCurrenciesProps {
  dropDowns: IDropDowns;
  setDropDown: (value: IDropDowns) => void;
}

function DropDownCurrencies({
  setDropDown,
  dropDowns,
}: IDropDownCurrenciesProps) {
  const { loading, error, data } = useQuery(GET_CURRENCIES);
  const { currentCurrency } = useAppSelector((state) => state.onlineStoreData);
  const dispatch = useAppDispatch();

  if (loading) {
    return (
      <ErrorHandler
        errorMessage={error?.message}
        loading={loading}
        loadingMessage="Loading currencies..."
      />
    );
  }

  return (
    <>
      <h3
        className="currency-label"
        onClick={(e) => {
          e.stopPropagation();
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
          setDropDown({
            dropDownCart: false,
            dropDownCurrencies: !dropDowns.dropDownCurrencies,
          });
        }}
      ></button>
      {dropDowns.dropDownCurrencies && (
        <div className="drop-down-currencies">
          {!loading &&
            data?.currencies!.map((currency, index) => {
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
                    dispatch(setCurrentCurrency(currency!));
                    setDropDown({
                      ...dropDowns,
                      dropDownCurrencies: false,
                    });
                  }}
                >
                  {currency!.symbol}&nbsp;
                  {currency!.label}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default DropDownCurrencies;
