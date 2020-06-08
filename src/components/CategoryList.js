import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_CATEGORIES } from '../apollo/queries'

const CategoryList = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES)

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default CategoryList
