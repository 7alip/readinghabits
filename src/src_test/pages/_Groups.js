import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Box, Spinner, Alert, Flex, Heading } from '@chakra-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import GroupCard from '../components/_group/GroupCard'

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
  let { path } = useRouteMatch()
  const { loading, error, data } = useQuery(GET_GROUPS)

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <Heading as="h1" my={5}>
        Tüm Gruplar
      </Heading>
      <Flex wrap="wrap" mx={-2}>
        {data.group.map(g => (
          <Box
            p={2}
            w={['full', null, 1 / 2]}
            key={g.id}
            as={Link}
            to={`${path}/${g.id}`}
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

export default Groups
