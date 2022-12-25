import classNames from "classnames";
import React from "react";
import { ICartProducts,} from "../models/dataModels";
import { changeProductQuantity, removeProduct } from "../redux/dataSlice";
import { useAppDispatch } from "../redux/hooks/hooks";
import "./components.css";

interface IProductQuantity {
  className: string;
  view: string;
  quantity: number;
  cartProduct: ICartProducts;
}

function ProductQuantity({
  className,
  view,
  quantity,
  cartProduct,
}: IProductQuantity) {
  const dispatch = useAppDispatch();

  const viewCondensed = view === "condensed";
  const viewUncondensed = view === "uncondensed";
  const classes = {
    quantity: className + "__product-quantity",
  };

  return (
    <div
      className={classNames(classes.quantity, {
        quantity_condensed: viewCondensed,
        quantity_uncondensed: viewUncondensed,
      })}
    >
      <button
        onClick={() =>
          dispatch(
            changeProductQuantity({
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            })
          )
        }
        className={classNames({
          "quantity__btn-plus_condensed": viewCondensed,
          "quantity__btn-plus_uncondensed": viewUncondensed,
        })}
      ></button>
      <div
        className={classNames({
          quantity__counter_condensed: viewCondensed,
          quantity__counter_uncondensed: viewUncondensed,
        })}
      >
        {quantity}
      </div>
      {
        <button
          style={{ background: quantity === 1 ? "none" : "" }}
          onClick={() => {
            if (quantity !== 1) {
              dispatch(
                changeProductQuantity({
                  ...cartProduct,
                  quantity: cartProduct.quantity - 1,
                })
              );
            } else {
              dispatch(removeProduct(cartProduct));
            }
          }}
          className={classNames({
            "quantity__btn-minus_condensed": viewCondensed,
            "quantity__btn-minus_uncondensed": viewUncondensed,
          })}
        >
          {quantity === 1 && "del"}
        </button>
      }
    </div>
  );
}

export default ProductQuantity;
