import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Box, Spinner, Alert, Stack, Heading, Tag, Text, Button } from '@chakra-ui/core'
import { Link, useParams } from 'react-router-dom'
import { GET_GROUP_BY_ID } from '../../apollo/groupQueries'
import { JOIN_GROUP, LEAVE_GROUP } from '../../apollo/groupMutations'
import { AuthContext } from '../../App'

const SingleGroup = () => {
  let { id } = useParams()
  const { userId } = useContext(AuthContext)

  const { loading, error, data } = useQuery(GET_GROUP_BY_ID, {
    variables: { id },
  })

  const [joingGroup] = useMutation(JOIN_GROUP, { refetchQueries: [{ query: GET_GROUP_BY_ID, variables: { id } }] })
  const [leaveGroup] = useMutation(LEAVE_GROUP, { refetchQueries: [{ query: GET_GROUP_BY_ID, variables: { id } }] })

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  if (!data.group_by_pk) return <Alert status="error">Grup bulunamadi!</Alert>

  const { title, is_active, is_private, is_complete, end_date, start_date, users, fields, creator } = data.group_by_pk

  const isJoined = users.some(u => u.user.id === userId)
  const isCreator = creator.id === userId

  return (
    <Box mt={4}>
      <Button as={Link} to="/groups" mr={4}>
        Tüm Gruplar
      </Button>
      <Button as={Link} to="/groups/me">
        Benim Gruplarim
      </Button>
      <Heading my={5}>{title}</Heading>
      {isJoined ? (
        <Button isDisabled={isCreator} onClick={() => leaveGroup({ variables: { groupId: id, userId } })}>
          Gruptan Ayril
        </Button>
      ) : (
        <Button onClick={() => joingGroup({ variables: { groupId: id, userId } })}>Gruba Katil</Button>
      )}
      <Box my={5}>
        <Text>Baslama Tarihi: {start_date}</Text>
        <Text>Bitis Tarihi: {end_date ? end_date : 'Belirlenmedi'}</Text>
      </Box>
      <Stack isInline spacing={2}>
        {<Tag size="sm">{is_active ? 'Aktif' : 'Pasif'}</Tag>}
        {is_complete && <Tag size="sm">Tamamlandi</Tag>}
        {<Tag size="sm">{is_private ? 'Ozel' : 'Genel'}</Tag>}
      </Stack>
      <Stack isInline spacing={2}>
        <Stack flex={1} p={3} boxShadow="sm">
          <Heading size="md">Kullanicilar</Heading>
          {users.map((user, i) => (
            <Text key={i}>{user.user.username}</Text>
          ))}
        </Stack>
        <Stack flex={1} p={3} boxShadow="sm">
          <Heading size="md">Kategoriler</Heading>
          {fields.map((field, i) => (
            <Box key={i}>
              <Text fontWeight="bold">{field.category.title}</Text>
              <Text fontSize="sm">Minimum {field.min_value} sayfa</Text>
              {field.point && <Tag size="sm">{field.point} puan</Tag>}
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default SingleGroup
