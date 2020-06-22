import React from 'react'
import { Flex, Text, PseudoBox } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineSetting,
  AiOutlineCode,
} from 'react-icons/ai'
import styled from '@emotion/styled'

const barItems = [
  {
    text: 'Anasayfa',
    link: '/home',
    icon: <AiOutlineHome />,
  },
  {
    text: 'Profil',
    link: '/profile',
    icon: <AiOutlineUser />,
  },
  {
    text: 'Grup',
    link: '/group',
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    text: 'Ayarlar',
    link: '/settings',
    icon: <AiOutlineSetting />,
  },
  {
    text: 'Testler',
    link: '/test',
    icon: <AiOutlineCode />,
  },
]

const StyledNavLink = styled(Flex)`
  &.active {
    border-top: 2px solid gray;
  }
`

const BottomNavigation = () => {
  return (
    <Flex position="sticky" bottom="0" w="full" bg="white" h="64px">
      {barItems.map(item => (
        <PseudoBox
          key={item.link}
          flex="1"
          borderTopWidth="2px"
          borderTopColor="gray.100"
        >
          <StyledNavLink
            py={2}
            activeClassName="active"
            exact={item.link === '/'}
            flexDir="column"
            textAlign="center"
            align="center"
            justify="center"
            h="full"
            as={NavLink}
            to={item.link}
            activeStyle={{ color: 'red' }}
          >
            <Text fontSize="1.5em">{item.icon}</Text>
            <Text fontWeight="bold" display={['none', 'block']}>
              {item.text}
            </Text>
          </StyledNavLink>
        </PseudoBox>
      ))}
    </Flex>
  )
}

export default BottomNavigation
