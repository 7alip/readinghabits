import { gql } from '@apollo/client'

export const GET_PROFILE_INFO = gql`
  query getProfileInfo($userId: Int!) {
    user_by_pk(id: $userId) {
      groups {
        group {
          id
          title
          start_date
          end_date
          fields_aggregate {
            aggregate {
              count
            }
          }
          users_aggregate {
            aggregate {
              count
            }
          }
        }
      }
      sets {
        id
        title
        start_date
        end_date
        books_aggregate {
          aggregate {
            count
          }
        }
        readings_aggregate {
          aggregate {
            sum {
              value
            }
          }
        }
      }
    }
  }
`

export const GET_SET_BOOKS_PAGES_COUNT = gql`
  query getBooksPagesCount($setId: Int!) {
    book_aggregate(where: { sets: { set_id: { _eq: $setId } } }) {
      aggregate {
        sum {
          page
        }
      }
    }
  }
`
