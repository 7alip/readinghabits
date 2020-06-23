import { gql } from '@apollo/client'

export const GET_GROUPS = gql`
  query getGroups {
    group {
      id
      title
      start_date
      end_date
      is_active
      is_complete
      is_private
      creator {
        username
      }
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
`

export const GET_USER_GROUPS = gql`
  query getUserGroups($id: Int!) {
    group(where: { users: { user_id: { _eq: $id } } }) {
      id
      title
      start_date
      end_date
      is_active
      is_complete
      is_private
      creator {
        username
      }
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
`

export const GET_GROUP_CATEGORIES = gql`
  query getGroupCategories {
    category {
      id
      title
    }
  }
`
