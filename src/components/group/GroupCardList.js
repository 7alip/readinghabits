import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/core'

import GroupCard from './GroupCard'

const GroupCardList = ({ groups }) => {
  return (
    <Flex wrap="wrap" mx={-2}>
      {groups.map(group => (
        <Box p={2} w={['full', null, 1 / 2]} key={group.id} as={Link} to={`/groups/${group.id}`}>
          <GroupCard
            title={group.title}
            start_date={group.start_date}
            end_date={group.end_date}
            is_active={group.is_active}
            is_complete={group.is_complete}
            is_private={group.is_private}
            users_count={group.users_aggregate.aggregate.count}
            fields_count={group.fields_aggregate.aggregate.count}
          />
        </Box>
      ))}
    </Flex>
  )
}

GroupCardList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      creator: PropTypes.shape({
        username: PropTypes.string,
      }),
      title: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
      is_complete: PropTypes.bool.isRequired,
      is_private: PropTypes.bool.isRequired,
      users_aggregate: PropTypes.object.isRequired,
      fields_aggregate: PropTypes.object.isRequired,
    }),
  ),
}

export default GroupCardList
