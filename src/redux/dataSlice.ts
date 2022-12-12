import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  Currency,
  ICartProducts,
  IStoreInitialState,
} from "../models/dataModels";

const initialState: IStoreInitialState = {
  currencies: [],
  currentCurrency: null,
  cartProducts: [],
};

export const dataSlice = createSlice({
  name: "onlineStoreData",
  initialState,
  reducers: {
    setCurrencies: (state, action: PayloadAction<Currency[]>) => {
      return {
        ...state,
        currencies: action.payload,
        currentCurrency: action.payload[0],
      };
    },
    setCurrentCurrency: (state, action: PayloadAction<Currency>) => {
      return {
        ...state,
        currentCurrency: action.payload,
      };
    },
    addProductToCart: (state, action: PayloadAction<ICartProducts>) => {
      let isSameProduct = false;
      const products = state.cartProducts.map((p) => {
        if (
          _.isEqual(p.selectedAttrs, action.payload.selectedAttrs) &&
          _.isEqual(p.product, action.payload.product)
        ) {
          isSameProduct = true;
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });

      return {
        ...state,
        cartProducts: isSameProduct
          ? products
          : [...state.cartProducts, action.payload],
      };
    },
  },
});

export const { setCurrencies, setCurrentCurrency, addProductToCart } =
  dataSlice.actions;

export default dataSlice.reducer;
