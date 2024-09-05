import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const LEAVE_REVIEW = gql`
mutation CreateReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
    createReview(review: { ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, text: $text }) {
      repositoryId
    }
  }
`;

export const REGISTER = gql`
mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;