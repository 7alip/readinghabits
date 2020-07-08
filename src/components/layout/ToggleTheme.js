import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/core'

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      position="fixed"
      top={2}
      right={2}
      isRound
      variant="outline"
      icon={colorMode === 'dark' ? 'sun' : 'moon'}
      onClick={toggleColorMode}
    />
  )
}

export default ToggleTheme
