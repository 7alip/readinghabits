import React from 'react'
import PropTypes from 'prop-types'

import { Box, Heading, Stack, Avatar, Text, Tag } from '@chakra-ui/core'

const GroupItem = ({ group }) => {
  console.log('group', group)
  return (
    <Box my={3}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        {group.title}
      </Heading>
      <Stack isInline spacing={3}>
        <Box w="full" boxShadow="sm" p={[2, 3, 4]}>
          <Heading textAlign="center" size="sm" mb={3}>
            Users
          </Heading>
          <Stack>
            {group.users.map(({ user }) => (
              <Stack
                key={user.username}
                alignItems="center"
                isInline
                spacing={3}
              >
                <Avatar name={user.username} size="xs" />
                <Text>{user.username}</Text>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Box w="full" boxShadow="sm" p={[2, 3, 4]}>
          <Heading textAlign="center" size="sm" mb={3}>
            Sets
          </Heading>
          <Stack>
            {group.sets.map(set => (
              <Box key={set.title} borderWidth={1} borderColor="gray.200" p={2}>
                <Text fontWeight="bold" textAlign="center">
                  {set.title}
                </Text>
                {set.categories.map((c, i) => (
                  <Box key={i} p={1}>
                    <Tag size="sm">{c.min_value}</Tag> {c.category.title}
                  </Box>
                ))}
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

GroupItem.propTypes = {
  group: PropTypes.shape({
    title: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
      }),
    ),
    sets: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            min_value: PropTypes.number,
          }),
        ),
      }),
    ),
  }),
}

export default GroupItem
