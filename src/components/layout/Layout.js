import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@chakra-ui/core'

import BottomNavigation from './BottomNavigation'

const Layout = ({ children, basic }) => {
  return (
    <Flex flexDir="column" h="100vh" overflow="hidden">
      <Box px={[2, 3, 4]} flex={1} overflowY="auto">
        {children}
      </Box>
      {!basic && <BottomNavigation />}
    </Flex>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  basic: PropTypes.bool,
}

export default Layout
