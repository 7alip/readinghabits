import React from 'react'
import { Flex, Spinner } from '@chakra-ui/core'

const Loader = () => {
  return (
    <Flex h="full" justify="center" align="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  )
}

export default Loader
