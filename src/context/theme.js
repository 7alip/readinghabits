import { theme } from '@chakra-ui/core'

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: 'Mukta, ' + theme.fonts.body,
    heading: 'Mukta, ' + theme.fonts.heading,
  },
}
