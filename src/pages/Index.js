import React from 'react'
import { SimpleGrid, Stack, Text, Box } from '@chakra-ui/core'
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineHome,
  AiOutlineLock,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Div from '../components/layout/Div'

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
    <SimpleGrid gridGap={3} columns={2} h="full" py={3}>
      {barItems.map(item => (
        <Box as={Link} key={item.link} to={item.link}>
          <Div
            as={Stack}
            w="full"
            h="full"
            justifyContent="center"
            alignItems="center"
            fontSize="2em"
            boxShadow="sm"
          >
            <Text fontSize="2em">{item.icon}</Text>
            <Text fontWeight="bold">{item.text}</Text>
          </Div>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default Index
