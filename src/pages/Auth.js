import React, { useContext, useState } from 'react'
import { Stack, Button, Text } from '@chakra-ui/core'

import { AuthContext } from '../context/auth-context'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import Base from '../components/shared/Base'
import ForgotPassword from '../components/auth/ForgotPassword'
import ResetPassword from '../components/auth/ResetPassword'
import { Redirect } from 'react-router-dom'

const Auth = () => {
  const [mode, setMode] = useState('login')
  const { isLoggedIn } = useContext(AuthContext)

  const Forms = () => {
    switch (mode) {
      case 'login':
        return <Login />
      case 'signup':
        return <Signup />
      case 'forgot':
        return <ForgotPassword setMode={setMode} />
      case 'reset':
        return <ResetPassword setMode={setMode} />
      default:
        return <Login />
    }
  }

  const LoginLink = () => (
    <Text fontSize="sm">
      Zaten üye misin?{' '}
      <Button size="sm" variant="link" onClick={() => setMode('login')}>
        Giriş Yap
      </Button>
    </Text>
  )

  const SignupLink = () => (
    <Text fontSize="sm">
      Üye değil misin?{' '}
      <Button size="sm" variant="link" onClick={() => setMode('signup')}>
        Kayıt Ol
      </Button>
    </Text>
  )

  const ForgotLink = () => (
    <Text fontSize="sm">
      Şifreni mi unuttun?{' '}
      <Button size="sm" variant="link" onClick={() => setMode('forgot')}>
        Sıfırla
      </Button>
    </Text>
  )

  const Links = () => {
    switch (mode) {
      case 'signup':
        return <LoginLink />
      case 'login':
        return (
          <>
            <SignupLink />
            <ForgotLink />
          </>
        )
      case 'forgot':
        return (
          <>
            <LoginLink />
            <SignupLink />
          </>
        )
      case 'reset':
        return <LoginLink />
      default:
        break
    }
  }

  return (
    <Stack h="full" justify="center" align="center">
      {isLoggedIn ? (
        <Redirect to="/profil" />
      ) : (
        <Base p={5} boxShadow="sm">
          <Forms />
          <Links />
        </Base>
      )}
    </Stack>
  )
}

export default Auth
