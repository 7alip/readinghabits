import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Box, useDisclosure } from '@chakra-ui/core'
import { BsPeopleFill } from 'react-icons/bs'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/tr'

import Card from '../components/shared/Card'
import SectionHeader from '../components/shared/SectionHeader'
import CreateGroup from '../components/profile/CreateGroup'

import { GET_CATEGORIES } from '../apollo/shared/shared-queries'

const ProfileGroup = ({ groups }) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { data } = useQuery(GET_CATEGORIES)
  return (
    <Stack spacing={5}>
      <Box>
        <SectionHeader
          icon={BsPeopleFill}
          title="Gruplarım"
          buttonText="Grup Oluştur"
          buttonIcon="add"
          onClick={onOpen}
        />
        <Stack spacing={3}>
          {groups.map(({ group }, index) => (
            <Box as={Link} key={index} to={`/grup/${group.id}`}>
              <Card
                header={group.title}
                startDate={moment(group.start_date, 'YYYY-MM-DD').fromNow()}
                memberCount={group.users_aggregate.aggregate.count}
                categoryCount={group.fields_aggregate.aggregate.count}
              />
            </Box>
          ))}
        </Stack>

        {data && (
          <CreateGroup
            onClose={onClose}
            isOpen={isOpen}
            categories={data.category}
          />
        )}
      </Box>
    </Stack>
  )
}

ProfileGroup.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.shape({
        title: PropTypes.string.isRequired,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        fields_aggregate: PropTypes.object,
        users_aggregate: PropTypes.object,
      }),
    }),
  ),
}

export default ProfileGroup
