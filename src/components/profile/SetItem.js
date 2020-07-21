import React from 'react'
import PropTypes from 'prop-types'
import Card from '../shared/Card'
import { useQuery } from '@apollo/client'
import Loader from '../shared/Loader'
import { GET_SET_BOOKS_PAGES_COUNT } from '../../apollo/queries/index'

const SetItem = ({ id, header, startDate, bookCount, readCount }) => {
  const { data, loading } = useQuery(GET_SET_BOOKS_PAGES_COUNT, {
    variables: { setId: id },
  })

  if (loading) return <Loader />

  const totalPages = data.book_aggregate.aggregate.sum.page

  const percentage = totalPages && readCount ? readCount / totalPages : 0

  return (
    <Card
      header={header}
      startDate={startDate}
      bookCount={bookCount}
      totalPages={totalPages}
      progress={Math.round(percentage)}
    />
  )
}

SetItem.propTypes = {
  id: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  bookCount: PropTypes.number,
  readCount: PropTypes.number,
}

export default SetItem
