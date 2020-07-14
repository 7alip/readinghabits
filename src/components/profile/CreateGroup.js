/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
} from '@chakra-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CreateGroupForm from './CreateGroupForm'
import AddGroupFieldForm from './AddGroupFieldForm'

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

const CreateGroup = ({ onClose }) => {
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
          <ModalContent
            mx={[2, null, 0]}
            as="form"
            onSubmit={props.handleSubmit}
          >
            <ModalHeader>Grup Oluştur</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateGroupForm isVisible={!isNextStep} {...props} />
              <AddGroupFieldForm isVisible={isNextStep} {...props} />
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
        )
      }}
    </Formik>
  )
}

CreateGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default CreateGroup
