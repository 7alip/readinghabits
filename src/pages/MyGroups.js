import React, { useContext } from 'react'

import { gql, useQuery } from '@apollo/client'
import {
  Spinner,
  Alert,
  Box,
  Heading,
  Flex,
  Button,
  useDisclosure,
} from '@chakra-ui/core'

import { AuthContext } from '../App'
import GroupCardList from '../components/group/GroupCardList'
import CreateGroup from '../components/group/CreateGroup'

export const GET_USER_GROUPS = gql`
  query getUserGroups($id: Int!) {
    group(where: { users: { user_id: { _eq: $id } } }) {
      id
      title
      start_date
      end_date
      is_active
      is_complete
      is_private
      creator {
        username
      }
      fields_aggregate {
        aggregate {
          count
        }
      }
      users_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

const MyGroups = () => {
  const { userId } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading, error, data } = useQuery(GET_USER_GROUPS, {
    variables: { id: userId },
  })

  const initialRef = React.useRef()
  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Heading as="h1" my={5}>
          Gruplarim
        </Heading>
        <Button
          variant="outline"
          variantColor="teal"
          leftIcon="add"
          onClick={onOpen}
        >
          Grup Olustur
        </Button>
      </Flex>
      <CreateGroup initialRef={initialRef} isOpen={isOpen} onClose={onClose} />
      <GroupCardList groups={data.group} />
    </Box>
  )
}

export default MyGroups
