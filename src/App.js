import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { CSSReset, ColorModeProvider, ThemeProvider } from '@chakra-ui/core'

import { AuthContext } from './context/auth-context'
import { useAuth } from './hooks/auth-hook'
import { client } from './apollo/client'
import theme from './context/theme'
import Routes from './routes/Routes'

function App() {
  const {
    login,
    logout,
    token,
    userId,
    forgot,
    clearResetToken,
    resetToken,
  } = useAuth()

  const context = {
    isLoggedIn: !!token,
    userId,
    token,
    login,
    logout,
    forgot,
    clearResetToken,
    resetToken,
  }

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={context}>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <ColorModeProvider value="light">
              <Routes />
            </ColorModeProvider>
          </ThemeProvider>
        </AuthContext.Provider>
      </ApolloProvider>
    </React.StrictMode>
  )
}

export default App
