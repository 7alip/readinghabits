import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/link-context'

const httpLink = createHttpLink({
  uri:
    process.env.BACKEND_API || 'https://manevitakip.herokuapp.com/v1/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const userData = JSON.parse(localStorage.getItem('userData')) || {}
  let _headers = { ...headers }

  if (userData.token) {
    _headers.authorization = `Bearer ${userData.token}`
  }

  return _headers
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
