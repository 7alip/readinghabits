import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.BACKEND_API || 'https://manevitakip.herokuapp.com/v1/graphql',
  }),
})
