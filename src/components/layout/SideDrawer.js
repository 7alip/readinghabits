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
  ListItem,
  Button,
} from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const navItems = [
  {
    title: 'Anasayfa',
    link: '/',
  },
  {
    title: 'Gruplarım',
    link: '/groups/me',
  },
  {
    title: 'Tüm Gruplar',
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
          <List>
            {navItems.map(item => (
              <Button
                variant="ghost"
                mb={1}
                isFullWidth
                as={Link}
                key={item.link}
                to={item.link}
              >
                <ListItem>{item.title}</ListItem>
              </Button>
            ))}
          </List>
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
