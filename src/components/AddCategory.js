import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ADD_CATEGORY } from '../apollo/queries'

const AddCategory = () => {
  const [title, setTitle] = useState('')

  const [addCategory, { data }] = useMutation(ADD_CATEGORY)

  const handleSubmit = e => {
    e.preventDefault()
    addCategory({ variables: { title } })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default AddCategory
