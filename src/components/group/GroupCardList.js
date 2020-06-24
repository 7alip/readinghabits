import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/core'

import GroupCard from './GroupCard'
import { groupType } from '../../types/groupTypes'

const GroupCardList = ({ groups }) => (
  <Flex wrap="wrap" mx={-2} alignItems="stretch">
    {groups.map(group => (
      <Box p={2} w={['full', null, 1 / 2]} key={group.id} as={Link} to={`/groups/${group.id}`}>
        <GroupCard group={group} />
      </Box>
    ))}
  </Flex>
)

GroupCardList.propTypes = {
  groups: PropTypes.arrayOf(groupType),
}

export default GroupCardList
