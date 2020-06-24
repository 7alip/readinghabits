import PropTypes from 'prop-types'

export const groupType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string,
  is_active: PropTypes.bool.isRequired,
  is_complete: PropTypes.bool.isRequired,
  is_private: PropTypes.bool.isRequired,
  creator: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({ id: PropTypes.number.isRequired, username: PropTypes.string.isRequired }),
    }).isRequired,
  ).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
})

export const groupFormFieldsType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  maxUser: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPrivate: PropTypes.bool,
})

export const groupCategoryFormFieldsType = PropTypes.shape({
  categoryId: PropTypes.number.isRequired,
  minValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  point: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
})
