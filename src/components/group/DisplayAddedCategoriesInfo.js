import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/core'

const DisplayAddedCategoriesInfo = ({ categoryFields, categories }) =>
  categoryFields.length > 0 && (
    <Box as="table" mt={5}>
      <Box fontWeight="bold" as="thead" borderBottomWidth="1px" borderBottomColor="gray.200">
        <tr>
          <td>Kategori</td>
          <td>Min deger</td>
          <td>Puan</td>
        </tr>
      </Box>
      <Box as="tbody">
        {categoryFields.map(category => (
          <tr key={category.categoryId}>
            <td>{categories.find(c => c.id === Number(category.categoryId)).title}</td>
            <td>{category.minValue}</td>
            <td>{category.point || 'Belirlenmedi'}</td>
          </tr>
        ))}
      </Box>
    </Box>
  )

DisplayAddedCategoriesInfo.propTypes = {
  categoryFields: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      minValue: PropTypes.number.isRequired,
      point: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  ),
  categories: PropTypes.array.isRequired,
}

export default DisplayAddedCategoriesInfo
