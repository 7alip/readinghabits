import React from 'react'
import Layout from '../components/layout/Layout'
import { SimpleGrid, Stack, Text } from '@chakra-ui/core'
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineHome,
  AiOutlineLock,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const barItems = [
  {
    text: 'Anasayfa',
    link: '/giris',
    icon: <AiOutlineHome />,
  },
  {
    text: 'Profil',
    link: '/profil',
    icon: <AiOutlineUser />,
  },
  {
    text: 'Grup',
    link: '/gruplar',
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    text: 'Hesap',
    link: '/hesap',
    icon: <AiOutlineLock />,
  },
]

const Index = () => {
  return (
    <Layout basic>
      <SimpleGrid gridGap={3} columns={2} h="full" py={3}>
        {barItems.map(item => (
          <Stack
            key={item.link}
            as={Link}
            to={item.link}
            w="full"
            h="full"
            justify="center"
            align="center"
            fontSize="2em"
            borderWidth="2px"
            borderColor="gray.500"
            color="gray.500"
          >
            <Text fontSize="2em">{item.icon}</Text>
            <Text fontWeight="bold">{item.text}</Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Layout>
  )
}

export default Index
