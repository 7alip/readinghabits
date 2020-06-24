import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  Box,
  Spinner,
  Alert,
  Stack,
  Heading,
  Tag,
  Text,
  Button,
} from '@chakra-ui/core'
import { Link, useParams } from 'react-router-dom'

const GET_GROUP_BY_ID = gql`
  query getGroupById($id: Int!) {
    group_by_pk(id: $id) {
      title
      is_active
      is_private
      is_complete
      end_date
      start_date
      users {
        user {
          username
        }
      }
      fields {
        category {
          title
        }
        min_value
        point
      }
    }
  }
`

const SingleGroup = () => {
  let { id } = useParams()

  const { loading, error, data } = useQuery(GET_GROUP_BY_ID, {
    variables: { id },
  })

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  if (!data.group_by_pk) return <Alert status="error">Grup bulunamadi!</Alert>

  const {
    title,
    is_active,
    is_private,
    is_complete,
    end_date,
    start_date,
    users,
    fields,
  } = data.group_by_pk

  return (
    <Stack spacing={5}>
      <Button
        variantColor="teal"
        as={Link}
        to="/groups"
        alignSelf="flex-start"
        leftIcon="arrow-back"
      >
        Tüm Gruplar
      </Button>
      <Heading my={5}>{title}</Heading>
      <Box>
        <Text>Baslama Tarihi: {start_date}</Text>
        <Text>Bitis Tarihi: {end_date ? end_date : 'Belirlenmedi'}</Text>
      </Box>
      <Stack isInline spacing={2}>
        {<Tag size="sm">{is_active ? 'Aktif' : 'Pasif'}</Tag>}
        {is_complete && <Tag size="sm">Tamamlandi</Tag>}
        {<Tag size="sm">{is_private ? 'Ozel' : 'Genel'}</Tag>}
      </Stack>
      <Stack p={3} boxShadow="sm">
        <Heading size="md">Kullanicilar</Heading>
        {users.map((user, i) => (
          <Text key={i}>{user.user.username}</Text>
        ))}
      </Stack>
      <Stack p={3} boxShadow="sm">
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
  )
}

export default SingleGroup
