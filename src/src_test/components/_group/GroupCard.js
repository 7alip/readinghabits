import React from 'react'
import PropTypes from 'prop-types'

import { Heading, Text, Tag, Stack } from '@chakra-ui/core'

const GroupCard = ({
  title,
  is_active,
  is_complete,
  is_private,
  start_date,
  end_date,
  fields_count,
  users_count,
}) => {
  return (
    <Stack spacing={2} p={3} boxShadow="sm">
      <Heading size="lg">{title}</Heading>
      <Text>
        {start_date}
        {end_date && '-' + end_date}
      </Text>
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
