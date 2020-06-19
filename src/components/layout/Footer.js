import React from 'react'
import { Flex, Button } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Flex>
      <Button isFullWidth as={Link} to="/">
        Anasayfa
      </Button>
      <Button isFullWidth as={Link} to="/group">
        Grup
      </Button>
    </Flex>
  )
}

export default Footer
