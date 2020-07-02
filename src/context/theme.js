import { theme } from '@chakra-ui/core'

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: 'Mukta, ' + theme.fonts.body,
    heading: 'Mukta, ' + theme.fonts.heading,
  },
  colors: {
    ...theme.colors,
    background: {
      dark: '#15202B',
      light: '#F5F8FA',
    },
    text: {
      dark: theme.colors.gray[100],
      light: theme.colors.gray[700],
    },
    box: {
      dark: '#192734',
      hover: '#202E3A',
      light: 'white',
    },
  },
  shadows: {
    ...theme.shadows,
    outline: 'none',
  },
}
