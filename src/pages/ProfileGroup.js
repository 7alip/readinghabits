import React from 'react'
import { Stack, Box } from '@chakra-ui/core'
import SectionHeader from '../components/shared/SectionHeader'
import { BsPeopleFill } from 'react-icons/bs'
import Card from '../components/shared/Card'
import GroupUserRanking from '../components/profile/GroupUserRanking'

const ProfileGroup = () => {
  return (
    <Stack spacing={5}>
      {/* Groups */}
      <Box>
        <SectionHeader
          icon={BsPeopleFill}
          title="Gruplarım"
          buttonText="Grup Oluştur"
          buttonIcon="add"
        />
        <Card header="Grup Başlığı" memberCount={4} categoryCount={4} />
        <GroupUserRanking />
      </Box>
    </Stack>
  )
}

export default ProfileGroup
