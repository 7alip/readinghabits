import React from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Flex,
  List,
  ListItem,
  ListIcon,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/core'
import { FaCalendarCheck, FaBook } from 'react-icons/fa'
import { BsPeopleCircle } from 'react-icons/bs'

import Base from './Base'

const Card = ({
  header,
  startDate,
  categoryCount,
  memberCount,
  bookCount,
  totalPages,
  progress,
}) => {
  return (
    <Base p={4} boxShadow="sm" borderRadius={7}>
      <Heading as="h3" size="lg" color="teal.400">
        {header}
      </Heading>
      <Flex mt={4} justify="space-between">
        <List>
          <ListItem>
            <ListIcon icon={FaCalendarCheck} color="teal.400" />
            {startDate + ' başlatıldı' || 'Süre belirtilmedi'}
          </ListItem>
          {memberCount && (
            <ListItem>
              <ListIcon icon={BsPeopleCircle} color="teal.400" />
              {memberCount} üye
            </ListItem>
          )}
          {categoryCount && (
            <ListItem>
              <ListIcon icon={FaBook} color="teal.400" />
              {categoryCount} kategori
            </ListItem>
          )}
          {bookCount && (
            <ListItem>
              <ListIcon icon={FaBook} color="teal.400" />
              {bookCount} kitap | {totalPages} sayfa
            </ListItem>
          )}
        </List>
        {progress >= 0 && (
          <CircularProgress
            value={progress}
            color="teal"
            thickness={0.3}
            size={100}
          >
            <CircularProgressLabel>{progress}%</CircularProgressLabel>
          </CircularProgress>
        )}
      </Flex>
    </Base>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  categoryCount: PropTypes.number,
  bookCount: PropTypes.number,
  totalPages: PropTypes.number,
  memberCount: PropTypes.number,
  progress: PropTypes.number,
}

export default Card
