import React from 'react'
import PropTypes from 'prop-types'

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
} from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const navItems = [
  {
    title: 'My Groups',
    link: '/groups/me',
  },
  {
    title: 'Groups',
    link: '/groups',
  },
]

const SideDrawer = ({ isOpen, onClose, btnRef }) => {
  return (
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
              <Link to={item.link}>{item.title}</Link>
            </List>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

SideDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  btnRef: PropTypes.object.isRequired,
}

export default SideDrawer
