import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Flex, IconButton, Button } from '@chakra-ui/core'
import { AiOutlineMenu } from 'react-icons/ai'

import UserSwitch from './UserSwitch'
import { AuthContext } from '../../App'

const Header = ({ onOpen, btnRef }) => {
  const { userId, setUserId } = useContext(AuthContext)

  return (
    <Flex
      px={4}
      py={2}
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justify="space-between"
      position="sticky"
      top={0}
      bg="white"
    >
      <UserSwitch />
      {userId && <Button onClick={() => setUserId(null)}>Çıkış yap</Button>}
      <IconButton icon={AiOutlineMenu} ref={btnRef} onClick={onOpen} />
    </Flex>
  )
}

Header.propTypes = {
  onOpen: PropTypes.func.isRequired,
  btnRef: PropTypes.object.isRequired,
}

export default Header
