import React, { useState, useContext, useEffect } from 'react'
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
  Flex,
  Divider,
  Select,
  Stack,
  IconButton,
} from '@chakra-ui/core'
import { useMutation, useQuery } from '@apollo/client'
import { AuthContext } from '../../App'
import { CREATE_GROUP, ADD_GROUP_CATEGORY } from '../../apollo/groupMutations'
import {
  GET_GROUP_CATEGORIES,
  GET_USER_GROUPS,
} from '../../apollo/groupQueries'

const initialGroupFields = {
  title: '',
  startDate: new Date().toISOString().substr(0, 10),
  endDate: '',
  maxUser: '',
  isPrivate: false,
}

const initialCategoryFields = {
  categoryId: '',
  minValue: '',
  point: '',
}

const CreateGroup = ({ initialRef, isOpen, onClose }) => {
  const { userId } = useContext(AuthContext)

  const [groupFields, setGroupFields] = useState(initialGroupFields)
  const [categoryFields, setCategoryFields] = useState([initialCategoryFields])

  const { title, startDate, endDate, maxUser, isPrivate } = groupFields

  useEffect(() => {
    console.log('categoryFields', categoryFields)
    console.log('groupFields', groupFields)
  }, [categoryFields, groupFields])

  const {
    loading: loadingGetCategory,
    error: errorGetCategory,
    data: dataGetCategory,
  } = useQuery(GET_GROUP_CATEGORIES)

  const [
    onAddCategory,
    { loading: loadingAddCategory, error: errorAddCategory },
  ] = useMutation(ADD_GROUP_CATEGORY, {
    onCompleted: () => onClose(),
    refetchQueries: [{ query: GET_USER_GROUPS, variables: { id: userId } }],
  })

  const [
    onCreateGroup,
    { loading: loadingCreateGroup, error: errorCreateGroup },
  ] = useMutation(CREATE_GROUP, {
    variables: {
      title,
      creator: userId,
      start: new Date(startDate),
      end: new Date(endDate),
      maxUser,
      isPrivate,
    },
    onCompleted: async result =>
      await Promise.all(
        categoryFields.map(({ categoryId, minValue, point }) =>
          onAddCategory({
            variables: {
              groupId: result.insert_group.returning[0].id,
              categoryId,
              minValue,
              point,
            },
          }),
        ),
      ),
  })

  const handleChangeGroupField = e => {
    const { name, value } = e.target
    if (name === 'isPrivate')
      return setGroupFields({
        ...groupFields,
        isPrivate: !groupFields.isPrivate,
      })
    setGroupFields({ ...groupFields, [name]: value })
  }

  const handleAddCategory = ({ name, value }, i) => {
    const fields = [
      ...categoryFields.slice(0, i),
      { ...categoryFields[i], [name]: value },
    ]
    setCategoryFields(fields)
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Yeni Grup Olustur</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box as="form">
            <FormControl>
              <FormLabel>Grup Basligi</FormLabel>
              <Input
                name="title"
                onChange={handleChangeGroupField}
                ref={initialRef}
                placeholder="Grup Basligi"
                value={title}
                isRequired
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Baslangic Tarihi</FormLabel>
              <Input
                name="startDate"
                value={startDate}
                onChange={handleChangeGroupField}
                type="date"
                isRequired
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bitis Tarihi</FormLabel>
              <Input
                name="endDate"
                value={endDate}
                onChange={handleChangeGroupField}
                type="date"
              />
            </FormControl>

            <Flex mt={4} justify="space-between" align="center">
              <FormControl mr={4}>
                <FormLabel>Maksimum Kisi</FormLabel>
                <Input
                  name="maxUser"
                  value={maxUser}
                  onChange={handleChangeGroupField}
                  type="number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ozel grup</FormLabel>
                <Switch
                  name="isPrivate"
                  mr={3}
                  value={isPrivate}
                  onChange={handleChangeGroupField}
                  type="date"
                />
              </FormControl>
            </Flex>
          </Box>
          <Divider my={3} />
          {categoryFields.map((field, i) => (
            <Box key={i}>
              <FormControl>
                <FormLabel>Kategori</FormLabel>
                <Select
                  name="categoryId"
                  value={field.categoryId}
                  onChange={e => handleAddCategory(e.target, i)}
                  placeholder="Kategori"
                >
                  {errorGetCategory && <option>Hata olustu</option>}
                  {loadingGetCategory ? (
                    <option>Yukleniyor</option>
                  ) : (
                    dataGetCategory.category.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))
                  )}
                </Select>
              </FormControl>
              <Stack align="center" isInline spacing={2} mt={3}>
                <FormControl>
                  <FormLabel>Min Sayfa</FormLabel>
                  <Input
                    name="minValue"
                    type="number"
                    value={field.minValue}
                    onChange={e => handleAddCategory(e.target, i)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Puan</FormLabel>
                  <Input
                    name="point"
                    type="number"
                    value={field.point}
                    onChange={e => handleAddCategory(e.target, i)}
                  />
                </FormControl>
                <IconButton
                  alignSelf="flex-end"
                  variantColor="green"
                  isRound
                  icon="add"
                  onClick={() => {
                    setCategoryFields(prev => [...prev, initialCategoryFields])
                  }}
                />
              </Stack>
            </Box>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={loadingCreateGroup || loadingAddCategory}
            onClick={onCreateGroup}
            variantColor="blue"
            mr={3}
          >
            Kaydet ve Kategori Ekle
          </Button>
          <Button onClick={onClose}>Vazgec</Button>
        </ModalFooter>
        {(errorAddCategory || errorCreateGroup) && (
          <Alert status="error">Hata olustu!</Alert>
        )}
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
