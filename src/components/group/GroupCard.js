import React, { useContext } from 'react'
import moment from 'moment'
import 'moment/locale/tr'
import { FaBook, FaUserFriends } from 'react-icons/all'
import { Heading, Text, Tag, Stack, TagLabel, TagIcon } from '@chakra-ui/core'
import { groupType } from '../../types/groupTypes'
import { AuthContext } from '../../App'

const GroupCard = ({ group }) => {
  const { userId } = useContext(AuthContext)

  const { title, is_active, is_complete, is_private, start_date, end_date, fields, users, creator } = group

  const isJoined = users.some(u => {
    return u.user.id === userId && creator.id !== userId
  })
  const isCreator = creator.id === userId

  return (
    <Stack bg="white" h="full" spacing={2} p={4} boxShadow="sm">
      <Heading size="lg">
        {title}{' '}
        {(isJoined || isCreator) && (
          <Tag size="sm" variantColor={isJoined ? 'orange' : isCreator && 'purple'}>
            <TagLabel>{isJoined ? 'Uye' : isCreator && 'Admin'}</TagLabel>
          </Tag>
        )}
      </Heading>
      <Text>{moment(start_date).fromNow()} kuruldu.</Text>
      {end_date && <Text>{moment(end_date).fromNow()} tamamlanacak.</Text>}
      <Stack isInline spacing={2}>
        <Tag variant="outline" size="sm">
          <TagIcon icon={FaBook} />
          <TagLabel>{fields.length}</TagLabel>
        </Tag>
        <Tag variant="outline" size="sm">
          <TagIcon icon={FaUserFriends} />
          <TagLabel>{users.length}</TagLabel>
        </Tag>
        {
          <Tag variant="outline" size="sm">
            {is_active ? 'Aktif' : 'Pasif'}
          </Tag>
        }
        {is_complete && <Tag size="sm">Tamamlandi</Tag>}
        {
          <Tag variant="outline" size="sm">
            {is_private ? 'Ozel' : 'Genel'}
          </Tag>
        }
      </Stack>
    </Stack>
  )
}

GroupCard.propTypes = {
  group: groupType,
}

export default GroupCard
