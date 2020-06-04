import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      title
      min
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($title: String!, $min: Int!) {
    createCategory(input: { data: { title: $title, min: $min } }) {
      category {
        title
        min
      }
    }
  }
`;
