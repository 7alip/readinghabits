import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, FormControl, Select, FormLabel, Input, Button } from '@chakra-ui/core'

const AddCategoryForm = ({ handleAddCategory, categoryField, handleSetCategory, error, loading, categories }) => {
  return (
    <Box as="form" p={4} bg="orange.100" onSubmit={handleAddCategory}>
      <Stack spacing={2} isInline>
        <FormControl w={1 / 2}>
          <FormLabel>Kategori</FormLabel>
          <Select
            isRequired
            name="categoryId"
            value={categoryField.categoryId}
            onChange={e => handleSetCategory(e.target)}
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
            value={!categoryField.minValue && categoryField.minValue === 0 ? '' : categoryField.minValue}
            onChange={e => handleSetCategory(e.target)}
          />
        </FormControl>
        <FormControl w={1 / 4}>
          <FormLabel>Puan</FormLabel>
          <Input
            name="point"
            type="number"
            value={!categoryField.point && categoryField.point === 0 ? '' : categoryField.point}
            onChange={e => handleSetCategory(e.target)}
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
  handleAddCategory: PropTypes.func.isRequired,
  handleSetCategory: PropTypes.func.isRequired,
  categoryField: PropTypes.shape({
    categoryId: PropTypes.number.isRequired,
    minValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    point: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  categories: PropTypes.array.isRequired,
}

export default AddCategoryForm
