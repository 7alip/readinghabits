import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Box, Stack } from '@chakra-ui/core'
import { BsCollectionFill } from 'react-icons/bs'
import moment from 'moment'
import 'moment/locale/tr'

import SetItem from '../components/profile/SetItem'
import SectionHeader from '../components/shared/SectionHeader'

const ProfileUser = ({ sets }) => {
  return (
    <Stack spacing={5}>
      <Box>
        <SectionHeader
          icon={BsCollectionFill}
          title="Setlerim"
          buttonText="Set Oluştur"
          buttonIcon="add"
        />
        <Stack spacing={3}>
          {sets.map(set => (
            <Box key={set.id} as={Link} to="/set/1">
              <SetItem
                id={set.id}
                header={set.title}
                startDate={moment(set.start_date, 'YYYY-MM-DD').fromNow()}
                bookCount={set.books_aggregate.aggregate.count}
                readCount={set.readings_aggregate.aggregate.sum.value}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

ProfileUser.propTypes = {
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      start_date: PropTypes.string,
      books_aggregate: PropTypes.object,
      readings_aggregate: PropTypes.object,
    }),
  ),
}

export default ProfileUser
