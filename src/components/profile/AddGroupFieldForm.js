import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Text,
  Switch,
  Input,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core'

const AddGroupFieldForm = ({ fields, errors, register }) => {
  return (
    <Stack spacing={3}>
      {fields &&
        fields.map((field, i) => (
          <Stack align="center" justify="space-between" isInline key={i}>
            <Text isTruncated w={150}>
              {field.title}
            </Text>
            <Input d="none" ref={register} name={`fields[${i}].title`} />
            <Input d="none" ref={register} name={`fields[${i}].id`} />
            {field.isActive && (
              <FormControl isInvalid={errors && !!errors[i]}>
                <Input
                  w={10}
                  textAlign="center"
                  isInvalid={errors && !!errors[i]}
                  errorBorderColor="red.400"
                  ref={register}
                  placeholder="Hedef"
                  name={`fields[${i}].minValue`}
                  variant="flushed"
                />
                <FormErrorMessage isTruncated>
                  {errors && errors[i] && errors[i].minValue.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <Switch size="lg" ref={register} name={`fields[${i}].isActive`} />
          </Stack>
        ))}
    </Stack>
  )
}

AddGroupFieldForm.propTypes = {
  fields: PropTypes.array,
  errors: PropTypes.array,
  register: PropTypes.func.isRequired,
}

export default AddGroupFieldForm
