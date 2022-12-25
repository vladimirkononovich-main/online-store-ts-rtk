import { gql } from '../__generated__/gql'

export const GET_CATEGORY_NAMES = gql(`
  query getCategoryNames{
    categories {
      name
    }
  }
`);
export const GET_CURRENCIES = gql(`
  query getCurrencies{
    currencies {
      label
      symbol
    }
  }
`);
export const GET_CATEGORY_PRODUCTS = gql(`
  query getProducts($categoryId: String!) {
    category(input: { title: $categoryId }) {
      products {
        id
        name
        inStock
        gallery
        category
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
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
`);
export const GET_PRODUCT = gql(`
  query getProduct($productId: String!) {
    product(id: $productId) {
      id
      name
      brand
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`);
