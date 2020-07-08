import React from 'react'
import PropTypes from 'prop-types'
import { useColorMode, PseudoBox } from '@chakra-ui/core'

const Base = ({ children, ...rest }) => {
  const { colorMode } = useColorMode()

  return (
    <PseudoBox {...rest} bg={`box.${colorMode}`}>
      {children}
    </PseudoBox>
  )
}

Base.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Base
