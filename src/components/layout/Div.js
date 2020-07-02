import React from 'react'
import PropTypes from 'prop-types'
import { useColorMode, PseudoBox } from '@chakra-ui/core'

const Div = ({ children, ...rest }) => {
  const { colorMode } = useColorMode()

  return (
    <PseudoBox {...rest} bg={`box.${colorMode}`}>
      {children}
    </PseudoBox>
  )
}

Div.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Div
