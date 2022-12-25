/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query getCategoryNames{\n    categories {\n      name\n    }\n  }\n": types.GetCategoryNamesDocument,
    "\n  query getCurrencies{\n    currencies {\n      label\n      symbol\n    }\n  }\n": types.GetCurrenciesDocument,
    "\n  query getProducts($categoryId: String!) {\n    category(input: { title: $categoryId }) {\n      products {\n        id\n        name\n        inStock\n        gallery\n        category\n        description\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  query getProduct($productId: String!) {\n    product(id: $productId) {\n      id\n      name\n      brand\n      inStock\n      gallery\n      description\n      category\n      attributes {\n        id\n        name\n        type\n        items {\n          displayValue\n          value\n          id\n        }\n      }\n      prices {\n        currency {\n          label\n          symbol\n        }\n        amount\n      }\n    }\n  }\n": types.GetProductDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategoryNames{\n    categories {\n      name\n    }\n  }\n"): (typeof documents)["\n  query getCategoryNames{\n    categories {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCurrencies{\n    currencies {\n      label\n      symbol\n    }\n  }\n"): (typeof documents)["\n  query getCurrencies{\n    currencies {\n      label\n      symbol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getProducts($categoryId: String!) {\n    category(input: { title: $categoryId }) {\n      products {\n        id\n        name\n        inStock\n        gallery\n        category\n        description\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProducts($categoryId: String!) {\n    category(input: { title: $categoryId }) {\n      products {\n        id\n        name\n        inStock\n        gallery\n        category\n        description\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getProduct($productId: String!) {\n    product(id: $productId) {\n      id\n      name\n      brand\n      inStock\n      gallery\n      description\n      category\n      attributes {\n        id\n        name\n        type\n        items {\n          displayValue\n          value\n          id\n        }\n      }\n      prices {\n        currency {\n          label\n          symbol\n        }\n        amount\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProduct($productId: String!) {\n    product(id: $productId) {\n      id\n      name\n      brand\n      inStock\n      gallery\n      description\n      category\n      attributes {\n        id\n        name\n        type\n        items {\n          displayValue\n          value\n          id\n        }\n      }\n      prices {\n        currency {\n          label\n          symbol\n        }\n        amount\n      }\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;