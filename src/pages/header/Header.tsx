import { useQuery } from "@apollo/client";
import classNames from "classnames";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GET_CATEGORY_NAMES,
  GET_CURRENCIES,
} from "../../queries/onlineStoreData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setCurrencies } from "../../redux/dataSlice";
import "./header.css";
import DropDownCurrencies from "./dropCurrencies/DropDownCurrencies";
import ErrorHandler from "../../components/ErrorHandler";
import DropDownCart from "./dropCart/DropDownCart";

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
  const [dropDowns, setDropDown] = useState({
    dropDownCurrencies: false,
    dropDownCart: false,
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

  const hideDropDowns = () => {
    setDropDown({ dropDownCart: false, dropDownCurrencies: false });
    // document.body.removeEventListener("click", hideDropDowns);
  };

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
          dropDowns={dropDowns}
          setDropDown={setDropDown}
          hideDropDowns={hideDropDowns}
        />
        <DropDownCart
          dropDowns={dropDowns}
          setDropDown={setDropDown}
          hideDropDowns={hideDropDowns}
        />
      </div>
    </div>
  );
}

export default Header;
