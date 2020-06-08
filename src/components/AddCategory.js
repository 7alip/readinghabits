import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/core'

import { ADD_CATEGORY } from '../apollo/queries'

const AddCategory = () => {
  const [title, setTitle] = useState('')

  const [addCategory, { data }] = useMutation(ADD_CATEGORY)

  const handleSubmit = e => {
    e.preventDefault()
    addCategory({ variables: { title } })
  }

  return (
    <Box>
      <Stack spacing={3} as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="name">Kategori Adı</FormLabel>
          <Input
            id="name"
            placeholder="Kategori Adı"
            name="name"
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <Button leftIcon="add" variantColor="red" type="submit">
          Ekle
        </Button>
      </Stack>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  )
}

export default AddCategory
