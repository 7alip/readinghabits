import React from 'react'
import PropTypes from 'prop-types'
import FormField from '../form/FormField'
import { Select, Switch, Stack } from '@chakra-ui/core'

const CreateGroupForm = ({ isPrivate, errors, register }) => {
  return (
    <Stack spacing={3}>
      <FormField
        isRequired
        label="Title"
        name="title"
        placeholder="Title"
        errors={errors}
        register={register}
      />

      <FormField
        isRequired
        label="Baslangic Tarihi"
        name="startDate"
        type="date"
        errors={errors}
        register={register}
      />

      <Stack spacing={3} isInline justify="space-between">
        <FormField
          label="Maksimum üye"
          name="maxUser"
          type="number"
          placeholder="Maksimum üye"
          errors={errors}
          register={register}
          w={100}
        />
        <FormField
          as={Switch}
          size="lg"
          label="Özel grup"
          name="isPrivate"
          errors={errors}
          register={register}
        />
      </Stack>

      {isPrivate && (
        <FormField
          placeholder="Gün seçiniz"
          label="Analiz günü"
          name="day"
          as={Select}
          errors={errors}
          register={register}
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
  )
}

CreateGroupForm.propTypes = {
  errors: PropTypes.object,
  register: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool.isRequired,
}

export default CreateGroupForm
