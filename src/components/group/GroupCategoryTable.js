import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Heading, PseudoBox } from '@chakra-ui/core'

const GroupCategoryTable = ({ categories }) => {
  return (
    <Stack p={3} boxShadow="sm">
      <Heading size="md">Kategoriler</Heading>
      <PseudoBox as="table">
        <thead>
          <tr>
            <th>Kategori Adi</th>
            <th>Minimum deger</th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ category, min_value, point }, i) => (
            <PseudoBox textAlign="center" _even={{ bg: 'gray.100' }} as="tr" justify="space-between" key={i}>
              <td>{category.title}</td>
              <td>{min_value}</td>
              <td>{point}</td>
            </PseudoBox>
          ))}
        </tbody>
      </PseudoBox>
    </Stack>
  )
}

GroupCategoryTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      min_value: PropTypes.number.isRequired,
      point: PropTypes.number,
    }).isRequired,
  ),
}

export default GroupCategoryTable
