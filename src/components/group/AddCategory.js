import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  Stack,
  Select,
  IconButton,
  Box,
  Input,
  FormLabel,
} from '@chakra-ui/core'
import { useMutation, useLazyQuery } from '@apollo/client'
import { ADD_GROUP_CATEGORY } from '../../apollo/groupMutations'
import { GET_GROUP_CATEGORIES } from '../../apollo/groupQueries'

const AddCategory = ({ groupId }) => {
  const [categoryId, setCategoryId] = useState('')
  const [minValue, setMinValue] = useState(0)
  const [point, setPoint] = useState(0)

  const [getCategories, { loading: get_loading, error, data }] = useLazyQuery(
    GET_GROUP_CATEGORIES,
  )

  const [onCreate, { loading: add_loading }] = useMutation(ADD_GROUP_CATEGORY, {
    variables: {
      groupId,
      categoryId,
      minValue,
      point,
    },
  })

  return (
    <Box>
      <FormControl>
        <FormLabel>Kategori</FormLabel>
        <Select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          placeholder="Kategori"
          onFocus={getCategories}
        >
          {get_loading && <option>Yukleniyor...</option>}
          {error && <option>Hata</option>}
          {data &&
            data.category.map(c => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
        </Select>
      </FormControl>
      <Stack align="center" isInline spacing={2} mt={3}>
        <FormControl>
          <FormLabel>Min Sayfa</FormLabel>
          <Input
            type="number"
            value={minValue}
            onChange={e => setMinValue(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Puan</FormLabel>
          <Input
            type="number"
            value={point}
            onChange={e => setPoint(e.target.value)}
          />
        </FormControl>
        <IconButton
          alignSelf="flex-end"
          variantColor="green"
          isLoading={add_loading}
          isRound
          icon="add"
          onClick={() => {
            onCreate()
            setCategoryId('')
            setMinValue(0)
            setPoint(0)
          }}
        />
      </Stack>
    </Box>
  )
}

AddCategory.propTypes = {
  groupId: PropTypes.number.isRequired,
}

export default AddCategory
