import React, { useState, useContext } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  Box,
  Input,
  Button,
  Stack,
  Heading,
  useToast,
  Select,
} from '@chakra-ui/core'
import { AuthContext } from '../../context/auth-context'
import { useHistory, useLocation } from 'react-router-dom'

const GET_QUESTIONS = gql`
  query getQuestions {
    security_question {
      question
    }
  }
`

const SIGNUP = gql`
  mutation signup(
    $username: String!
    $password: String!
    $question: String!
    $answer: String!
  ) {
    signup(
      username: $username
      password: $password
      question: $question
      answer: $answer
    ) {
      id
      token
    }
  }
`

const initialState = {
  username: '',
  password: '',
  repassword: '',
  question: '',
  answer: '',
}

const Signup = () => {
  const { login } = useContext(AuthContext)
  const [state, setState] = useState(initialState)

  const toast = useToast()

  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: '/' } }

  const { data } = useQuery(GET_QUESTIONS)

  const [onSignup, { loading }] = useMutation(SIGNUP, {
    variables: {
      username: state.username,
      password: state.password,
      question: state.question,
      answer: state.answer,
    },
    onCompleted: data => {
      login(data.signup.id, data.signup.token)
      history.replace(from)
    },
    onError: error =>
      toast({
        status: 'error',
        title: 'Hata!',
        description:
          error.message ===
          'Uniqueness violation. duplicate key value violates unique constraint "users_username_key"'
            ? 'Kullanıcı adı zaten alınmış'
            : error.message,
      }),
  })

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (state.password === state.repassword) onSignup()
  }
  return (
    <Box w={300}>
      <Heading textAlign="center" mb={3}>
        Kayıt Ol
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
        <Input
          name="repassword"
          placeholder="Şifre tekrari"
          type="password"
          value={state.repassword}
          onChange={handleChange}
          isRequired
        />
        <Select
          name="question"
          value={state.question}
          placeholder="Güvenlik Sorusu"
          onChange={handleChange}
        >
          {data &&
            data.security_question.map(({ question }) => (
              <option key={question} value={question}>
                {question}
              </option>
            ))}
        </Select>
        <Input
          name="answer"
          placeholder="Cevap"
          value={state.answer}
          onChange={handleChange}
          isRequired
        />
        <Button
          isDisabled={
            state.password === '' ||
            state.password !== state.repassword ||
            state.question === '' ||
            state.answer === ''
          }
          variantColor="blue"
          isLoading={loading}
          type="submit"
        >
          Kayıt Ol
        </Button>
      </Stack>
    </Box>
  )
}

export default Signup
