import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import App from './App'
import { client } from './apollo/client'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        <ColorModeProvider value="light">
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
