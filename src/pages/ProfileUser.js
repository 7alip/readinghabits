import React from 'react'
import SectionHeader from '../components/shared/SectionHeader'
import { Box, Stack } from '@chakra-ui/core'
import Card from '../components/shared/Card'
import { BsCollectionFill } from 'react-icons/bs'

const ProfileUser = () => {
  return (
    <Stack spacing={5}>
      {/* Groups */}
      <Box>
        <SectionHeader
          icon={BsCollectionFill}
          title="Setlerim"
          buttonText="Set Oluştur"
          buttonIcon="add"
        />
        <Card
          header="Set Başlığı"
          endDate="2020-10-04"
          bookCount={4}
          progress={23}
        />
      </Box>
    </Stack>
  )
}

export default ProfileUser
