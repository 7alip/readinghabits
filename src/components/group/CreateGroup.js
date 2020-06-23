import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Switch,
} from '@chakra-ui/core'
import { gql, useMutation } from '@apollo/client'
import { AuthContext } from '../../App'
import { GET_USER_GROUPS } from '../../pages/MyGroups'

const CREATE_GROUP = gql`
  mutation createGroup(
    $title: String!
    $creator: Int!
    $start: date!
    $end: date
    $isPrivate: Boolean!
  ) {
    insert_group(
      objects: {
        title: $title
        creator_id: $creator
        start_date: $start
        end_date: $end
        is_private: $isPrivate
        users: { data: { user_id: $creator } }
      }
    ) {
      affected_rows
    }
  }
`

const CreateGroup = ({ initialRef, isOpen, onClose }) => {
  const { userId } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10),
  )
  const [endDate, setEndDate] = useState('')
  const [isPrivate, toggleIsPrivate] = useState(false)

  const [onCreate] = useMutation(CREATE_GROUP, {
    variables: {
      title,
      creator: userId,
      start: new Date(startDate),
      end: new Date(endDate),
      isPrivate,
    },
    refetchQueries: [{ query: GET_USER_GROUPS, variables: { id: userId } }],
    onCompleted: () => onClose(),
  })

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Yeni Grup Olustur</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Grup Basligi</FormLabel>
            <Input
              onChange={e => setTitle(e.target.value)}
              ref={initialRef}
              placeholder="Grup Basligi"
              value={title}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Baslangic Tarihi</FormLabel>
            <Input
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              type="date"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Bitis Tarihi</FormLabel>
            <Input
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              type="date"
            />
          </FormControl>

          <FormControl mt={4}>
            <Switch
              mr={3}
              value={isPrivate}
              onChange={() => toggleIsPrivate(!isPrivate)}
              type="date"
            />
            <FormLabel>{isPrivate ? 'Ozel' : 'Herkese Acik'}</FormLabel>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onCreate} variantColor="blue" mr={3}>
            Kaydet
          </Button>
          <Button onClick={onClose}>Vazgeç</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

CreateGroup.propTypes = {
  initialRef: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CreateGroup
