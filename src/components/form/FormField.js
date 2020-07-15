import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/core'

const FormField = ({
  errors,
  name,
  as,
  label,
  isRequired,
  children,
  register,
  ...rest
}) => {
  const Tag = as || Input
  return (
    <FormControl mb={3} isRequired={isRequired} isInvalid={!!errors[name]}>
      {label && (
        <FormLabel d="block" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Tag
        isInvalid={!!errors[name]}
        errorBorderColor="red.400"
        mb={0}
        name={name}
        id={name}
        ref={register}
        w="full"
        {...rest}
      >
        {as && children}
      </Tag>
      {errors && (
        <FormErrorMessage mt={0}>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

FormField.propTypes = {
  errors: PropTypes.object,
  name: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  children: PropTypes.node,
  register: PropTypes.func,
}

export default FormField
