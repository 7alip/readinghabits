import React, { useContext, useEffect } from 'react'

import { useLazyQuery } from '@apollo/client'
import {
  Spinner,
  Alert,
  Box,
  Heading,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
} from '@chakra-ui/core'

import { AuthContext } from '../../App'
import GroupCardList from '../../components/group/GroupCardList'
import CreateGroup from '../../components/group/CreateGroup'
import { GET_GROUPS } from '../../apollo/groupQueries'

const MyGroups = () => {
  const { userId } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [onGetUserGroups, { loading, error, data }] = useLazyQuery(GET_GROUPS)

  useEffect(() => {
    if (userId) onGetUserGroups({ variables: { id: userId } })
  }, [userId, onGetUserGroups])

  const initialRef = React.useRef()

  if (!userId) return <Heading>Giris yapiniz</Heading>
  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <Box mt={2}>
      <IconButton
        isRound
        pos="fixed"
        bottom={5}
        right={5}
        size="lg"
        ml={2}
        isDisabled={!userId}
        variantColor="green"
        icon="add"
        onClick={onOpen}
      />
      <Tabs isFitted variant="line" variantColor="blue">
        <TabList mb={2}>
          <Tab>Oluşturduklarım</Tab>
          <Tab>Katıldıklarım</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{data && <GroupCardList groups={data.group.filter(g => g.creator !== userId)} />}</TabPanel>
          <TabPanel>{data && <GroupCardList groups={data.group.filter(g => g.creator === userId)} />}</TabPanel>
        </TabPanels>
      </Tabs>

      {isOpen && <CreateGroup userId={userId} initialRef={initialRef} isOpen={isOpen} onClose={onClose} />}
    </Box>
  )
}

export default MyGroups
