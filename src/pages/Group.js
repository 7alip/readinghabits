import React from 'react'

import { useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/core'

const Group = () => {
  const { id } = useParams()

  return <Box>Group id = {id}</Box>
}

export default Group
