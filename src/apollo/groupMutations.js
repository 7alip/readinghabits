import { gql } from '@apollo/client'

export const CREATE_GROUP = gql`
  mutation createGroup(
    $title: String!
    $creator: Int!
    $start: date!
    $end: date
    $maxUser: Int
    $isPrivate: Boolean!
  ) {
    insert_group(
      objects: {
        title: $title
        creator_id: $creator
        start_date: $start
        end_date: $end
        max_user: $maxUser
        is_private: $isPrivate
        users: { data: { user_id: $creator } }
      }
    ) {
      affected_rows
      returning {
        id
        title
      }
    }
  }
`

export const ADD_GROUP_CATEGORY = gql`
  mutation addGroupCategory(
    $categoryId: Int!
    $groupId: Int!
    $minValue: Int!
    $point: Int
  ) {
    insert_group_field(
      objects: {
        category_id: $categoryId
        group_id: $groupId
        min_value: $minValue
        point: $point
      }
    ) {
      affected_rows
    }
  }
`
