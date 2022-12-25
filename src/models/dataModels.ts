// export interface IStoreInitialState {
//   currencies: Currency[];
//   currentCurrency: null | {
//     label: string;
//     symbol: string;
//     __typename: string;
//   };
//   cartProducts: ICartProducts[];
// }

import { Product } from "../__generated__/graphql";

export interface ICartProducts {
  product: Product;
  quantity: number;
  selectedAttrs: {
    [key: string]: string;
  };
}

// export interface IProduct {
//   id: string;
//   name: string;
//   inStock: boolean;
//   gallery: string[];
//   category: string;
//   attributes: Attribute[];
//   prices: Price[];
//   brand: string;
//   __typename: string;
// }

// export interface Attribute {
//   id: string;
//   name: string;
//   type: string;
//   items: Item[];
//   __typename: string;
// }

// export interface Item {
//   displayValue: string;
//   value: string;
//   id: string;
//   __typename: string;
// }

// export interface Price {
//   currency: Currency;
//   amount: number;
//   __typename: string;
// }

// export interface Currency {
//   label: string;
//   symbol: string;
//   __typename: string;
// }

// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   inStock: boolean;
//   gallery: string[];
//   description: string;
//   category: string;
//   attributes: Attribute[];
//   prices: Price[];
//   __typename: string;
// }
