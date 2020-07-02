import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, useColorMode, IconButton } from '@chakra-ui/core'
import { useRouteMatch } from 'react-router-dom'

import BottomNavigation from './BottomNavigation'

const Layout = ({ children }) => {
  const isGropPage = useRouteMatch('/gruplar/:grupId')

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      bg={`background.${colorMode}`}
      color={`text.${colorMode}`}
      flexDir="column"
      h="100vh"
      overflow="hidden"
    >
      <IconButton
        position="fixed"
        top={2}
        right={2}
        isRound
        variant="outline"
        icon={colorMode === 'dark' ? 'sun' : 'moon'}
        onClick={toggleColorMode}
      />
      <Box px={[2, 3, 4]} flex={1} overflowY="auto">
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
