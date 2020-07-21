import { gql } from '@apollo/client'

export const INSERT_GROUP = gql`
  mutation InsertGroup(
    $title: String!
    $startDate: date!
    $endDate: date
    $maxUser: Int
    $isPrivate: Boolean
    $day: Int
  ) {
    insert_group_one(
      object: {
        title: $title
        start_date: $startDate
        end_date: $endDate
        max_user: $maxUser
        is_private: $isPrivate
        day: $day
        users: { data: {} }
        managers: { data: {} }
      }
    ) {
      id
      title
    }
  }
`

export const INSERT_GROUP_FIELD = gql`
  mutation InsertGroupField(
    $groupId: Int!
    $categoryId: Int!
    $minValue: Int!
  ) {
    insert_group_field_one(
      object: {
        group_id: $groupId
        category_id: $categoryId
        min_value: $minValue
      }
    ) {
      category {
        title
      }
    }
  }
`
