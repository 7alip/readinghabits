import React from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Flex,
  Stack,
  Heading,
  Tag,
  TagLabel,
  TagIcon,
} from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const GroupList = ({ groups }) => {
  return (
    <Stack spacing={5}>
      <Heading mt={5} textAlign="center" as="h1" size="lg">
        Gruplar
      </Heading>
      <Flex wrap="wrap" mx={[-1, -2, -3]}>
        {groups.map(group => (
          <Box
            key={group.id}
            as={Link}
            to={`/group/${group.id}`}
            w={['full', 1 / 2, 1 / 4]}
            p={[1, 2, 3]}
          >
            <Stack
              boxShadow="sm"
              spacing={5}
              p={5}
              h="full"
              justifyContent="space-between"
            >
              <Heading as="h3" size="md" textAlign="center">
                {group.title}
              </Heading>
              <Flex justify="space-between">
                <Tag size="sm" variantColor="teal">
                  <TagIcon icon="info" />
                  <TagLabel>{group.users.aggregate.count} Kişi</TagLabel>
                </Tag>
                <Tag size="sm" variantColor="purple">
                  <TagIcon icon="check-circle" />
                  <TagLabel>{group.sets.aggregate.count} Set</TagLabel>
                </Tag>
              </Flex>
            </Stack>
          </Box>
        ))}
      </Flex>
    </Stack>
  )
}

GroupList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      users: PropTypes.array,
      sets: PropTypes.array,
    }),
  ).isRequired,
}

export default GroupList
