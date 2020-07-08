import React, { useContext } from 'react'
import { Flex, Text, PseudoBox } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineLock,
} from 'react-icons/ai'
import styled from '@emotion/styled'
import { AuthContext } from '../../context/auth-context'
import Base from '../shared/Base'

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
    isPrivate: true,
  },
  {
    text: 'Gruplar',
    link: '/gruplar',
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    text: 'Hesap',
    link: '/hesap',
    icon: <AiOutlineLock />,
  },
]

const StyledNavLink = styled(Flex)`
  &.active {
    border-top: 2px solid gray;
  }
`

const BottomNavigation = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Base as={Flex} position="sticky" bottom="0" w="full" h="64px">
      {barItems.map(
        item =>
          (isLoggedIn || (!isLoggedIn && !item.isPrivate)) && (
            <PseudoBox key={item.link} flex="1">
              <StyledNavLink
                py={2}
                borderTopWidth="2px"
                borderTopColor="transparent"
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
                <Text fontWeight={['500', '700']} fontSize={['xs', 'sm', 'md']}>
                  {item.text}
                </Text>
              </StyledNavLink>
            </PseudoBox>
          ),
      )}
    </Base>
  )
}

export default BottomNavigation
