import React from 'react'
import moment from 'moment'
import 'moment/locale/tr'
import { Heading, Text, Tag, Stack } from '@chakra-ui/core'
import { groupType } from '../../types/groupTypes'

const GroupCard = ({ group }) => {
  const { title, is_active, is_complete, is_private, start_date, end_date, fields, users } = group
  return (
    <Stack h="full" spacing={2} p={4} boxShadow="sm">
      <Heading size="lg">{title}</Heading>
      <Text>{moment(start_date).fromNow()} kuruldu.</Text>
      {end_date && <Text>{moment(end_date).fromNow()} tamamlanacak.</Text>}
      <Stack isInline spacing={2}>
        <Tag size="sm">{fields.length} Kategori</Tag>
        <Tag size="sm">{users.length} Kullanici</Tag>
        {<Tag size="sm">{is_active ? 'Aktif' : 'Pasif'}</Tag>}
        {is_complete && <Tag size="sm">Tamamlandi</Tag>}
        {<Tag size="sm">{is_private ? 'Ozel' : 'Genel'}</Tag>}
      </Stack>
    </Stack>
  )
}

GroupCard.propTypes = {
  group: groupType,
}

export default GroupCard
