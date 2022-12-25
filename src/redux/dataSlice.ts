import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _, { result } from "lodash";
import {
  ICartProducts,
  // IStoreInitialState,
} from "../models/dataModels";
import { Currency, GetCurrenciesQuery } from "../__generated__/graphql";

interface IStoreInitialState {
  currencies: GetCurrenciesQuery;
  currentCurrency: Currency | null;
  cartProducts: ICartProducts[];
}

const initialState: IStoreInitialState = {
  currencies: {
    currencies: null,
  },
  currentCurrency: null,
  cartProducts: [],
};

export const dataSlice = createSlice({
  name: "onlineStoreData",
  initialState,
  reducers: {
    setCurrencies: (state, action: PayloadAction<GetCurrenciesQuery>) => {
      return {
        ...state,
        currencies: {
          currencies: action.payload.currencies,
        },
        currentCurrency: action.payload.currencies![0],
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
    changeProductQuantity: (state, action: PayloadAction<ICartProducts>) => {
      const products = state.cartProducts.map((p) => {
        if (
          _.isEqual(p.product, action.payload.product) &&
          _.isEqual(p.selectedAttrs, action.payload.selectedAttrs)
        ) {
          return action.payload;
        }
        return p;
      });

      return { ...state, cartProducts: products };
    },
    removeProduct: (state, action: PayloadAction<ICartProducts>) => {
      const filteredProducts = state.cartProducts.filter((p) => {
        return !_.isEqual(p, action.payload);
      });

      return { ...state, cartProducts: filteredProducts };
    },
  },
});

export const {
  setCurrencies,
  setCurrentCurrency,
  addProductToCart,
  changeProductQuantity,
  removeProduct,
} = dataSlice.actions;

export default dataSlice.reducer;
