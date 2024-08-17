const { gql } = require('apollo-server')

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int  
    bookCount: Int
  }

  type Book {
    id: ID!
    author: Author!
    genres: [String!]!
    published: Int!
    title: String!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
    favoriteBook: [Book!]!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String !favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
