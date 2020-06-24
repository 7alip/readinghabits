import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Box, Spinner, Alert, Heading } from '@chakra-ui/core'
import GroupCardList from '../../components/group/GroupCardList'

const GET_GROUPS = gql`
  query getGroups {
    group {
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

const Groups = () => {
  const { loading, error, data } = useQuery(GET_GROUPS)

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <Heading as="h1" my={5}>
        Tüm Gruplar
      </Heading>
      <GroupCardList groups={data.group} />
    </Box>
  )
}

export default Groups
