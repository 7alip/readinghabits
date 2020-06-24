import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, FormControl, Select, FormLabel, Input, Button } from '@chakra-ui/core'
import { groupCategoryFormFieldsType } from '../../types/groupTypes'

const AddCategoryForm = ({ onAddCategory, onSetCategory, categoryFormFields, error, loading, categories }) => {
  return (
    <Box as="form" p={4} bg="orange.100" onSubmit={onAddCategory}>
      <Stack spacing={2} isInline>
        <FormControl w={1 / 2}>
          <FormLabel>Kategori</FormLabel>
          <Select
            isRequired
            name="categoryId"
            value={categoryFormFields.categoryId}
            onChange={e => onSetCategory(e.target)}
            placeholder="Kategori sec"
          >
            {error && <option>Hata olustu</option>}
            {loading ? (
              <option>Yukleniyor</option>
            ) : (
              categories.map(({ id, title }) => (
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
            value={!categoryFormFields.minValue && categoryFormFields.minValue === 0 ? '' : categoryFormFields.minValue}
            onChange={e => onSetCategory(e.target)}
          />
        </FormControl>
        <FormControl w={1 / 4}>
          <FormLabel>Puan</FormLabel>
          <Input
            name="point"
            type="number"
            value={!categoryFormFields.point && categoryFormFields.point === 0 ? '' : categoryFormFields.point}
            onChange={e => onSetCategory(e.target)}
          />
        </FormControl>
      </Stack>
      <Button type="submit" variantColor="blue" isFullWidth mt={2}>
        Ekle
      </Button>
    </Box>
  )
}

AddCategoryForm.propTypes = {
  onAddCategory: PropTypes.func.isRequired,
  onSetCategory: PropTypes.func.isRequired,
  categoryFormFields: groupCategoryFormFieldsType,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  categories: PropTypes.array.isRequired,
}

export default AddCategoryForm
