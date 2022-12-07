import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://vercel-apollo-endpoint-one.vercel.app/",
  cache: new InMemoryCache(),
});
// https://vercel-apollo-endpoint-one.vercel.app/
// http://localhost:4000/graphql