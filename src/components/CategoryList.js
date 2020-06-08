import React from 'react'
import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/core'

import { GET_CATEGORIES } from '../apollo/queries'

const CategoryList = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES)

  return (
    <Box bg="gray.100" p={3} my={3}>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </Box>
  )
}

export default CategoryList
