import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useToast, Heading, Box, Stack, Input, Button } from '@chakra-ui/core'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../../context/auth-context'

const RESET_PASSWORD = gql`
  mutation resetPassword($password: String!, $token: String!) {
    reset(password: $password, token: $token) {
      message
    }
  }
`

const initialState = {
  password: '',
  repassword: '',
}

const ResetPassword = ({ setMode }) => {
  const { clearResetToken, resetToken } = useContext(AuthContext)
  const [state, setState] = useState(initialState)
  const toast = useToast()

  const [onReset, { loading }] = useMutation(RESET_PASSWORD, {
    variables: { password: state.password, token: resetToken },
    onError: error => {
      toast({ status: 'error', title: 'Hata!', description: error.message })
    },
    onCompleted: data => {
      if (data.reset.message === 'success') {
        clearResetToken()
        toast({
          status: 'success',
          title: 'Tamamlandı',
          description:
            'Şifreniz başarıyla değiştirilmiştir. Giriş sayfasına yönlendiriliyorsunuz...',
        })
        setTimeout(() => {
          setMode('login')
        }, 2000)
      } else {
        toast({
          status: 'error',
          title: 'Hata!',
          description: 'Beklenmedik bir hata oluştu. Lüften tekrar deneyiniz',
        })
      }
    },
  })

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setTimeout(() => {
      onReset()
    }, 1000)
  }
  return (
    <Box w={300}>
      <Heading textAlign="center" mb={3}>
        Şifrenizi Sıfırlayın
      </Heading>
      <Stack spacing={3} mb={3} as="form" onSubmit={handleSubmit}>
        <Input
          name="password"
          placeholder="Şifreniz"
          value={state.password}
          onChange={handleChange}
          isRequired
          type="password"
        />
        <Input
          name="repassword"
          placeholder="Şifrenizi tekrar giriniz"
          value={state.repassword}
          onChange={handleChange}
          isRequired
          type="password"
        />
        <Button variantColor="blue" isLoading={loading} type="submit">
          Değiştir
        </Button>
      </Stack>
    </Box>
  )
}

ResetPassword.propTypes = {
  setMode: PropTypes.func.isRequired,
}

export default ResetPassword
