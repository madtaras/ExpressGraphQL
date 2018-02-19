const Schema = [
  `
  type Book {
    id: Int!
    title:String!
    author:String!
  }
  type Query {
    books:[Book]
    book(id: Int!): Book
  }
  type Mutation {
    addBook(title:String!, author:String!): Book
  }
  schema {
    query: Query
    mutation: Mutation
  }
  `,
];

module.exports = Schema;
