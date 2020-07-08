import React, { useState, useContext } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
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

const GET_QUESTIONS = gql`
  query getQuestions {
    security_question {
      question
    }
  }
`

const FORGOT = gql`
  mutation forgot($username: String!, $question: String!, $answer: String!) {
    forgot(username: $username, question: $question, answer: $answer) {
      id
      token
    }
  }
`

const initialState = {
  username: '',
  question: '',
  answer: '',
}

const ForgotPassword = ({ setMode }) => {
  const { forgot } = useContext(AuthContext)
  const [state, setState] = useState(initialState)
  const toast = useToast()

  const { loading, data } = useQuery(GET_QUESTIONS)
  const [onForgot] = useMutation(FORGOT, {
    variables: state,
    onError: error =>
      toast({ status: 'error', title: 'Hata!', description: error.message }),
    onCompleted: data => {
      forgot(data.forgot.id, data.forgot.token)
      data.forgot.token && setMode('reset')
    },
  })

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    onForgot()
  }

  return (
    <Box w={300}>
      <Heading textAlign="center" mb={3}>
        Şifremi Unuttum
      </Heading>
      <Stack spacing={3} mb={3} as="form" onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="Kullanıcı adı"
          value={state.username}
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
            state.username === '' ||
            state.question === '' ||
            state.answer === ''
          }
          variantColor="blue"
          isLoading={loading}
          type="submit"
        >
          Gönder
        </Button>
      </Stack>
    </Box>
  )
}

ForgotPassword.propTypes = {
  setMode: PropTypes.func.isRequired,
}

export default ForgotPassword
