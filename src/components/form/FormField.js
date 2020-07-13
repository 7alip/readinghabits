import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/core'
import { Field } from 'formik'

const FormField = ({
  errors,
  touched,
  values,
  handleChange,
  name,
  as,
  label,
  isRequired,
  children,
  ...rest
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={errors[name] && touched[name]}
    >
      {label && (
        <FormLabel d="block" htmlFor="title">
          {label}
        </FormLabel>
      )}
      <Field
        {...rest}
        as={as || Input}
        value={values[name]}
        onChange={handleChange}
        id={name}
      >
        {as && children}
      </Field>
      {errors[name] && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
    </FormControl>
  )
}

FormField.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  children: PropTypes.node,
}

export default FormField
