import { useQuery } from "@apollo/client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GET_CATEGORY_NAMES } from "../../queries/onlineStoreData";
import "./header.css";
import DropDownCurrencies from "./dropCurrencies/DropDownCurrencies";
import ErrorHandler from "../../components/ErrorHandler";
import DropDownCart from "./dropCart/DropDownCart";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loading, error, data } = useQuery(GET_CATEGORY_NAMES);
  const [dropDowns, setDropDown] = useState({
    dropDownCurrencies: false,
    dropDownCart: false,
  });

  useEffect(() => {
    if (pathname === "/" && !loading) {
      navigate("/category/" + data?.categories![0]?.name);
    }
  });

  function hideDropDownsKeydown(ev: KeyboardEvent) {
    if (ev.code === "Escape") {
      setDropDown({
        dropDownCurrencies: false,
        dropDownCart: false,
      });
      document.body.removeEventListener("keydown", hideDropDownsKeydown);
      document.body.removeEventListener("click", hideDropDownsClick);
    }
  }
  function hideDropDownsClick(ev: MouseEvent) {
    setDropDown({
      dropDownCurrencies: false,
      dropDownCart: false,
    });
    document.body.removeEventListener("keydown", hideDropDownsKeydown);
    document.body.removeEventListener("click", hideDropDownsClick);
  }

  useEffect(() => {
    if (dropDowns.dropDownCart || dropDowns.dropDownCurrencies) {
      document.body.addEventListener("keydown", hideDropDownsKeydown);
      document.body.addEventListener("click", hideDropDownsClick);
    }
  }, [dropDowns]);

  return (
    <div className="header">
      <nav className="header__nav">
        <ErrorHandler
          errorMessage={error?.message}
          loading={loading}
          loadingMessage="Loading category names..."
        />
        {!loading &&
          data?.categories!.map((category) => {
            return (
              <Link
                to={"/category/" + category!.name}
                className={classNames("header__category-filter-btn", {
                  "header__category-filter-btn_active":
                    pathname.split("/")[2] === category!.name,
                })}
                key={category!.name}
              >
                {category!.name}
              </Link>
            );
          })}
      </nav>
      <div className="header__menu-wrapper">
        <DropDownCurrencies dropDowns={dropDowns} setDropDown={setDropDown} />
        <DropDownCart dropDowns={dropDowns} setDropDown={setDropDown} />
      </div>
    </div>
  );
}

export default Header;
