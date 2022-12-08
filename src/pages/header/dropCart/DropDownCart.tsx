import React from "react";
import { IDropDowns } from "../models";
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
  return (
    <>
      <button
        className="drop-down-cart-btn"
        onClick={(e) => {
          e.stopPropagation();
          document.body.addEventListener("click", hideDropDowns);
          setDropDown({
            dropDownCurrencies: false,
            dropDownCart: !dropDowns.dropDownCart,
          });
        }}
      >
        <h3 className="drop-down-cart-btn__counter">3</h3>
      </button>
      {dropDowns.dropDownCart && <div className="drop-down-cart"></div>}
    </>
  );
}

export default DropDownCart;
