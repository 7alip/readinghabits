import React from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton, Heading } from '@chakra-ui/core'

const Group = () => {
  const { grupId } = useParams()
  const history = useHistory()
  return (
    <Box>
      <Heading my={5}>
        <IconButton
          variant="ghost"
          icon="arrow-back"
          onClick={history.goBack}
          mr={4}
        />
        Grup {grupId}
      </Heading>
    </Box>
  )
}

export default Group
