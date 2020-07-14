import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Flex, Text, Switch } from '@chakra-ui/core'
import { FieldArray } from 'formik'
import FormField from '../form/FormField'

const AddGroupFieldForm = ({ isVisible, ...props }) => {
  return (
    <Stack spacing={3} d={isVisible ? 'flex' : 'none'}>
      <Flex fontWeight="bold" borderBottom="1px" justify="space-between">
        <Text>Kategori</Text>
        <Text>Haftalik hedef</Text>
      </Flex>
      <FieldArray
        name="categories"
        render={() =>
          props.values.categories.map((c, index) => (
            <Flex key={index} align="center" my={1}>
              <Text w={200}>{c.title}</Text>
              <FormField
                {...props}
                as={Switch}
                isDisabled={c.minValue !== ''}
                size="lg"
                name={`categories.${index}.isActive`}
              />
              <FormField
                isDisabled={!c.isActive}
                ml={3}
                {...props}
                type="number"
                name={`categories.${index}.minValue`}
                placeholder="Haftalik hedef"
              />
            </Flex>
          ))
        }
      />
    </Stack>
  )
}

AddGroupFieldForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    categories: PropTypes.array,
  }).isRequired,
}

export default AddGroupFieldForm
