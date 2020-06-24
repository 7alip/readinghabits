import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormControl, FormLabel, Input, Stack, Switch } from '@chakra-ui/core'

const CreateGroupForm = ({ handleChangeGroupField, initialRef, groupFields }) => {
  const { title, startDate, endDate, maxUser, isPrivate } = groupFields

  return (
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
        <Input name="startDate" value={startDate} onChange={handleChangeGroupField} type="date" isRequired />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Bitis Tarihi</FormLabel>
        <Input name="endDate" value={endDate} onChange={handleChangeGroupField} type="date" />
      </FormControl>

      <Stack spacing={4} isInline mt={4}>
        <FormControl>
          <FormLabel>Maksimum Kisi</FormLabel>
          <Input
            name="maxUser"
            value={!maxUser && maxUser === 0 ? '' : maxUser}
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
  )
}

CreateGroupForm.propTypes = {
  handleChangeGroupField: PropTypes.func.isRequired,
  initialRef: PropTypes.object.isRequired,
  groupFields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    maxUser: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPrivate: PropTypes.bool,
  }).isRequired,
}

export default CreateGroupForm
