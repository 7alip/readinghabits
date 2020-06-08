import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      title
    }
  }
`

export const ADD_CATEGORY = gql`
  mutation AddCategory($title: String!) {
    createCategory(input: { data: { title: $title } }) {
      category {
        title
      }
    }
  }
`
