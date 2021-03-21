// import React from 'react'
// import Head from 'next/head'
// import { ApolloProvider } from '@apollo/client'
// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'

// let apolloClient = null

// /**
//  * Creates and provides the apolloContext
//  * to a next.js PageTree. Use it by wrapping
//  * your PageComponent via HOC pattern.
//  * @param {Function|Class} PageComponent
//  * @param {Object} [config]
//  * @param {Boolean} [config.ssr=true]
//  */
// export function withApollo(PageComponent, { ssr = true } = {}) {
//   const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
//     const client = apolloClient || initApolloClient(apolloState)
//     return (
//       <ApolloProvider client={ client }>
//         <PageComponent { ...pageProps } />
//       </ApolloProvider>
//     )
//   }

//   // Set the correct displayName in development
//   if (process.env.NODE_ENV !== 'production') {
//     const displayName =
//       PageComponent.displayName || PageComponent.name || 'Component'

//     if (displayName === 'App') {
//       console.warn('This withApollo HOC only works with PageComponents.')
//     }

//     WithApollo.displayName = `withApollo(${displayName})`
//   }

//   if (ssr || PageComponent.getInitialProps) {
//     WithApollo.getInitialProps = async ctx => {
//       const { AppTree } = ctx

//       // Initialize ApolloClient, add it to the ctx object so
//       // we can use it in `PageComponent.getInitialProp`.
//       const apolloClient = (ctx.apolloClient = initApolloClient())

//       // Run wrapped getInitialProps methods
//       let pageProps = {}
//       if (PageComponent.getInitialProps) {
//         pageProps = await PageComponent.getInitialProps(ctx)
//       }

//       // Only on the server:
//       if (typeof window === 'undefined') {
//         // When redirecting, the response is finished.
//         // No point in continuing to render
//         if (ctx.res && ctx.res.finished) {
//           return pageProps
//         }

//         // Only if ssr is enabled
//         if (ssr) {
//           try {
//             // Run all GraphQL queries
//             const { getDataFromTree } = await import('@apollo/react-ssr')
//             await getDataFromTree(
//               <AppTree
//                 pageProps={ {
//                   ...pageProps,
//                   apolloClient,
//                 } }
//               />
//             )
//           } catch (error) {
//             // Prevent Apollo Client GraphQL errors from crashing SSR.
//             // Handle them in components via the data.error prop:
//             // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
//             console.error('Error while running `getDataFromTree`', error)
//           }

//           // getDataFromTree does not call componentWillUnmount
//           // head side effect therefore need to be cleared manually
//           Head.rewind()
//         }
//       }

//       // Extract query data from the Apollo store
//       const apolloState = apolloClient.cache.extract()
//       return {
//         ...pageProps,
//         apolloState,
//       }
//     }
//   }

//   return WithApollo
// }

// /**
//  * Always creates a new apollo client on the server
//  * Creates or reuses apollo client in the browser.
//  * @param  {Object} initialState
//  */
// function initApolloClient(initialState) {
//   // Make sure to create a new client for every server-side request so that data
//   // isn't shared between connections (which would be bad)
//   if (typeof window === 'undefined') {
//     return createApolloClient(initialState)
//   }

//   // Reuse client on the client-side
//   if (!apolloClient) {
//     apolloClient = createApolloClient(initialState)
//   }

//   return apolloClient
// }

// /**
//  * Creates and configures the ApolloClient
//  * @param  {Object} [initialState={}]
//  */
// function createApolloClient(initialState = {}) {
//   const ssrMode = typeof window === 'undefined'
//   const cache = new InMemoryCache().restore(initialState)

//   return new ApolloClient({
//     ssrMode,
//     link: createIsomorphLink(),
//     cache,
//   })
// }

// function createIsomorphLink() {
//   const { HttpLink } = require('apollo-link-http')
//   return new HttpLink({
//     uri: 'http://localhost:3000/api',
//     credentials: 'same-origin',
//   })
// }

import React from 'react'
import Head from 'next/head'
import { getToken, logout } from '../lib/getToken'
import { CODE } from '../constants';
import { onError } from "@apollo/client/link/error";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { toast } from 'react-toastify'
import { isLoggedInVar } from '../lib/client-cache';




export const typeDefs = gql`
  extend type Query {
    cartItems: [Int]
  }
`;

let apolloClient = null

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = false } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)
    return (
      <ApolloProvider client={ client }>
        <PageComponent { ...pageProps } />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient())

      // Run wrapped getInitialProps methods
      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(

              <AppTree
                pageProps={ {
                  ...pageProps,
                  apolloClient,
                } }
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()
      // console.log('pageProps', pageProps);
      return {
        ...pageProps,
        apolloState,
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {

  console.log('initialState', initialState);
  const ssrMode = typeof window === 'undefined'


  const cache = new InMemoryCache({
    typePolicies: { // Type policy map
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          },
          queryCartItems: {
            read() {
              return [1, 2, 3]
              // cartItemsVar();
            }
          }
        }
      },
      User: {
        email: {
          read(_, { readField }) {
            console.log('aaaaa read');
            return Math.random() * 100;
            // console.log('readFieldreadFieldreadField', readField)
            // const zip = readField('zip');
            // const city = zipToCity(zip);
            // return city;
          },
        },
      }

    }
  })
  // F.restore(initialState)

  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(),
    cache,
    typeDefs
  })
}

function createIsomorphLink() {


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





  const params = {
    uri: 'http://localhost:3000/api',
    credentials: 'same-origin',
  }

  const authorization = getToken()

  if (authorization) params.headers = { ...params.headers, authorization }

  const httpLink = new HttpLink(params)

  return ApolloLink.from([errorLink, httpLink,])
}
