import React, { useContext, useEffect } from 'react'

import { useLazyQuery } from '@apollo/client'
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

  const [onGetUserGroups, { loading, error, data }] = useLazyQuery(
    GET_USER_GROUPS,
  )

  useEffect(() => {
    if (userId) onGetUserGroups({ variables: { id: userId } })
  }, [userId, onGetUserGroups])

  const initialRef = React.useRef()

  if (!userId) return <Heading>Giris yapiniz</Heading>
  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Heading as="h1" my={5}>
          Gruplarim
        </Heading>
        <Button
          isDisabled={!userId}
          variantColor="blue"
          leftIcon="add"
          onClick={onOpen}
        >
          Yeni Grup
        </Button>
      </Flex>
      {data && <GroupCardList groups={data.group} />}
      {isOpen && (
        <CreateGroup
          userId={userId}
          initialRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  )
}

export default MyGroups
