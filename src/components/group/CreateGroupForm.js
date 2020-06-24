import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormControl, FormLabel, Input, Stack, Switch } from '@chakra-ui/core'
import { groupFormFieldsType } from '../../types/groupTypes'

const CreateGroupForm = ({ onChangeGroup, initialRef, groupFormFields }) => {
  const { title, startDate, endDate, maxUser, isPrivate } = groupFormFields

  return (
    <Box as="form">
      <FormControl>
        <FormLabel>Grup Basligi</FormLabel>
        <Input
          name="title"
          onChange={onChangeGroup}
          ref={initialRef}
          placeholder="Grup Basligi"
          value={title}
          isRequired
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Baslangic Tarihi</FormLabel>
        <Input name="startDate" value={startDate} onChange={onChangeGroup} type="date" isRequired />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Bitis Tarihi</FormLabel>
        <Input name="endDate" value={endDate} onChange={onChangeGroup} type="date" />
      </FormControl>

      <Stack spacing={4} isInline mt={4}>
        <FormControl>
          <FormLabel>Maksimum Kisi</FormLabel>
          <Input
            name="maxUser"
            value={!maxUser && maxUser === 0 ? '' : maxUser}
            onChange={onChangeGroup}
            type="number"
          />
        </FormControl>
        <FormControl mx="auto">
          <FormLabel>Özel grup</FormLabel>
          <Switch d="block" size="lg" name="isPrivate" value={isPrivate} onChange={onChangeGroup} type="date" />
        </FormControl>
      </Stack>
    </Box>
  )
}

CreateGroupForm.propTypes = {
  onChangeGroup: PropTypes.func.isRequired,
  initialRef: PropTypes.object.isRequired,
  groupFormFields: groupFormFieldsType,
}

export default CreateGroupForm
