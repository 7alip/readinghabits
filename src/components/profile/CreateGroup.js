/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  Box,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import CreateGroupForm from './CreateGroupForm'
import AddGroupFieldForm from './AddGroupFieldForm'

const today = moment().format('YYYY-MM-DD')

const GroupSchema = Yup.object().shape({
  title: Yup.string()
    .required('Başlık zorunlu')
    .min(3, 'En az üç karakter olmalı')
    .max(30, 'En fazla 30 karakter olabilir'),
  startDate: Yup.date()
    .required('Giriş tarihi zorunlu')
    .min(moment().add(-1, 'day'), 'Geçmiş zaman seçemezsiniz'),
  maxUser: Yup.number()
    .integer('Tam sayı giriniz')
    .min(2, 'En az 2 kişi olmalı')
    .max(50, 'En fazla 50 kişi olabilir')
    .transform((value, original) =>
      original.trim() === '' ? undefined : value,
    ),
  isPrivate: Yup.bool(),
  day: Yup.number().typeError('Gün seçiniz'),
  fields: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      title: Yup.string().required(),
      isActive: Yup.bool().required(),
      minValue: Yup.number('Sayi olmali')
        .integer('Tam sayi giririniz')
        .positive('Pozitif sayi giriniz')
        .typeError('Hedef giriniz'),
    }),
  ),
})

const categories = [
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

const CreateGroup = ({ onClose, isOpen }) => {
  const [isNextStep, setIsNextStep] = useState(false)

  const { register, errors, handleSubmit, watch } = useForm({
    resolver: yupResolver(GroupSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      startDate: today,
      maxUser: 50,
      isPrivate: false,
      day: 1,
      fields: categories.map(c => ({
        ...c,
        minValue: undefined,
        isPrivate: false,
      })),
    },
  })

  const { fields, isPrivate, title, day } = watch()

  const onSubmit = values => console.log('values', values)

  return (
    <Modal scrollBehavior="inside" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mx={[2, null, 0]}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader>Grup Oluştur</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box d={!isNextStep ? 'true' : 'none'}>
            <CreateGroupForm
              isPrivate={isPrivate}
              errors={errors}
              register={register}
            />
          </Box>
          <Box d={isNextStep ? 'true' : 'none'}>
            <AddGroupFieldForm
              fields={fields}
              register={register}
              errors={errors && errors.fields}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={2}
            onClick={() => {
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
                variantColor="teal"
                type="submit"
                isDisabled={fields.every(f => !f.isActive)}
              >
                Kaydet
              </Button>
            </Stack>
          ) : (
            <Button
              variantColor="blue"
              type="submit"
              rightIcon="arrow-forward"
              onClick={() => title !== '' && day !== '' && setIsNextStep(true)}
            >
              Kategori Ekle
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

CreateGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default CreateGroup
