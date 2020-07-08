import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Icon, Heading, Box, Button } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const SectionHeader = ({ title, icon, buttonText, buttonIcon, navigate }) => {
  return (
    <Stack isInline align="center" spacing={3} my={3}>
      {typeof icon === 'string' ? <Icon name={icon} /> : <Box as={icon} />}
      <Heading as="h2" size="lg">
        {title}
      </Heading>
      {buttonText && (
        <Button
          as={Link}
          size="sm"
          to={navigate}
          ml="auto"
          variant="outline"
          variantColor="teal"
          leftIcon={buttonIcon}
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
  navigate: PropTypes.string,
}

export default SectionHeader
