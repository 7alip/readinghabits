/* eslint-disable react/prop-types */
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
  Stack,
  Switch,
  Select,
  Flex,
  Box,
  Text,
} from '@chakra-ui/core'
import { Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormField from '../form/FormField'

const GroupSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'En az üç karakter olmalı')
    .max(30, 'En fazla 30 karakter olabilir')
    .required('Zorunlu'),
  startDate: Yup.string().required('Zorunlu'),
  endDate: Yup.string(),
  maxUser: Yup.number()
    .min(2, 'En az 2 kişi olmalı')
    .max(50, 'En fazla 50 kişi olabilir'),
  isPrivate: Yup.bool(),
  day: Yup.number().required('Gün seçmelisiniz'),
  categories: Yup.array(),
})

const today = new Date().toISOString().slice(0, 10)

const CreateGroup = ({ isOpen, onClose }) => {
  const [isNextStep, setIsNextStep] = useState(false)

  const category = [
    {
      id: 1,
      title: "Kur'an-ı Kerim",
    },
    {
      id: 3,
      title: 'Pırlanta',
    },
    {
      id: 14,
      title: 'Dini Kitap',
    },
    {
      id: 10,
      title: 'Kültür Kitap',
    },
    {
      id: 2,
      title: 'Risale-i Nur',
    },
    {
      id: 6,
      title: 'Büyük Cevşen',
    },
    {
      id: 5,
      title: 'Cevşen',
    },
    {
      id: 13,
      title: 'Dualar',
    },
    {
      id: 11,
      title: "el Kulubu'd Daria",
    },
    {
      id: 9,
      title: 'Oruç',
    },
    {
      id: 8,
      title: 'Evvabin',
    },
    {
      id: 7,
      title: 'Teheccüd',
    },
  ]

  return (
    <Formik
      initialValues={{
        title: '',
        startDate: today,
        endDate: '',
        maxUser: '',
        isPrivate: false,
        day: 1,
        categories: category.map(category => ({
          ...category,
          isActive: false,
          minValue: '',
        })),
      }}
      validationSchema={GroupSchema}
      onSubmit={values => console.log(values)}
    >
      {props => {
        return (
          <Modal
            scrollBehavior="inside"
            isCentered
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent
              mx={[2, null, 0]}
              as="form"
              onSubmit={props.handleSubmit}
            >
              <ModalHeader>Grup Oluştur</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {!isNextStep && (
                  <Stack spacing={3}>
                    <FormField
                      {...props}
                      isRequired
                      label="Title"
                      name="title"
                      placeholder="Title"
                    />

                    <FormField
                      {...props}
                      isRequired
                      label="Baslangic Tarihi"
                      name="startDate"
                      type="date"
                    />

                    <FormField
                      {...props}
                      label="Bitiş Tarihi"
                      name="endDate"
                      type="date"
                    />

                    <Flex>
                      <Box mr={3}>
                        <FormField
                          {...props}
                          label="Maksimum katilimci"
                          name="maxUser"
                          type="number"
                          placeholder="Maksimum katilimci"
                        />
                      </Box>
                      <FormField
                        {...props}
                        as={Switch}
                        size="lg"
                        label="Özel grup"
                        name="isPrivate"
                      />
                    </Flex>

                    {props.values.isPrivate && (
                      <FormField
                        {...props}
                        placeholder="Gün seçiniz"
                        label="Analiz günü"
                        name="day"
                        as={Select}
                      >
                        <option value={1}>Pazartesi</option>
                        <option value={2}>Sali</option>
                        <option value={3}>Carsamba</option>
                        <option value={4}>Persembe</option>
                        <option value={5}>Cuma</option>
                        <option value={6}>Cumartesi</option>
                        <option value={0}>Pazar</option>
                      </FormField>
                    )}
                  </Stack>
                )}

                {isNextStep && (
                  <Stack spacing={3}>
                    <Flex
                      fontWeight="bold"
                      borderBottom="1px"
                      justify="space-between"
                    >
                      <Text>Kategori</Text>
                      <Text>Haftalik hedef</Text>
                    </Flex>
                    <FieldArray
                      name="categories"
                      render={() =>
                        props.values.categories.map((c, index) => (
                          <Flex key={index} align="center" my={1}>
                            <Text w={200}>{c.title}</Text>
                            <FormField
                              {...props}
                              as={Switch}
                              isDisabled={c.minValue !== ''}
                              size="lg"
                              name={`categories.${index}.isActive`}
                            />
                            <FormField
                              isDisabled={!c.isActive}
                              ml={3}
                              {...props}
                              type="number"
                              name={`categories.${index}.minValue`}
                              placeholder="Haftalik hedef"
                            />
                          </Flex>
                        ))
                      }
                    />
                  </Stack>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  mr={2}
                  onClick={() => {
                    props.resetForm()
                    setIsNextStep(false)
                    onClose()
                  }}
                >
                  Vazgeç
                </Button>
                {isNextStep ? (
                  <Stack isInline>
                    <Button
                      leftIcon="arrow-back"
                      variantColor="blue"
                      type="submit"
                      onClick={() => setIsNextStep(false)}
                    >
                      Önceki
                    </Button>
                    <Button
                      isDisabled={props.values.categories.every(
                        c => c.minValue === '',
                      )}
                      variantColor="teal"
                      type="submit"
                    >
                      Kaydet
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    isDisabled={props.values.title === '' || !props.isValid}
                    variantColor="blue"
                    type="submit"
                    rightIcon="arrow-forward"
                    onClick={() => setIsNextStep(true)}
                  >
                    Kategori Ekle
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        )
      }}
    </Formik>
  )
}

CreateGroup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CreateGroup
