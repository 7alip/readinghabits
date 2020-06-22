import React, { useContext } from 'react'

import { gql, useQuery } from '@apollo/client'
import { Spinner, Alert, Box, Heading, Flex } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

import { AuthContext } from '../App'
import GroupCard from '../components/group/GroupCard'

const GET_USER_GROUPS = gql`
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

  const { loading, error, data } = useQuery(GET_USER_GROUPS, {
    variables: { id: userId },
  })

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <Heading as="h1" my={5}>
        Gruplarim
      </Heading>
      <Flex wrap="wrap">
        {data.group.map(g => (
          <Box
            p={2}
            w={['full', null, 1 / 2]}
            key={g.id}
            as={Link}
            to={`/groups/${g.id}`}
          >
            <GroupCard
              title={g.title}
              start_date={g.start_date}
              end_date={g.end_date}
              is_active={g.is_active}
              is_complete={g.is_complete}
              is_private={g.is_private}
              users_count={g.users_aggregate.aggregate.count}
              fields_count={g.fields_aggregate.aggregate.count}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default MyGroups
