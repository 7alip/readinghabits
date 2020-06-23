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
  Alert,
  Box,
  Spinner,
  Flex,
} from '@chakra-ui/core'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../../App'
import { CREATE_GROUP } from '../../apollo/groupMutations'
import AddCategory from './AddCategory'

const CreateGroup = ({ initialRef, isOpen, onClose, onRefetch }) => {
  const { userId } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10),
  )
  const [endDate, setEndDate] = useState('')
  const [maxUser, setMaxUser] = useState()
  const [isPrivate, toggleIsPrivate] = useState(false)
  const [isNextStep, setIsNextStep] = useState(false)

  const [onCreate, { data, loading, error }] = useMutation(CREATE_GROUP, {
    variables: {
      title,
      creator: userId,
      start: new Date(startDate),
      end: new Date(endDate),
      maxUser,
      isPrivate,
    },
    onCompleted: () => setIsNextStep(true),
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
        <ModalHeader>
          {data ? data.insert_group.returning[0].title : 'Yeni Grup Olustur'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {loading ? (
            <Spinner />
          ) : !isNextStep ? (
            <Box>
              <FormControl>
                <FormLabel>Grup Basligi</FormLabel>
                <Input
                  variant="flushed"
                  onChange={e => setTitle(e.target.value)}
                  ref={initialRef}
                  placeholder="Grup Basligi"
                  value={title}
                  isRequired
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Baslangic Tarihi</FormLabel>
                <Input
                  variant="flushed"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  type="date"
                  isRequired
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Bitis Tarihi</FormLabel>
                <Input
                  variant="flushed"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  type="date"
                />
              </FormControl>

              <Flex mt={4} justify="space-between" align="center">
                <FormControl mr={4}>
                  <FormLabel>Maksimum Kisi</FormLabel>
                  <Input
                    variant="flushed"
                    value={maxUser}
                    onChange={e => setMaxUser(e.target.value)}
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <Switch
                    mr={3}
                    value={isPrivate}
                    onChange={() => toggleIsPrivate(!isPrivate)}
                    type="date"
                  />
                  <FormLabel>{isPrivate ? 'Ozel' : 'Herkese Acik'}</FormLabel>
                </FormControl>
              </Flex>
            </Box>
          ) : (
            <AddCategory groupId={data.insert_group.returning[0].id} />
          )}
        </ModalBody>

        <ModalFooter>
          {!data && (
            <>
              <Button onClick={onCreate} variantColor="blue" mr={3}>
                Kaydet ve Kategori Ekle
              </Button>
              <Button onClick={onClose}>Vazgec</Button>
            </>
          )}
          {data && (
            <Button
              onClick={() => {
                onClose()
                onRefetch()
                setIsNextStep(false)
              }}
            >
              Tamamlandi
            </Button>
          )}
        </ModalFooter>
        {error && <Alert status="error">Hata olustu!</Alert>}
      </ModalContent>
    </Modal>
  )
}

CreateGroup.propTypes = {
  initialRef: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRefetch: PropTypes.func.isRequired,
}

export default CreateGroup
