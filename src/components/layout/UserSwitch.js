import React, { useEffect, useContext } from 'react'
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
  const { setUserId } = useContext(AuthContext)
  const { loading, error, data } = useQuery(GET_USERS)

  useEffect(() => {
    if (data && data.user[0]) {
      setUserId(data.user[0].id)
    }
  }, [data, setUserId])

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Select w="auto" onChange={e => setUserId(e.target.value)}>
      {data.user.map(u => (
        <option key={u.id} value={u.id}>
          {u.username}
        </option>
      ))}
    </Select>
  )
}

export default UserSwitch
