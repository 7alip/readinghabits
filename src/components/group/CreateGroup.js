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
} from '@chakra-ui/core'
import { gql, useMutation } from '@apollo/client'
import { AuthContext } from '../../App'

const CREATE_GROUP = gql`
  mutation createGroup($title: String!, $creator: Int!, $start: date!) {
    insert_group(
      objects: {
        title: $title
        creator_id: $creator
        start_date: $start
        users: { data: { user_id: $creator } }
      }
    ) {
      affected_rows
      returning {
        id
        title
      }
    }
  }
`

const CreateGroup = ({ initialRef, isOpen, onClose, refetch }) => {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const { userId } = useContext(AuthContext)

  const [onCreate, { data }] = useMutation(CREATE_GROUP, {
    variables: { title, creator: userId, start: new Date(startDate) },
  })

  if (data) {
    refetch()
    onClose()
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Grup Basligi</FormLabel>
            <Input
              onChange={e => setTitle(e.target.value)}
              ref={initialRef}
              placeholder="Grup Basligi"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Baslangic Tarihi</FormLabel>
            <Input
              onChange={e => {
                setStartDate(e.target.value)
                console.log('e.target.value', e.target.value)
              }}
              type="date"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onCreate} variantColor="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

CreateGroup.propTypes = {
  initialRef: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default CreateGroup
