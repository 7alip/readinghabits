import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Stack, Avatar, Heading, Button } from '@chakra-ui/core'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../context/auth-context'

const ProfileHeader = ({ avatar, username }) => {
  const { logout } = useContext(AuthContext)

  return (
    <Stack
      justify="center"
      align="center"
      py={8}
      mx={[-2, -4]}
      bg="teal.500"
      p="relative"
    >
      <Avatar size="xl" name={username} src={avatar} border="2px solid white" />
      <Button
        leftIcon={FiLogOut}
        position="absolute"
        top={2}
        left={2}
        variant="outline"
        onClick={logout}
      >
        Çıkış
      </Button>
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
