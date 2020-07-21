import React from 'react'
import { Tabs, TabList, Tab, Text } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import { BsPeopleFill, BsPersonFill } from 'react-icons/bs'
import Base from '../shared/Base'

const ProfileTabs = () => {
  return (
    <Tabs as={Base} isFitted variantColor="teal" mx={[-2, -4]}>
      <TabList>
        <Tab
          py={3}
          as={Link}
          color="gray.400"
          fontWeight="bold"
          to="/profil"
          _selected={{
            borderBottomColor: 'teal.400',
            color: 'teal.400',
          }}
        >
          <Text fontSize="lg" mr={2}>
            <BsPersonFill />
          </Text>
          <Text>Bireysel</Text>
        </Tab>
        <Tab
          py={3}
          as={Link}
          color="gray.400"
          fontWeight="bold"
          to="/profil/grup"
          _selected={{
            borderBottomColor: 'teal.400',
            color: 'teal.400',
          }}
        >
          <Text fontSize="lg" mr={2}>
            <BsPeopleFill />
          </Text>
          <Text>Grup</Text>
        </Tab>
      </TabList>
    </Tabs>
  )
}

export default ProfileTabs
