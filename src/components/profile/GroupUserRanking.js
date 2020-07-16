import React from 'react'
import {
  Box,
  Stat,
  StatGroup,
  StatLabel,
  StatArrow,
  Divider,
  Stack,
} from '@chakra-ui/core'
import Base from '../shared/Base'
import { FaRegUserCircle } from 'react-icons/fa'

const users = ['Ahmet', 'Veli', 'Selim', 'Osman']
const numbs = [44, 41, 34, 21]
const total = [264, 142, 65, 213]

function GroupUserRanking() {
  return (
    <Base p={4} boxShadow="sm" borderRadius={7} marginTop={5}>
      <StatGroup>
        <Stat>
          <StatLabel fontSize="20px" color="yellow.500">
            Üye
          </StatLabel>
          <Divider />
          {users.map(user => (
            <>
              <Stack isInline>
                <Box as={FaRegUserCircle} />
                <h4>{user}</h4>
              </Stack>
            </>
          ))}
        </Stat>

        <Stat>
          <StatLabel fontSize="20px" color="yellow.500">
            Bu Hafta
          </StatLabel>
          <Divider />

          {numbs.map(numb => (
            <>
              <StatLabel marginBottom={1}>
                <StatArrow type={numb > 34 ? 'increase' : 'decrease'} />
                {numb}
              </StatLabel>
            </>
          ))}

          {/* <StatLabel marginTop={1}>
            <Icon name="minus" size="1.2rem" color="yellow.500" />
            21
          </StatLabel>  */}
        </Stat>

        <Stat>
          <StatLabel fontSize="20px" color="yellow.500">
            Toplam
          </StatLabel>
          <Divider />
          {total.map(t => (
            <>
              <StatLabel marginTop={1}>{t}</StatLabel>
            </>
          ))}
        </Stat>
      </StatGroup>
    </Base>
  )
}

export default GroupUserRanking
