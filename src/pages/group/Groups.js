import React from 'react'
import { useQuery } from '@apollo/client'
import { Box, Spinner, Alert, Heading } from '@chakra-ui/core'
import GroupCardList from '../../components/group/GroupCardList'
import { GET_GROUPS } from '../../apollo/groupQueries'

const Groups = () => {
  const { loading, error, data } = useQuery(GET_GROUPS)

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box>
      <Heading as="h1" my={5}>
        Tüm Gruplar
      </Heading>
      {data && <GroupCardList groups={data.group} />}
    </Box>
  )
}

export default Groups
