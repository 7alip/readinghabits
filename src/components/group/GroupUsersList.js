import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Heading, Text, Avatar, Flex, Box } from '@chakra-ui/core'

const GroupUsersList = ({ users }) => {
  return (
    <Box flex={1} p={3} boxShadow="sm">
      <Heading size="md" mb={3}>
        Kullanicilar
      </Heading>
      <Stack spacing={2}>
        {users.map(({ user }) => (
          <Flex key={user.username}>
            <Avatar mr={2} size="xs" name={user.username} />
            <Text>{user.username}</Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  )
}

GroupUsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  ),
}

export default GroupUsersList
