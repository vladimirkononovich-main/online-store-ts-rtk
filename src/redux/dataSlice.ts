import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _, { result } from "lodash";
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
