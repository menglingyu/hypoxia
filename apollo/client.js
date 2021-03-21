import { getToken, logout } from '../lib/getToken'
import { onError } from "@apollo/client/link/error";
import { toast } from 'react-toastify'
import { CODE } from '../constants';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

import { typePolicies, } from './schema';

const SERVER_URI = 'http://localhost:3000/api';



export const createHttpLink = (uri = SERVER_URI) => {

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
        toast.error(message)

        if (message.includes(CODE.TOKEN_ERROR)) logout()

      });

    if (networkError) toast.error(`网络错误: ${networkError}`)
    console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri,
    credentials: 'same-origin',
    headers: { authorization: getToken() }
  });
  return ApolloLink.from([errorLink, httpLink,])
};

export const createCache = (typePolicies = {}) => {
  return new InMemoryCache({
    typePolicies,
    assumeImmutableResults: true,
    freezeResults: true
  });
};

export const createClient = () => {
  const link = createHttpLink();
  const cache = createCache(typePolicies);

  return new ApolloClient({
    link,
    cache,

  });
};