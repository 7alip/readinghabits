import React from 'react'

import GroupItem from '../components/group/GroupItem'
import { Box, Spinner, Alert } from '@chakra-ui/core'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

export const GET_GROUP_BY_ID = gql`
  query GetGroup($id: Int!) {
    group: group_by_pk(id: $id) {
      id
      title
      is_active
      users: group_users {
        user {
          username
        }
      }
      sets: group_sets {
        title
        categories {
          category {
            title
          }
          min_value
        }
      }
    }
  }
`

const Group = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_GROUP_BY_ID, {
    variables: { id },
  })

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <GroupItem group={data.group} />
    </Box>
  )
}

export default Group
