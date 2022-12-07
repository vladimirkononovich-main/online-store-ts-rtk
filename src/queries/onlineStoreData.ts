import { gql } from "@apollo/client";

export const GET_CATEGORY_NAMES = gql`
  query {
    categories {
      name
    }
  }
`;
export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
