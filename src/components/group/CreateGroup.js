import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  Stack,
} from '@chakra-ui/core'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_GROUP, ADD_GROUP_CATEGORY } from '../../apollo/groupMutations'
import { GET_GROUP_CATEGORIES, GET_USER_GROUPS } from '../../apollo/groupQueries'
import DisplayCreatedGroupInfo from './DisplayCreatedGroupInfo'
import DisplayAddedCategoriesInfo from './DisplayAddedCategoriesInfo'
import AddCategoryForm from './AddCategoryForm'
import CreateGroupForm from './CreateGroupForm'

const initialGroupFields = {
  title: '',
  startDate: new Date().toISOString().substr(0, 10),
  endDate: '',
  maxUser: '',
  isPrivate: false,
}

const initialCategoryFields = {
  categoryId: 0,
  minValue: '',
  point: '',
}

const CreateGroup = ({ initialRef, isOpen, onClose, userId }) => {
  const [groupFields, setGroupFields] = useState(initialGroupFields)
  const [categoryFields, setCategoryFields] = useState([])
  const [currentCategoryField, setCurrentCategoryField] = useState(initialCategoryFields)
  const [step, setStep] = useState(1)

  const { title, startDate, endDate, maxUser, isPrivate } = groupFields

  const { loading: loadingGetCategory, error: errorGetCategory, data: dataGetCategory } = useQuery(GET_GROUP_CATEGORIES)

  const [onAddCategory, { loading: loadingAddCategory, error: errorAddCategory }] = useMutation(ADD_GROUP_CATEGORY, {
    onCompleted: () => onClose(),
    refetchQueries: [{ query: GET_USER_GROUPS, variables: { id: userId } }],
  })

  const [onCreateGroup, { loading: loadingCreateGroup, error: errorCreateGroup }] = useMutation(CREATE_GROUP, {
    variables: {
      title,
      creator: userId,
      start: new Date(startDate),
      end: new Date(endDate),
      maxUser: !maxUser ? null : maxUser,
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
              point: !point ? null : point,
            },
          }),
        ),
      ),
  })

  const handleChangeGroupField = e => {
    const { name, value, type } = e.target
    if (name === 'isPrivate')
      return setGroupFields({
        ...groupFields,
        isPrivate: !groupFields.isPrivate,
      })
    setGroupFields({ ...groupFields, [name]: type === 'number' ? Number(value) : value })
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
    setCurrentCategoryField({ ...currentCategoryField, [name]: Number(value) })
  }

  const handleAddCategory = e => {
    e.preventDefault()
    setCategoryFields([...categoryFields, currentCategoryField])
    setCurrentCategoryField(initialCategoryFields)
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
        {step === 2 && (
          <AddCategoryForm
            error={errorGetCategory}
            loading={loadingGetCategory}
            handleAddCategory={handleAddCategory}
            handleSetCategory={handleSetCategory}
            categories={dataGetCategory.category}
            categoryField={currentCategoryField}
          />
        )}
        <Stack alignItems="space-between" as={ModalBody} borderWidth="1px" borderColor="gray.200">
          {step === 1 && (
            <CreateGroupForm
              initialRef={initialRef}
              handleChangeGroupField={handleChangeGroupField}
              groupFields={groupFields}
            />
          )}

          {step === 2 && (
            <>
              <DisplayCreatedGroupInfo groupFields={groupFields} />
              <DisplayAddedCategoriesInfo categoryFields={categoryFields} categories={dataGetCategory.category} />
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
              <Button variantColor="orange" mr={2} leftIcon="chevron-left" onClick={() => setStep(1)}>
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
        {(errorAddCategory || errorCreateGroup) && <Alert status="error">Hata olustu!</Alert>}
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
