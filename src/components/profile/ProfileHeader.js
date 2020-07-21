import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  Text,
  Box,
} from '@chakra-ui/core'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../context/auth-context'
import { BsThreeDotsVertical } from 'react-icons/bs'

const ProfileHeader = ({ avatar, username }) => {
  const { logout } = useContext(AuthContext)
  const { colorMode } = useColorMode()

  return (
    <Stack
      justify="center"
      align="center"
      py={8}
      mx={[-2, -4]}
      bg={colorMode === 'dark' ? 'teal.900' : 'teal.400'}
      p="relative"
    >
      <Avatar size="xl" name={username} src={avatar} border="2px solid white" />
      <Menu>
        <MenuButton
          as={IconButton}
          icon={BsThreeDotsVertical}
          variant="ghost"
          color="white"
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          position="absolute"
          top={2}
          left={2}
        />

        <MenuList w="auto" p={0} minW="content-fit">
          <MenuItem onClick={logout}>
            <Box mr={2}>
              <FiLogOut />
            </Box>
            <Text>Çıkış</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <Heading as="h2" size="lg" color="white">
        {username}
      </Heading>
    </Stack>
  )
}

ProfileHeader.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
}

export default ProfileHeader
