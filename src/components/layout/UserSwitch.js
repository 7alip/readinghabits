import React, { useContext, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Spinner, Alert, Select } from '@chakra-ui/core'

import { AuthContext } from '../../App'

const GET_USERS = gql`
  query getUsers {
    user {
      id
      username
    }
  }
`

const UserSwitch = () => {
  const { userId, setUserId } = useContext(AuthContext)
  const { loading, error, data } = useQuery(GET_USERS)

  useEffect(() => {
    setUserId(1)
  }, [setUserId])

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Select placeholder="Giriş yap" w="auto" onChange={e => setUserId(Number(e.target.value))} value={userId || ''}>
      {data.user.map(u => (
        <option key={u.id} value={u.id}>
          {u.username}
        </option>
      ))}
    </Select>
  )
}

export default UserSwitch
