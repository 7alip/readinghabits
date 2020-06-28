import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  Flex,
  IconButton,
  Box,
  Text,
} from '@chakra-ui/core'
import { useQuery, useMutation } from '@apollo/client'

import { AuthContext } from '../../App'

import { GET_GROUP_CATEGORIES } from '../../apollo/groupQueries'
import { ADD_GROUP_READING } from '../../apollo/groupMutations'

const AddGroupReading = ({ isOpen, onClose, groupId }) => {
  const { userId } = useContext(AuthContext)

  const [readings, setReadings] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [value, setValue] = useState('')
  const [entryDate, setEntryDate] = useState(new Date().toISOString().substr(0, 10))

  const { loading, error, data } = useQuery(GET_GROUP_CATEGORIES, { variables: { groupId } })
  const [onAddData] = useMutation(ADD_GROUP_READING, { onCompleted: () => onClose() })

  useEffect(() => {
    if (data) {
      const mappedReadings = data.group_by_pk.fields.map(field => ({
        ...field,
        value: '',
      }))
      setReadings(mappedReadings)
    }
  }, [data])

  const onChangeReading = () => {
    const changedReadings = [...readings].map(reading => {
      if (reading.category.id === Number(categoryId)) {
        reading.value = value
        return reading
      }
      return reading
    })
    setReadings(changedReadings)
    setValue('')
    setCategoryId('')
  }

  const onAddReading = () => {
    readings.forEach(reading =>
      onAddData({ variables: { groupId, userId, value: reading.value, categoryId: reading.category.id, entryDate } }),
    )
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Okuma Girisi</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Tarih</FormLabel>
            <Input type="date" value={entryDate} onChange={e => setEntryDate(e.target.value)} />
          </FormControl>
          <Flex mt={3} justify="space-between" align="flex-end">
            <FormControl w={2 / 3} mr={2}>
              <FormLabel>Kategori</FormLabel>
              <Select
                name="id"
                value={categoryId}
                placeholder="Kategori sec"
                onChange={e => setCategoryId(e.target.value)}
              >
                {error && <option>Hata</option>}
                {readings.length > 0 &&
                  readings.map(reading => (
                    <option key={reading.category.id} value={reading.category.id}>
                      {reading.category.title} - {reading.min_value}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl w={1 / 3} mr={2}>
              <FormLabel>Deger</FormLabel>
              <Input name="value" type="number" value={value} onChange={e => setValue(e.target.value)} />
            </FormControl>
            <IconButton icon="add" onClick={onChangeReading} />
          </Flex>
          <Box mt={4}>
            {!loading &&
              readings.map(reading => (
                <Text key={reading.category.id}>
                  {reading.category.title} - {reading.value || 'Girilmedi'}
                </Text>
              ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            variantColor="blue"
            isDisabled={entryDate && !readings.every(reading => reading.value !== '')}
            onClick={onAddReading}
          >
            Kaydet
          </Button>
          <Button onClick={onClose}>Vazgec</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

AddGroupReading.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
}

export default AddGroupReading
