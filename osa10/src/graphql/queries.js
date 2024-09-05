import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
    repositories (searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection, first:$first, after:$after) {
      totalCount
      edges {
        node {
          id
          ownerAvatarUrl
          name
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepository($repoID: ID!, $first: Int, $after: String) {
    repository(id: $repoID) {
      url
      id
      ownerAvatarUrl
      name
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`;


export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews){
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;