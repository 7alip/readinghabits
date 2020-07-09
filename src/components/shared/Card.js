import React from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Flex,
  List,
  ListItem,
  ListIcon,
  useTheme,
} from '@chakra-ui/core'
import { FaCalendarCheck, FaBook } from 'react-icons/fa'
import { BsPeopleCircle } from 'react-icons/bs'
import Circle from 'react-circle'

import Base from './Base'

const Card = ({
  header,
  endDate,
  categoryCount,
  memberCount,
  bookCount,
  progress,
}) => {
  const theme = useTheme()
  return (
    <Base p={4} boxShadow="sm" borderRadius={7}>
      <Heading as="h3" size="lg" color="teal.400">
        {header}
      </Heading>
      <Flex mt={4} justify="space-between" align="center">
        <List>
          <ListItem>
            <ListIcon icon={FaCalendarCheck} color="teal.400" />
            {endDate || 'Süre belirtilmedi'}
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
              {bookCount} kitap
            </ListItem>
          )}
        </List>
        {progress && (
          <Circle
            progress={progress}
            progressColor={theme.colors.teal[500]}
            textColor={theme.colors.teal[400]}
            lineWidth={40}
          />
        )}
      </Flex>
    </Base>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  categoryCount: PropTypes.number,
  bookCount: PropTypes.number,
  memberCount: PropTypes.number,
  progress: PropTypes.number,
}

export default Card
