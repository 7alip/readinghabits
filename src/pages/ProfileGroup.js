import React from 'react'
import { Stack, Box, useDisclosure } from '@chakra-ui/core'
import SectionHeader from '../components/shared/SectionHeader'
import { BsPeopleFill } from 'react-icons/bs'
import Card from '../components/shared/Card'
import CreateGroup from '../components/profile/CreateGroup'

const ProfileGroup = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  return (
    <Stack spacing={5}>
      {/* Groups */}
      <Box>
        <SectionHeader
          icon={BsPeopleFill}
          title="Gruplarım"
          buttonText="Grup Oluştur"
          buttonIcon="add"
          onClick={onOpen}
        />
        <Card header="Grup Başlığı" memberCount={4} categoryCount={4} />

        <CreateGroup onClose={onClose} isOpen={isOpen} />
      </Box>
    </Stack>
  )
}

export default ProfileGroup
