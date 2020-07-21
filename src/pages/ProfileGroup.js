import React from 'react'
import { Stack, Box, useDisclosure } from '@chakra-ui/core'
import { BsPeopleFill } from 'react-icons/bs'
import { useQuery } from '@apollo/client'

import Card from '../components/shared/Card'
import SectionHeader from '../components/shared/SectionHeader'
import CreateGroup from '../components/profile/CreateGroup'

import { GET_CATEGORIES } from '../apollo/shared/shared-queries'

const ProfileGroup = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { data } = useQuery(GET_CATEGORIES)
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

export default ProfileGroup
