import { Product } from "../__generated__/graphql";

export interface ICartProducts {
  product: Product ;
  quantity: number;
  selectedAttrs: {
    [key: string]: string;
  };
}

