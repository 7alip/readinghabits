import React from 'react'

import GroupList from '../components/group/GroupList'
import { Box, Spinner, Alert, Badge } from '@chakra-ui/core'
import { gql, useQuery } from '@apollo/client'

export const GET_GROUPS = gql`
  query GetGroups {
    group {
      id
      title
      is_active
      users: group_users_aggregate {
        aggregate {
          count
        }
      }
      sets: group_sets_aggregate {
        aggregate {
          count
        }
      }
    }
    group_aggregate {
      aggregate {
        count
      }
    }
  }
`

const Groups = () => {
  const { loading, error, data } = useQuery(GET_GROUPS)

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <GroupList groups={data.group} />
      <Box>
        Sistemde toplam <Badge>{data.group_aggregate.aggregate.count}</Badge>
        grup bulunmaktadır.
      </Box>
    </Box>
  )
}

export default Groups
