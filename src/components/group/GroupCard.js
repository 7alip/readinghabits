import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/tr'
import { Heading, Text, Tag, Stack } from '@chakra-ui/core'

const GroupCard = ({ title, is_active, is_complete, is_private, start_date, end_date, fields_count, users_count }) => {
  return (
    <Stack h="full" spacing={2} p={4} boxShadow="sm">
      <Heading size="lg">{title}</Heading>
      <Text>{moment(start_date).fromNow()} kuruldu.</Text>
      {end_date && <Text>{moment(end_date).fromNow()} tamamlanacak.</Text>}
      <Stack isInline spacing={2}>
        <Tag size="sm">{fields_count} Kategori</Tag>
        <Tag size="sm">{users_count} Kullanici</Tag>
        {<Tag size="sm">{is_active ? 'Aktif' : 'Pasif'}</Tag>}
        {is_complete && <Tag size="sm">Tamamlandi</Tag>}
        {<Tag size="sm">{is_private ? 'Ozel' : 'Genel'}</Tag>}
      </Stack>
    </Stack>
  )
}

GroupCard.propTypes = {
  title: PropTypes.string.isRequired,
  is_active: PropTypes.bool.isRequired,
  is_private: PropTypes.bool.isRequired,
  is_complete: PropTypes.bool.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string,
  fields_count: PropTypes.number.isRequired,
  users_count: PropTypes.number.isRequired,
}

export default GroupCard
