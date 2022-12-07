import { useQuery } from "@apollo/client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GET_CATEGORY_NAMES,
  GET_CURRENCIES,
} from "../../queries/onlineStoreData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setCurrencies } from "../../redux/dataSlice";
import "./header.css";
import DropDownCurrencies from "./DropDownCurrencies";
import ErrorHandler from "../../components/ErrorHandler";

interface ICategoryNames {
  name: string;
  __typename: string;
}

function Header() {
  const { loading, error, data } = useQuery(GET_CATEGORY_NAMES);
  const {
    loading: loadingCurrencies,
    error: currenciesError,
    data: currenciesData,
  } = useQuery(GET_CURRENCIES);

  const dispatch = useAppDispatch();
  const { currencies } = useAppSelector((state) => state.onlineStoreData);
  const { pathname } = useLocation();
  const [categoryNames, setCategoryNames] = useState([]);
  const [dropDown, setDropDown] = useState({
    dropDownCurrencies: false,
  });

  useEffect(() => {
    if (!loading) {
      setCategoryNames(data.categories);
    }
  }, [data]);

  useEffect(() => {
    if (!loadingCurrencies) {
      dispatch(setCurrencies(currenciesData.currencies));
    }
  }, [currenciesData]);

  return (
    <div className="header">
      <nav className="header__nav">
        <ErrorHandler
          errorMessage={error?.message}
          loading={loading}
          loadingMessage="Loading category names..."
        />
        {categoryNames.map((category: ICategoryNames) => {
          return (
            <Link
              to={"/category/" + category.name}
              className={classNames("header__category-filter-btn", {
                "header__category-filter-btn_active":
                  pathname.split("/")[2] === category.name,
              })}
              key={category.name}
            >
              {category.name}
            </Link>
          );
        })}
      </nav>
      <div className="header__menu-wrapper">
        <ErrorHandler
          errorMessage={error?.message}
          loading={loadingCurrencies}
          loadingMessage="Loading currencies..."
        />
        <DropDownCurrencies
          currencies={currencies}
          dropDown={dropDown}
          setDropDown={setDropDown}
        />
      </div>
    </div>
  );
}

export default Header;
