import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, useColorMode } from '@chakra-ui/core'
import { useRouteMatch } from 'react-router-dom'

import BottomNavigation from './BottomNavigation'
import ToggleTheme from './ToggleTheme'

const Layout = ({ children }) => {
  const isGropPage = useRouteMatch('/gruplar/:grupId')

  const { colorMode } = useColorMode()

  return (
    <Flex
      bg={`background.${colorMode}`}
      color={`text.${colorMode}`}
      flexDir="column"
      h="100vh"
      overflow="hidden"
    >
      <ToggleTheme />
      <Box px={[2, 3, 4]} flex={1} overflowY="auto" overflowX="hidden">
        {children}
      </Box>
      {!isGropPage && <BottomNavigation />}
    </Flex>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  basic: PropTypes.bool,
}

export default Layout
