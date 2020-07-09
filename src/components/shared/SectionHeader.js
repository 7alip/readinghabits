import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Icon, Heading, Box, Button } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const SectionHeader = ({
  title,
  icon,
  buttonText,
  buttonIcon,
  to,
  onClick,
}) => {
  return (
    <Stack isInline align="center" spacing={3} my={3}>
      {typeof icon === 'string' ? <Icon name={icon} /> : <Box as={icon} />}
      <Heading as="h2" size="lg">
        {title}
      </Heading>
      {buttonText && (
        <Button
          as={to && Link}
          size="sm"
          to={to}
          ml="auto"
          variant="outline"
          variantColor="teal"
          leftIcon={buttonIcon}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      )}
    </Stack>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  to: PropTypes.string,
  onClick: PropTypes.func,
}

export default SectionHeader
