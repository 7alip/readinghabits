import React, { useContext, useState } from 'react'
import { Stack, Button, Text } from '@chakra-ui/core'

import { AuthContext } from '../context/auth-context'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import Div from '../components/layout/Div'

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoggedIn, logout } = useContext(AuthContext)

  return (
    <Stack h="full" justify="center" align="center">
      {isLoggedIn ? (
        <Button onClick={logout}>Çıkış Yap</Button>
      ) : (
        <Div p={5} boxShadow="sm">
          {isLoginMode ? <Login /> : <Signup />}
          {isLoginMode ? (
            <Text>
              Üye değil misin?{' '}
              <Button variant="link" onClick={() => setIsLoginMode(false)}>
                Kayıt Ol
              </Button>
            </Text>
          ) : (
            <Text>
              Zaten üye misin?{' '}
              <Button variant="link" onClick={() => setIsLoginMode(true)}>
                Giriş Yap
              </Button>
            </Text>
          )}
        </Div>
      )}
    </Stack>
  )
}

export default Auth
