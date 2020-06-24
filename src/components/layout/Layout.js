import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDisclosure, Box, Stack } from '@chakra-ui/core'
import Header from './Header'
import SideDrawer from './SideDrawer'

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const btnRef = useRef()

  return (
    <Stack minH="100vh">
      <Header onOpen={onOpen} btnRef={btnRef} />

      <Box flex={1} px={4}>
        {children}
      </Box>

      <SideDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Stack>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
