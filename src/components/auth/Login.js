import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Box, Input, Button, Stack, Heading, useToast } from '@chakra-ui/core'
import { AuthContext } from '../../context/auth-context'
import { useHistory, useLocation } from 'react-router-dom'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
    }
  }
`

const initialState = {
  username: '',
  password: '',
}

const Login = () => {
  const { login } = useContext(AuthContext)
  const [state, setState] = useState(initialState)
  const toast = useToast()

  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: '/' } }

  const [onLogin, { loading }] = useMutation(LOGIN, {
    variables: state,
    onCompleted: data => {
      login(data.login.id, data.login.token)
      history.replace(from)
    },
    onError: error =>
      toast({ status: 'error', title: 'Hata!', description: error.message }),
  })

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    onLogin()
  }

  return (
    <Box w={300}>
      <Heading textAlign="center" mb={3}>
        Giriş Yap
      </Heading>
      <Stack spacing={3} mb={3} as="form" onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="Kullanıcı adı"
          value={state.username}
          onChange={handleChange}
          isRequired
        />
        <Input
          name="password"
          placeholder="Şifre"
          type="password"
          value={state.password}
          onChange={handleChange}
          isRequired
        />
        <Button variantColor="blue" isLoading={loading} type="submit">
          Giriş Yap
        </Button>
      </Stack>
    </Box>
  )
}

export default Login
