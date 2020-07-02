import React from 'react'

import { Box, Heading } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const Groups = () => {
  return (
    <Box>
      <Heading>Gruplar</Heading>
      <Box>
        <Link to="/gruplar/1">Grup 1</Link>
      </Box>
      <Box>
        <Link to="/gruplar/2">Grup 2</Link>
      </Box>
      <Box>
        <Link to="/gruplar/3">Grup 3</Link>
      </Box>
      <Box>
        <Link to="/gruplar/4">Grup 4</Link>
      </Box>
    </Box>
  )
}

export default Groups
