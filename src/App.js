import React from 'react'
import { Box } from '@chakra-ui/core'

import AddCategory from './components/AddCategory'
import CategoryList from './components/CategoryList'

function App() {
  return (
    <Box w={['full', 1 / 2, 1 / 4]} mx="auto">
      <CategoryList />
      <AddCategory />
    </Box>
  )
}

export default App
