import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  useDisclosure,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  List,
} from '@chakra-ui/core'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const navItems = [
  {
    title: 'My Groups',
    link: '/group',
  },
  {
    title: 'Groups',
    link: '/groups',
  },
]

const DrawerLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box>
      {children}
      <IconButton
        icon={AiOutlineMenu}
        ref={btnRef}
        onClick={onOpen}
        position="fixed"
        top={3}
        right={3}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            {navItems.map(item => (
              <List key={item.link}>
                <Link to={'/test' + item.link}>{item.title}</Link>
              </List>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

DrawerLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DrawerLayout
