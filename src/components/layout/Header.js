import React from 'react'
import PropTypes from 'prop-types'

import { Flex, IconButton } from '@chakra-ui/core'
import { AiOutlineMenu } from 'react-icons/ai'

import UserSwitch from './UserSwitch'

const Header = ({ onOpen, btnRef }) => {
  return (
    <Flex
      p={1}
      borderBottomWidth="1px"
      borderBottomColor="gray.100"
      justify="space-between"
      position="sticky"
      top={0}
      bg="white"
    >
      <UserSwitch />
      <IconButton icon={AiOutlineMenu} ref={btnRef} onClick={onOpen} />
    </Flex>
  )
}

Header.propTypes = {
  onOpen: PropTypes.func.isRequired,
  btnRef: PropTypes.object.isRequired,
}

export default Header
