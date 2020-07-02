import React, { lazy, Suspense } from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {
  CSSReset,
  ColorModeProvider,
  ThemeProvider,
  Spinner,
  Flex,
} from '@chakra-ui/core'

import { AuthContext } from './context/auth-context'
import { useAuth } from './hooks/auth-hook'
import { client } from './apollo/client'
import theme from './context/theme'
import Layout from './components/layout/Layout'

const IndexPage = lazy(() => import('./pages/Index'))
const HomePage = lazy(() => import('./pages/Home'))
const ProfilePage = lazy(() => import('./pages/Profile'))
const GroupPage = lazy(() => import('./pages/Group'))
const GroupsPage = lazy(() => import('./pages/Groups'))
const NotFoundPage = lazy(() => import('./pages/404'))
const AuthPage = lazy(() => import('./pages/Auth'))

function App() {
  const { login, logout, token, userId } = useAuth()

  const context = { isLoggedIn: !!token, userId, token, login, logout }

  const PrivateRoute = ({ ...rest }) => {
    if (!token)
      return (
        <Route
          render={({ location }) => (
            <Redirect
              to={{
                pathname: '/hesap',
                state: { from: location },
              }}
            />
          )}
        />
      )

    return <Route {...rest} />
  }

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={context}>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <ColorModeProvider value="light">
              <BrowserRouter>
                <Layout>
                  <Suspense
                    fallback={
                      <Flex h="full" justify="center" align="center">
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="xl"
                        />
                      </Flex>
                    }
                  >
                    <Switch>
                      <Route exact path="/" component={IndexPage} />
                      <Route path="/giris" component={HomePage} />
                      <Route path="/hesap" component={AuthPage} />
                      <Route exact path="/gruplar" component={GroupsPage} />
                      <PrivateRoute
                        path="/gruplar/:grupId"
                        component={GroupPage}
                      />
                      <PrivateRoute path="/profil" component={ProfilePage} />
                      <Route component={NotFoundPage} />
                    </Switch>
                  </Suspense>
                </Layout>
              </BrowserRouter>
            </ColorModeProvider>
          </ThemeProvider>
        </AuthContext.Provider>
      </ApolloProvider>
    </React.StrictMode>
  )
}

export default App
