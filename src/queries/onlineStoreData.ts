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
export const GET_CATEGORY_PRODUCTS = gql`
  query($categoryId: String!) {
    category(input: { title: $categoryId }) {
      products {
        id
        name
        inStock
        gallery
        category
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    
    }
  }
`;
