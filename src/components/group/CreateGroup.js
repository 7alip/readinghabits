import React, { useState } from 'react'
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
  Select,
  Stack,
  Heading,
  Text,
  Tag,
  TagLabel,
} from '@chakra-ui/core'
import { useMutation, useQuery } from '@apollo/client'
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

const CreateGroup = ({ initialRef, isOpen, onClose, userId }) => {
  const [groupFields, setGroupFields] = useState(initialGroupFields)
  const [categoryFields, setCategoryFields] = useState([])
  const [currentCategoryField, setCurrentCategoryField] = useState(
    initialCategoryFields,
  )
  const [step, setStep] = useState(1)

  const { title, startDate, endDate, maxUser, isPrivate } = groupFields

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
      maxUser: Number(maxUser),
      isPrivate,
    },
    onCompleted: async result =>
      await Promise.all(
        categoryFields.map(({ categoryId, minValue, point }) =>
          onAddCategory({
            variables: {
              groupId: result.insert_group.returning[0].id,
              categoryId: Number(categoryId),
              minValue: Number(minValue),
              point: Number(point),
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

  // const handleChangeCategory = ({ name, value }, i) => {
  //   setCurrentCategoryField(categoryFields[i])
  //   const fields = [
  //     ...categoryFields.slice(0, i),
  //     { ...categoryFields[i], [name]: value },
  //   ]
  //   setCategoryFields(fields)
  // }

  const handleSetCategory = ({ name, value }) => {
    setCurrentCategoryField({ ...currentCategoryField, [name]: value })
  }

  const handleAddCategory = e => {
    e.preventDefault()
    setCategoryFields([...categoryFields, currentCategoryField])
    setCurrentCategoryField(initialCategoryFields)
  }

  const DisplayAddedCategoriesInfo = () =>
    categoryFields.length > 0 && (
      <>
        <Heading size="md" my={3}>
          Kategoriler
        </Heading>
        <Box as="table">
          <Box
            fontWeight="bold"
            as="thead"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
          >
            <tr>
              <td>Kategori</td>
              <td>Min deger</td>
              <td>Puan</td>
            </tr>
          </Box>
          <Box as="tbody">
            {categoryFields.map(category => (
              <tr key={category.categoryId}>
                <td>
                  {
                    dataGetCategory.category.find(
                      c => c.id === Number(category.categoryId),
                    ).title
                  }
                </td>
                <td>{category.minValue}</td>
                <td>{category.point || 'Belirlenmedi'}</td>
              </tr>
            ))}
          </Box>
        </Box>
      </>
    )

  const DisplayCreatedGroupInfo = () => (
    <>
      <Heading size="lg" my={3}>
        {groupFields.title}{' '}
        <Tag size="sm">
          <TagLabel>{groupFields.isPrivate ? 'Ozel' : 'Acik'}</TagLabel>
        </Tag>
      </Heading>
      <Text>
        <strong>Baslangic:</strong> {groupFields.startDate}
      </Text>

      <Text>
        <strong>Bitis:</strong> {groupFields.endDate || 'Belirlenmedi'}
      </Text>
      <Text>
        <strong>Maksimum katilimci:</strong>{' '}
        {groupFields.maxUser || 'Belirlenmedi'}
      </Text>
    </>
  )

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
        <Stack
          alignItems="space-between"
          as={ModalBody}
          borderWidth="1px"
          borderColor="gray.200"
        >
          {/* Create Group Form */}
          {step === 1 && (
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

              <Stack spacing={4} isInline mt={4}>
                <FormControl>
                  <FormLabel>Maksimum Kisi</FormLabel>
                  <Input
                    name="maxUser"
                    value={maxUser}
                    onChange={handleChangeGroupField}
                    type="number"
                  />
                </FormControl>
                <FormControl mx="auto">
                  <FormLabel>Özel grup</FormLabel>
                  <Switch
                    d="block"
                    size="lg"
                    name="isPrivate"
                    value={isPrivate}
                    onChange={handleChangeGroupField}
                    type="date"
                  />
                </FormControl>
              </Stack>
            </Box>
          )}

          {/* Add Category Form */}
          {step === 2 && (
            <>
              <DisplayCreatedGroupInfo />
              <DisplayAddedCategoriesInfo />
              <Box
                as="form"
                p={4}
                mt="auto"
                mx={-4}
                bg="orange.100"
                onSubmit={handleAddCategory}
              >
                <Stack spacing={2} isInline>
                  <FormControl w={1 / 2}>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      isRequired
                      name="categoryId"
                      value={currentCategoryField.categoryId}
                      onChange={e => handleSetCategory(e.target)}
                      placeholder="Kategori sec"
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
                  <FormControl w={1 / 4}>
                    <FormLabel>Minimum</FormLabel>
                    <Input
                      isRequired
                      name="minValue"
                      type="number"
                      value={currentCategoryField.minValue}
                      onChange={e => handleSetCategory(e.target)}
                    />
                  </FormControl>
                  <FormControl w={1 / 4}>
                    <FormLabel>Puan</FormLabel>
                    <Input
                      name="point"
                      type="number"
                      value={currentCategoryField.point}
                      onChange={e => handleSetCategory(e.target)}
                    />
                  </FormControl>
                </Stack>
                <Button type="submit" variantColor="blue" isFullWidth mt={2}>
                  Ekle
                </Button>
              </Box>
            </>
          )}
        </Stack>

        <ModalFooter>
          {step === 2 && (
            <>
              <Button
                mr={2}
                isLoading={loadingCreateGroup || loadingAddCategory}
                onClick={onCreateGroup}
                variantColor="blue"
                leftIcon="check"
              >
                Kaydet
              </Button>
              <Button
                variantColor="orange"
                mr={2}
                leftIcon="chevron-left"
                onClick={() => setStep(1)}
              >
                Onceki
              </Button>
            </>
          )}
          {step === 1 && (
            <Button
              variantColor="orange"
              mr={2}
              rightIcon="chevron-right"
              onClick={() => setStep(2)}
              isDisabled={!groupFields.title}
            >
              Sonraki
            </Button>
          )}
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
  userId: PropTypes.number.isRequired,
}

export default CreateGroup
