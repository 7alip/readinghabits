import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Stack } from '@chakra-ui/core'

import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <Flex flexDir="column" minH="100vh">
      <Stack px={[2, 3, 4]} spacing={2} flex={1}>
        {children}
      </Stack>
      <Footer />
    </Flex>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
