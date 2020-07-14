import React from 'react'
import PropTypes from 'prop-types'
import FormField from '../form/FormField'
import { Flex, Box, Select, Switch, Stack } from '@chakra-ui/core'

const CreateGroupForm = ({ isVisible, ...props }) => {
  return (
    <Stack spacing={3} d={isVisible ? 'flex' : 'none'}>
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

      <FormField {...props} label="Bitiş Tarihi" name="endDate" type="date" />

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
  )
}

CreateGroupForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    isPrivate: PropTypes.bool,
  }),
}

export default CreateGroupForm
