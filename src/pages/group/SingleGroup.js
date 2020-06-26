import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  Box,
  Spinner,
  Alert,
  Stack,
  Heading,
  Tag,
  Text,
  Button,
  IconButton,
  Flex,
  useDisclosure,
} from '@chakra-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { GET_GROUP_BY_ID, GET_GROUPS } from '../../apollo/groupQueries'
import { JOIN_GROUP, LEAVE_GROUP } from '../../apollo/groupMutations'
import { AuthContext } from '../../App'
import GroupUsersList from '../../components/group/GroupUsersList'
import GroupCategoryTable from '../../components/group/GroupCategoryTable'
import { FaBookOpen, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import AddGroupReading from '../../components/group/AddGroupReading'

const SingleGroup = () => {
  let { id } = useParams()
  const { userId } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading, error, data } = useQuery(GET_GROUP_BY_ID, {
    variables: { id },
  })

  const [joingGroup] = useMutation(JOIN_GROUP, {
    refetchQueries: [
      { query: GET_GROUP_BY_ID, variables: { id } },
      { query: GET_GROUPS, variables: { id: userId } },
    ],
  })
  const [leaveGroup] = useMutation(LEAVE_GROUP, {
    refetchQueries: [
      { query: GET_GROUP_BY_ID, variables: { id } },
      { query: GET_GROUPS, variables: { id: userId } },
    ],
  })

  const history = useHistory()

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  if (!data.group_by_pk) return <Alert status="error">Grup bulunamadi!</Alert>

  const { title, is_active, is_private, is_complete, end_date, start_date, users, fields, creator } = data.group_by_pk

  const isJoined = users.some(u => u.user.id === userId)
  const isCreator = creator.id === userId

  return (
    <Box mt={4}>
      <Heading my={5}>
        <IconButton variant="ghost" icon="arrow-back" onClick={history.goBack} mr={4} />
        {title}
      </Heading>
      {(isJoined || isCreator) && (
        <Button mr={2} leftIcon={FaBookOpen} variantColor="purple" onClick={onOpen}>
          Okuma gir
        </Button>
      )}
      {isJoined && !isCreator && (
        <Button
          mr={2}
          leftIcon={FaUserMinus}
          variantColor="red"
          onClick={() => leaveGroup({ variables: { groupId: id, userId } })}
        >
          Gruptan Ayril
        </Button>
      )}
      {!isJoined && (
        <Button
          mr={2}
          leftIcon={FaUserPlus}
          variantColor="blue"
          onClick={() => joingGroup({ variables: { groupId: id, userId } })}
        >
          Gruba Katil
        </Button>
      )}
      {isCreator && (
        <Button mr={2} variantColor="green" leftIcon="edit">
          Duzenle
        </Button>
      )}
      <Box bg="white" p={3} my={2} boxShadow="sm">
        <Text>Baslama Tarihi: {start_date}</Text>
        <Text>Bitis Tarihi: {end_date ? end_date : 'Belirlenmedi'}</Text>
        <Stack isInline spacing={2}>
          {<Tag size="sm">{is_active ? 'Aktif' : 'Pasif'}</Tag>}
          {is_complete && <Tag size="sm">Tamamlandi</Tag>}
          {<Tag size="sm">{is_private ? 'Ozel' : 'Genel'}</Tag>}
        </Stack>
      </Box>
      <Flex flexWrap="wrap" mx={-2} my={2}>
        <Box w={['full', null, 1 / 2]} p={2}>
          <GroupUsersList users={users} />
        </Box>
        <Box w={['full', null, 1 / 2]} p={2}>
          <GroupCategoryTable categories={fields} />
        </Box>
      </Flex>
      <AddGroupReading isOpen={isOpen} onClose={onClose} groupId={id} />
    </Box>
  )
}

export default SingleGroup
