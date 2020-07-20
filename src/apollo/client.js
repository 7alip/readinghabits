import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const userData = JSON.parse(localStorage.getItem('userData'))

const httpLink = new HttpLink({
  uri: 'https://manevitakip.herokuapp.com/v1/graphql',
})

const authMiddleware = token =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    }

    return forward(operation)
  })

const cache = new InMemoryCache({})

export const useAppApolloClient = () => {
  return new ApolloClient({
    link: authMiddleware(userData && userData.token).concat(httpLink),
    cache,
  })
}
