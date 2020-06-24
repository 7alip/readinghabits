import React, { useContext } from 'react'

import { useQuery } from '@apollo/client'
import {
  Spinner,
  Alert,
  Box,
  Heading,
  Flex,
  Button,
  useDisclosure,
} from '@chakra-ui/core'

import { AuthContext } from '../../App'
import GroupCardList from '../../components/group/GroupCardList'
import CreateGroup from '../../components/group/CreateGroup'
import { GET_USER_GROUPS } from '../../apollo/groupQueries'

const MyGroups = () => {
  const { userId } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading, error, data } = useQuery(GET_USER_GROUPS, {
    variables: { id: userId },
  })

  const initialRef = React.useRef()

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
      {loading ? <Spinner /> : <GroupCardList groups={data.group} />}
      <CreateGroup initialRef={initialRef} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default MyGroups
